import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { formatTime, Timer } from './index.js'

function stripAnsi(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/\x1B\[[0-9;]*m/g, '')
}

describe('formatTime', () => {
  it('formats seconds only', () => {
    expect(formatTime(5000)).toBe('00:05')
  })

  it('formats minutes and seconds', () => {
    expect(formatTime(90000)).toBe('01:30')
  })

  it('formats hours', () => {
    expect(formatTime(3661000)).toBe('1:01:01')
  })

  it('rounds up partial seconds', () => {
    expect(formatTime(1500)).toBe('00:02')
  })

  it('clamps negative values to zero', () => {
    expect(formatTime(-1000)).toBe('00:00')
  })

  it('handles zero', () => {
    expect(formatTime(0)).toBe('00:00')
  })
})

describe('Timer', () => {
  it('renders the initial duration', () => {
    const { lastFrame } = render(<Timer durationMs={60000} />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('01:00')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(<Timer durationMs={30000} label="Remaining:" />)
    expect(lastFrame()).toContain('Remaining:')
  })

  it('renders without a label', () => {
    const { lastFrame } = render(<Timer durationMs={10000} />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('00:10')
  })
})
