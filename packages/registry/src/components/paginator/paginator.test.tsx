import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { Paginator } from './index.js'

function stripAnsi(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/\x1B\[[0-9;]*m/g, '')
}

describe('Paginator', () => {
  it('renders dots for each page', () => {
    const { lastFrame } = render(<Paginator total={5} current={1} />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('●')
    expect(frame).toContain('○')
  })

  it('marks the correct dot as active', () => {
    const { lastFrame } = render(<Paginator total={3} current={2} />)
    const frame = stripAnsi(lastFrame() ?? '')
    // 1 active (page 2) + 2 inactive
    const activeDots = (frame.match(/●/g) ?? []).length
    const inactiveDots = (frame.match(/○/g) ?? []).length
    expect(activeDots).toBe(1)
    expect(inactiveDots).toBe(2)
  })

  it('renders numeric variant', () => {
    const { lastFrame } = render(<Paginator total={10} current={4} variant="numeric" />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('4')
    expect(frame).toContain('10')
  })

  it('uses custom dot characters', () => {
    const { lastFrame } = render(<Paginator total={3} current={1} activeDot="◆" inactiveDot="◇" />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('◆')
    expect(frame).toContain('◇')
  })

  it('renders a single page correctly', () => {
    const { lastFrame } = render(<Paginator total={1} current={1} />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('●')
    expect(frame).not.toContain('○')
  })
})
