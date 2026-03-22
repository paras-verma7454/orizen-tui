import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { Spinner } from './index.js'

function stripAnsi(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/\x1B\[[0-9;]*m/g, '')
}

describe('Spinner', () => {
  beforeEach(() => {
    mock.restore()
  })

  afterEach(() => {
    mock.restore()
  })

  it('renders the first frame on initial render', () => {
    const { lastFrame } = render(<Spinner />)
    expect(lastFrame()).toContain('\u280B')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(<Spinner label="Loading..." />)
    expect(lastFrame()).toContain('Loading...')
  })

  it('uses named preset frames when provided', () => {
    const { lastFrame } = render(<Spinner preset="circle" />)
    expect(lastFrame()).toContain('\u25D0')
  })

  it('uses custom frames when provided', () => {
    const { lastFrame } = render(<Spinner frames={['-', '/', '|', '\\']} />)
    expect(lastFrame()).toContain('-')
  })

  it('prefers custom frames over preset', () => {
    const { lastFrame } = render(<Spinner preset="dots" frames={['X', 'Y']} />)
    expect(lastFrame()).toContain('X')
  })

  it('renders without a label', () => {
    const { lastFrame } = render(<Spinner />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame.trim()).toHaveLength(1)
  })
})
