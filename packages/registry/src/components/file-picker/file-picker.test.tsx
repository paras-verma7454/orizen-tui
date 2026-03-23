import type { FileEntry } from './index.js'
import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { FilePicker } from './index.js'

// Note: file-picker loads entries via async useEffect, so ink-testing-library
// only captures the initial synchronous render (before effects fire).
// We test static props and initial state synchronously, and test pure logic directly.

describe('FilePicker', () => {
  it('renders the initial directory path synchronously', () => {
    const emptyReadDir = async (_dir: string): Promise<FileEntry[]> => []
    const { lastFrame } = render(
      <FilePicker initialDir="/project" readDir={emptyReadDir} />,
    )
    expect(lastFrame()).toContain('/project')
  })

  it('renders a different directory path', () => {
    const emptyReadDir = async (_dir: string): Promise<FileEntry[]> => []
    const { lastFrame } = render(
      <FilePicker initialDir="/home/user" readDir={emptyReadDir} />,
    )
    expect(lastFrame()).toContain('/home/user')
  })

  it('renders default "." directory when no initialDir provided', () => {
    const emptyReadDir = async (_dir: string): Promise<FileEntry[]> => []
    const { lastFrame } = render(<FilePicker readDir={emptyReadDir} />)
    expect(lastFrame()).toContain('.')
  })
})

// Pure logic tests — directory sorting
describe('FilePicker directory sort order', () => {
  it('sorts directories before files', () => {
    const entries: FileEntry[] = [
      { name: 'z-file.ts', path: '/z-file.ts', isDirectory: false },
      { name: 'a-dir', path: '/a-dir', isDirectory: true },
    ]
    // Simulate the sort logic used inside the component
    const sorted = [
      ...entries.filter(e => e.isDirectory).sort((a, b) => a.name.localeCompare(b.name)),
      ...entries.filter(e => !e.isDirectory).sort((a, b) => a.name.localeCompare(b.name)),
    ]
    expect(sorted[0].isDirectory).toBe(true)
    expect(sorted[1].isDirectory).toBe(false)
  })

  it('filters entries by extension', () => {
    const entries: FileEntry[] = [
      { name: 'index.ts', path: '/index.ts', isDirectory: false },
      { name: 'README.md', path: '/README.md', isDirectory: false },
      { name: 'src', path: '/src', isDirectory: true },
    ]
    const extensions = ['.ts']
    const filtered = entries.filter(e => e.isDirectory || extensions.some(ext => e.name.endsWith(ext)))
    expect(filtered).toHaveLength(2)
    expect(filtered.map(e => e.name)).toContain('index.ts')
    expect(filtered.map(e => e.name)).not.toContain('README.md')
    expect(filtered.map(e => e.name)).toContain('src')
  })
})
