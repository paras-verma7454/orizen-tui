import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { Viewport } from './index.js'

const LINES = Array.from({ length: 20 }, (_, i) => `Line ${i + 1}`)

describe('Viewport', () => {
  it('renders only the first <height> lines initially', () => {
    const { lastFrame } = render(<Viewport lines={LINES} height={5} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('Line 1')
    expect(frame).toContain('Line 5')
    expect(frame).not.toContain('Line 6')
  })

  it('shows down indicator when content overflows', () => {
    const { lastFrame } = render(<Viewport lines={LINES} height={5} />)
    // Proportional scrollbar shows █ at thumb position
    expect(lastFrame()).toContain('█')
  })

  it('does not show up indicator at the top', () => {
    const { lastFrame } = render(<Viewport lines={LINES} height={5} />)
    expect(lastFrame()).not.toContain('↑')
  })

  it('hides indicators when showScrollIndicator is false', () => {
    const { lastFrame } = render(<Viewport lines={LINES} height={5} showScrollIndicator={false} />)
    expect(lastFrame()).not.toContain('↓')
  })

  it('renders all lines when height exceeds content', () => {
    const short = ['A', 'B', 'C']
    const { lastFrame } = render(<Viewport lines={short} height={10} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('A')
    expect(frame).toContain('B')
    expect(frame).toContain('C')
    expect(frame).not.toContain('↓')
  })
})
