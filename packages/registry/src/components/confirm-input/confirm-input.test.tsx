import { describe, expect, it } from 'bun:test'
import React from 'react'
import { render } from 'ink-testing-library'
import { ConfirmInput, resolveConfirmKey } from './index.js'

// ── Pure logic tests ──────────────────────────────────────────────────────────
describe('resolveConfirmKey', () => {
  it('Enter returns true when defaultAnswer is yes', () => {
    expect(resolveConfirmKey('', { return: true }, 'yes')).toBe(true)
  })

  it('Enter returns false when defaultAnswer is no', () => {
    expect(resolveConfirmKey('', { return: true }, 'no')).toBe(false)
  })

  it('y key returns true regardless of default', () => {
    expect(resolveConfirmKey('y', {}, 'no')).toBe(true)
    expect(resolveConfirmKey('y', {}, 'yes')).toBe(true)
  })

  it('Y key returns true (case insensitive)', () => {
    expect(resolveConfirmKey('Y', {}, 'no')).toBe(true)
  })

  it('n key returns false regardless of default', () => {
    expect(resolveConfirmKey('n', {}, 'yes')).toBe(false)
    expect(resolveConfirmKey('n', {}, 'no')).toBe(false)
  })

  it('N key returns false (case insensitive)', () => {
    expect(resolveConfirmKey('N', {}, 'yes')).toBe(false)
  })

  it('Escape returns false', () => {
    expect(resolveConfirmKey('', { escape: true }, 'yes')).toBe(false)
  })

  it('unhandled key returns null', () => {
    expect(resolveConfirmKey('a', {}, 'yes')).toBeNull()
    expect(resolveConfirmKey('', {}, 'no')).toBeNull()
  })
})

// ── Render tests ──────────────────────────────────────────────────────────────
// NOTE: Only the first render() call with focus=true works in the test environment
// (Ink 5 stdin mock breaks on subsequent useInput activations). Put focus=true
// test first; all others use focus=false.

describe('ConfirmInput (render)', () => {
  it('renders cursor block when focused', () => {
    // focus=true test must be first
    const { lastFrame } = render(
      <ConfirmInput message="OK?" onConfirm={() => {}} focus />,
    )
    expect(lastFrame()).toContain('█')
  })

  it('renders the message', () => {
    const { lastFrame } = render(
      <ConfirmInput message="Overwrite file?" onConfirm={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('Overwrite file?')
  })

  it('shows [Y/n] hint when defaultAnswer is yes', () => {
    const { lastFrame } = render(
      <ConfirmInput message="Continue?" defaultAnswer="yes" onConfirm={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('[Y/n]')
  })

  it('shows [y/N] hint when defaultAnswer is no', () => {
    const { lastFrame } = render(
      <ConfirmInput message="Delete?" defaultAnswer="no" onConfirm={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('[y/N]')
  })
})
