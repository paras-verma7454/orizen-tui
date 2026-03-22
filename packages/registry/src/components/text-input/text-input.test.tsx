import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React, { useState } from 'react'
import { processTextInput, TextInput } from './index.js'

// ── Pure logic tests (fast, no Ink rendering needed) ─────────────────────────
describe('processTextInput', () => {
  it('appends a printable character', () => {
    expect(processTextInput('hello', 'a', {})).toBe('helloa')
  })

  it('appends to empty string', () => {
    expect(processTextInput('', 'x', {})).toBe('x')
  })

  it('removes last character on backspace', () => {
    expect(processTextInput('hello', '', { backspace: true })).toBe('hell')
  })

  it('removes last character on delete', () => {
    expect(processTextInput('hello', '', { delete: true })).toBe('hell')
  })

  it('returns empty string on escape', () => {
    expect(processTextInput('hello', '', { escape: true })).toBe('')
  })

  it('ignores ctrl+key combinations', () => {
    expect(processTextInput('hello', 'c', { ctrl: true })).toBe('hello')
  })

  it('ignores meta+key combinations', () => {
    expect(processTextInput('hello', 'a', { meta: true })).toBe('hello')
  })

  it('ignores multi-character input sequences (arrow keys, etc.)', () => {
    expect(processTextInput('hello', '\x1B[A', {})).toBe('hello')
  })

  it('backspace on empty string returns empty string', () => {
    expect(processTextInput('', '', { backspace: true })).toBe('')
  })
})

// ── Render tests (static output via ink-testing-library) ─────────────────────
function Wrapper({ initialValue = '', mask }: { initialValue?: string, mask?: string }) {
  const [value, setValue] = useState(initialValue)
  return <TextInput value={value} onChange={setValue} placeholder="Type here..." mask={mask} focus />
}

describe('TextInput (render)', () => {
  it('renders placeholder when value is empty', () => {
    const { lastFrame } = render(<Wrapper />)
    expect(lastFrame()).toContain('Type here...')
  })

  it('renders current value', () => {
    const { lastFrame } = render(<Wrapper initialValue="hello" />)
    expect(lastFrame()).toContain('hello')
  })

  it('masks characters when mask prop is set', () => {
    const { lastFrame } = render(<Wrapper initialValue="secret" mask="*" />)
    expect(lastFrame()).toContain('******')
    expect(lastFrame()).not.toContain('secret')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(
      <TextInput value="" onChange={() => {}} label="Username" focus />,
    )
    expect(lastFrame()).toContain('Username')
  })

  it('renders cursor block when focused', () => {
    const { lastFrame } = render(<Wrapper />)
    expect(lastFrame()).toContain('█')
  })

  it('does not render cursor when unfocused', () => {
    const { lastFrame } = render(
      <TextInput value="" onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).not.toContain('█')
  })
})
