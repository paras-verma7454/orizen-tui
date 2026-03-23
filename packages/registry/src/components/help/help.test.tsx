import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { Help } from './index.js'

const BINDINGS = [
  { key: '↑↓', description: 'Navigate' },
  { key: 'Enter', description: 'Select' },
  { key: 'Esc', description: 'Cancel' },
]

describe('Help', () => {
  it('renders all key labels', () => {
    const { lastFrame } = render(<Help bindings={BINDINGS} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('↑↓')
    expect(frame).toContain('Enter')
    expect(frame).toContain('Esc')
  })

  it('renders all descriptions', () => {
    const { lastFrame } = render(<Help bindings={BINDINGS} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('Navigate')
    expect(frame).toContain('Select')
    expect(frame).toContain('Cancel')
  })

  it('renders with column direction', () => {
    const { lastFrame } = render(<Help bindings={BINDINGS} direction="column" />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('↑↓')
    expect(frame).toContain('Navigate')
  })

  it('renders empty bindings without error', () => {
    const { lastFrame } = render(<Help bindings={[]} />)
    expect(lastFrame()).toBeDefined()
  })

  it('renders a single binding', () => {
    const { lastFrame } = render(<Help bindings={[{ key: 'q', description: 'Quit' }]} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('q')
    expect(frame).toContain('Quit')
  })
})
