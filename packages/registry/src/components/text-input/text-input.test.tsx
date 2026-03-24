import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React, { useState } from 'react'
import { processTextInput, TextInput } from './index.js'

// ── Pure logic tests (fast, no Ink rendering needed) ─────────────────────────
describe('processTextInput', () => {
  it('appends a printable character', () => {
    expect(processTextInput('hello', 'a', {}).value).toBe('helloa')
  })

  it('appends to empty string', () => {
    expect(processTextInput('', 'x', {}).value).toBe('x')
  })

  it('removes last character on backspace', () => {
    expect(processTextInput('hello', '', { backspace: true }).value).toBe('hell')
  })

  it('removes last character on delete', () => {
    expect(processTextInput('hello', '', { delete: true }).value).toBe('hell')
  })

  it('returns empty string on escape', () => {
    expect(processTextInput('hello', '', { escape: true }).value).toBe('')
  })

  it('Enter triggers submit', () => {
    const result = processTextInput('hello', '', { return: true })
    expect(result.value).toBe('hello')
    expect(result.submit).toBe(true)
  })

  it('ignores ctrl+key combinations', () => {
    expect(processTextInput('hello', 'c', { ctrl: true }).value).toBe('hello')
  })

  it('ignores meta+key combinations', () => {
    expect(processTextInput('hello', 'a', { meta: true }).value).toBe('hello')
  })

  it('ignores multi-character input sequences (arrow keys, etc.)', () => {
    expect(processTextInput('hello', '\x1B[A', {}).value).toBe('hello')
  })

  it('backspace on empty string returns empty string', () => {
    expect(processTextInput('', '', { backspace: true }).value).toBe('')
  })
})

// ── Render tests (static output via ink-testing-library) ─────────────────────
function Wrapper({ initialValue = '', mask }: { initialValue?: string, mask?: string }) {
  const [value, setValue] = useState(initialValue)
  return <TextInput value={value} onChange={setValue} onSubmit={() => {}} placeholder="Type here..." mask={mask} focus />
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
      <TextInput value="" onChange={() => {}} onSubmit={() => {}} label="Username" focus />,
    )
    expect(lastFrame()).toContain('Username')
  })

  it('renders cursor block when focused', () => {
    const { lastFrame } = render(<Wrapper />)
    expect(lastFrame()).toContain('█')
  })

  it('does not render cursor when unfocused', () => {
    const { lastFrame } = render(
      <TextInput value="" onChange={() => {}} onSubmit={() => {}} focus={false} />,
    )
    expect(lastFrame()).not.toContain('█')
  })
})
