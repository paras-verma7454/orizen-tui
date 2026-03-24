import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useCallback, useEffect, useState } from 'react'

// Static regex to avoid re-compilation on every call
const MULTI_SLASH_REGEX = /\/+/g

export interface FileEntry {
  name: string
  path: string
  isDirectory: boolean
}

export interface FilePickerProps {
  /** Initial directory to open */
  initialDir?: string
  /** Only show files matching these extensions e.g. ['.ts', '.tsx'] */
  extensions?: string[]
  /** Called when a file (not directory) is selected */
  onSelect?: (entry: FileEntry) => void
  /** Called when the user presses Escape */
  onCancel?: () => void
  /** Number of visible entries */
  height?: number
  /** Width of the file picker in columns */
  width?: number
  /**
   * Dependency-injected directory reader — defaults to node:fs/promises.readdir.
   * Provide a mock in tests to avoid real filesystem access.
   */
  readDir?: (dir: string) => Promise<FileEntry[]>
  /**
   * Dependency-injected path join — defaults to simple `/` concatenation.
   * Provide `path.join` for production use.
   */
  joinPath?: (base: string, name: string) => string
  /** Whether focused for keyboard input */
  focus?: boolean
  /** Text color */
  color?: string
}

/**
 * Directory navigator with extension filtering.
 * Enter opens a directory or selects a file; Escape cancels.
 */
export function FilePicker({
  initialDir = '.',
  extensions,
  onSelect,
  onCancel,
  height = 10,
  width,
  readDir,
  joinPath,
  focus = true,
  color,
}: FilePickerProps): JSX.Element {
  const { colors } = useTheme()
  const [currentDir, setCurrentDir] = useState(initialDir)
  const [entries, setEntries] = useState<FileEntry[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const termWidth = process.stdout.columns || 80
  const effectiveWidth = width ?? termWidth

  const doJoin = useCallback(
    (base: string, name: string) => joinPath ? joinPath(base, name) : `${base}/${name}`.replace(MULTI_SLASH_REGEX, '/'),
    [joinPath],
  )

  const loadDir = useCallback(async (dir: string) => {
    setError(null)
    try {
      let all: FileEntry[]
      if (readDir) {
        all = await readDir(dir)
      }
      else {
        const { readdir } = await import('node:fs/promises')
        const dirents = await readdir(dir, { withFileTypes: true })
        all = dirents.map(d => ({
          name: d.name,
          path: doJoin(dir, d.name),
          isDirectory: d.isDirectory(),
        }))
      }

      const filtered = extensions
        ? all.filter(e => e.isDirectory || extensions.some(ext => e.name.endsWith(ext)))
        : all

      const sorted = [
        ...filtered.filter(e => e.isDirectory).sort((a, b) => a.name.localeCompare(b.name)),
        ...filtered.filter(e => !e.isDirectory).sort((a, b) => a.name.localeCompare(b.name)),
      ]

      setEntries(sorted)
      setSelectedIndex(0)
      setScrollOffset(0)
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read directory')
    }
  }, [readDir, extensions, doJoin])

  useEffect(() => {
    loadDir(currentDir)
  }, [currentDir, loadDir])

  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (_input, key) => {
      if (key.upArrow) {
        setSelectedIndex((i) => {
          const prev = Math.max(0, i - 1)
          setScrollOffset(o => prev < o ? prev : o)
          return prev
        })
      }
      if (key.downArrow) {
        setSelectedIndex((i) => {
          const next = Math.min(entries.length - 1, i + 1)
          setScrollOffset(o => next >= o + height ? next - height + 1 : o)
          return next
        })
      }
      if (key.return && entries[selectedIndex]) {
        const entry = entries[selectedIndex]
        if (entry.isDirectory)
          setCurrentDir(entry.path)
        else
          onSelect?.(entry)
      }
      if (key.escape)
        onCancel?.()
    },
    { isActive: focus },
  )
  // c8 ignore stop

  if (error) {
    return <Text color={colors.error}>{error}</Text>
  }

  const visible = entries.slice(scrollOffset, scrollOffset + height)

  return (
    <Box flexDirection="column" width={effectiveWidth}>
      <Text color={colors.muted}>{currentDir}</Text>
      {visible.length === 0
        ? <Text color={colors.muted}>Empty directory</Text>
        : visible.map((entry, i) => {
            const idx = scrollOffset + i
            const isActive = idx === selectedIndex
            return (
              <Box key={entry.path} flexDirection="row" gap={1}>
                <Text color={isActive ? colors.primary : colors.muted}>
                  {isActive ? '❯' : ' '}
                </Text>
                <Text color={entry.isDirectory ? colors.info : color}>
                  {entry.isDirectory ? '/' : ' '}
                  {entry.name}
                </Text>
              </Box>
            )
          })}
    </Box>
  )
}
