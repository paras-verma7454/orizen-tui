import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { formatElapsed, Stopwatch } from './index.js'

function stripAnsi(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/\x1B\[[0-9;]*m/g, '')
}

describe('formatElapsed', () => {
  it('formats zero', () => {
    expect(formatElapsed(0)).toBe('00:00')
  })

  it('formats seconds only', () => {
    expect(formatElapsed(45000)).toBe('00:45')
  })

  it('formats minutes and seconds', () => {
    expect(formatElapsed(125000)).toBe('02:05')
  })

  it('formats hours', () => {
    expect(formatElapsed(3723000)).toBe('1:02:03')
  })

  it('truncates sub-second values', () => {
    expect(formatElapsed(999)).toBe('00:00')
  })
})

describe('Stopwatch', () => {
  it('renders starting at 00:00', () => {
    const { lastFrame } = render(<Stopwatch />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('00:00')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(<Stopwatch label="Elapsed:" />)
    expect(lastFrame()).toContain('Elapsed:')
  })

  it('renders when paused', () => {
    const { lastFrame } = render(<Stopwatch running={false} />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('00:00')
  })
})
