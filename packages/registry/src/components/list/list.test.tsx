import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { List } from './index.js'

const ITEMS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
]

function stripAnsi(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/\x1B\[[0-9;]*m/g, '')
}

describe('List', () => {
  it('renders all items when within height', () => {
    const { lastFrame } = render(<List items={ITEMS} height={10} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('Apple')
    expect(frame).toContain('Banana')
    expect(frame).toContain('Cherry')
    expect(frame).toContain('Date')
  })

  it('shows the first item as active by default', () => {
    const { lastFrame } = render(<List items={ITEMS} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('❯')
  })

  it('filters items by label', () => {
    const { lastFrame } = render(<List items={ITEMS} filter="an" />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('Banana')
    expect(frame).not.toContain('Cherry')
    expect(frame).not.toContain('Date')
  })

  it('shows "No items found" when filter matches nothing', () => {
    const { lastFrame } = render(<List items={ITEMS} filter="xyz" />)
    expect(lastFrame()).toContain('No items found')
  })

  it('shows loading spinner when isLoading is true', () => {
    const { lastFrame } = render(<List items={[]} isLoading />)
    expect(lastFrame()).toContain('Loading')
  })

  it('shows pagination info when items exceed height', () => {
    const { lastFrame } = render(<List items={ITEMS} height={2} />)
    const frame = stripAnsi(lastFrame() ?? '')
    expect(frame).toContain('of 4')
  })
})
