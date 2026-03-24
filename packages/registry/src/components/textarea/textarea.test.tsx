import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { processTextarea, Textarea } from './index.js'

// ── Pure logic tests ──────────────────────────────────────────────────────────
describe('processTextarea', () => {
  it('appends a printable character', () => {
    expect(processTextarea('hello', 'a', {}).value).toBe('helloa')
  })

  it('appends to empty string', () => {
    expect(processTextarea('', 'x', {}).value).toBe('x')
  })

  it('removes last character on backspace', () => {
    expect(processTextarea('hello', '', { backspace: true }).value).toBe('hell')
  })

  it('removes last character on delete', () => {
    expect(processTextarea('hello', '', { delete: true }).value).toBe('hell')
  })

  it('returns empty string on escape', () => {
    expect(processTextarea('hello', '', { escape: true }).value).toBe('')
  })

  it('Enter triggers submit (no newline by default)', () => {
    const result = processTextarea('line1', '', { return: true })
    expect(result.value).toBe('line1')
    expect(result.submit).toBe(true)
  })

  it('Shift+Enter appends newline', () => {
    const result = processTextarea('line1', '', { return: true, shift: true })
    expect(result.value).toBe('line1\n')
    expect(result.submit).toBe(false)
  })

  it('ignores ctrl+key combinations', () => {
    expect(processTextarea('hello', 'c', { ctrl: true }).value).toBe('hello')
  })

  it('ignores meta+key combinations', () => {
    expect(processTextarea('hello', 'a', { meta: true }).value).toBe('hello')
  })

  it('backspace on empty string returns empty string', () => {
    expect(processTextarea('', '', { backspace: true }).value).toBe('')
  })
})

// ── Render tests ──────────────────────────────────────────────────────────────
// NOTE: Only the first render() call with focus=true works in the test environment
// (Ink 5 stdin mock breaks on subsequent useInput activations). Put focus=true
// test first; all others use focus=false to avoid stdin.ref errors.

describe('Textarea (render)', () => {
  it('renders cursor block when focused', () => {
    // focus=true test must be first
    const { lastFrame } = render(<Textarea value="" onChange={() => {}} onSubmit={() => {}} focus />)
    expect(lastFrame()).toContain('█')
  })

  it('renders placeholder when value is empty', () => {
    const { lastFrame } = render(
      <Textarea value="" onChange={() => {}} onSubmit={() => {}} placeholder="Type here..." focus={false} />,
    )
    expect(lastFrame()).toContain('Type here...')
  })

  it('renders current value', () => {
    const { lastFrame } = render(
      <Textarea value="hello" onChange={() => {}} onSubmit={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('hello')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(
      <Textarea value="" onChange={() => {}} onSubmit={() => {}} label="Notes" focus={false} />,
    )
    expect(lastFrame()).toContain('Notes')
  })

  it('does not render cursor when unfocused', () => {
    const { lastFrame } = render(
      <Textarea value="" onChange={() => {}} onSubmit={() => {}} focus={false} />,
    )
    expect(lastFrame()).not.toContain('█')
  })

  it('renders multi-line content', () => {
    const { lastFrame } = render(
      <Textarea value={'line1\nline2'} onChange={() => {}} onSubmit={() => {}} focus={false} />,
    )
    const frame = lastFrame() ?? ''
    expect(frame).toContain('line1')
    expect(frame).toContain('line2')
  })
})
