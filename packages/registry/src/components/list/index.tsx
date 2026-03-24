import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useEffect, useMemo, useState } from 'react'
import { spinnerFrames } from '../../primitives/symbols.js'

export interface ListItem {
  label: string
  value: string
}

export interface ListProps {
  /** Items to display */
  items: ListItem[]
  /** Number of visible items */
  height?: number
  /** Width of the list in columns */
  width?: number
  /** Filter string — shows only items whose label contains this (case-insensitive) */
  filter?: string
  /** Callback fired when Enter is pressed on an item */
  onSelect?: (item: ListItem) => void
  /** Show loading spinner instead of items */
  isLoading?: boolean
  /** Whether focused for keyboard input */
  focus?: boolean
  /** Text color */
  color?: string
}

/**
 * Filterable, paginated scrollable list with an integrated loading state.
 */
export function List({
  items,
  height = 8,
  width,
  filter = '',
  onSelect,
  isLoading = false,
  focus = true,
  color,
}: ListProps): JSX.Element {
  const { colors, spinner } = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [loadingFrame, setLoadingFrame] = useState(0)

  const termWidth = process.stdout.columns || 80
  const effectiveWidth = width ?? termWidth

  const filtered = useMemo(() => {
    if (!filter)
      return items
    const lower = filter.toLowerCase()
    return items.filter(item => item.label.toLowerCase().includes(lower))
  }, [items, filter])

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0)
    setScrollOffset(0)
  }, [filter])

  useEffect(() => {
    if (!isLoading)
      return
    const frames = spinnerFrames[spinner]
    const timer = setInterval(() => setLoadingFrame(f => (f + 1) % frames.length), 80)
    return () => clearInterval(timer)
  }, [isLoading, spinner])

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
          const next = Math.min(filtered.length - 1, i + 1)
          setScrollOffset(o => next >= o + height ? next - height + 1 : o)
          return next
        })
      }
      if (key.return && filtered[selectedIndex]) {
        onSelect?.(filtered[selectedIndex])
      }
    },
    { isActive: focus },
  )
  // c8 ignore stop

  if (isLoading) {
    const frames = spinnerFrames[spinner]
    return (
      <Box>
        <Text color={colors.primary}>{frames[loadingFrame]}</Text>
        <Text color={colors.muted}> Loading…</Text>
      </Box>
    )
  }

  const visible = filtered.slice(scrollOffset, scrollOffset + height)

  return (
    <Box flexDirection="column" width={effectiveWidth}>
      {filtered.length === 0
        ? <Text color={colors.muted}>No items found</Text>
        : visible.map((item, i) => {
            const idx = scrollOffset + i
            const isActive = idx === selectedIndex
            return (
              <Box key={item.value} flexDirection="row" gap={1}>
                <Text color={isActive ? colors.primary : colors.muted}>
                  {isActive ? '❯' : ' '}
                </Text>
                <Text color={isActive ? colors.primary : color} bold={isActive}>
                  {item.label}
                </Text>
              </Box>
            )
          })}
      {filtered.length > height
        ? (
            <Text color={colors.muted}>
              {`  (${scrollOffset + 1}–${Math.min(filtered.length, scrollOffset + height)} of ${filtered.length})`}
            </Text>
          )
        : null}
    </Box>
  )
}
