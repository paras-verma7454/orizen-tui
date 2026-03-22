import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { NumberInput, processNumberKey } from './index.js'

// ── Pure logic tests ──────────────────────────────────────────────────────────
describe('processNumberKey', () => {
  it('increments by step on upArrow', () => {
    expect(processNumberKey(5, '', { upArrow: true }, -Infinity, Infinity, 1)).toBe(6)
  })

  it('decrements by step on downArrow', () => {
    expect(processNumberKey(5, '', { downArrow: true }, -Infinity, Infinity, 1)).toBe(4)
  })

  it('clamps at max on upArrow', () => {
    expect(processNumberKey(10, '', { upArrow: true }, 0, 10, 1)).toBe(10)
  })

  it('clamps at min on downArrow', () => {
    expect(processNumberKey(0, '', { downArrow: true }, 0, 10, 1)).toBe(0)
  })

  it('respects custom step', () => {
    expect(processNumberKey(0, '', { upArrow: true }, -Infinity, Infinity, 5)).toBe(5)
    expect(processNumberKey(10, '', { downArrow: true }, -Infinity, Infinity, 5)).toBe(5)
  })

  it('returns value unchanged for unhandled keys', () => {
    expect(processNumberKey(5, 'a', {}, -Infinity, Infinity, 1)).toBe(5)
  })
})

// ── Render tests ──────────────────────────────────────────────────────────────
// NOTE: NumberInput has no cursor-specific test so all render tests use focus=false
// to avoid the Ink 5 stdin.ref test environment issue.

describe('NumberInput (render)', () => {
  it('renders the current value', () => {
    const { lastFrame } = render(
      <NumberInput value={42} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('42')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(
      <NumberInput value={3000} onChange={() => {}} label="Port:" focus={false} />,
    )
    expect(lastFrame()).toContain('Port:')
  })

  it('renders arrow key hint', () => {
    const { lastFrame } = render(
      <NumberInput value={0} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('↑↓')
  })

  it('renders value 0', () => {
    const { lastFrame } = render(
      <NumberInput value={0} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('0')
  })

  it('renders negative values', () => {
    const { lastFrame } = render(
      <NumberInput value={-5} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('-5')
  })
})
