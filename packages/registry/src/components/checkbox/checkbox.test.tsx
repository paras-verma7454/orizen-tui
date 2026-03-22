import type { CheckboxItem } from './index.js'
import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { Checkbox, navigateCheckbox, toggleCheckboxItem } from './index.js'

// ── Pure logic tests ──────────────────────────────────────────────────────────
describe('toggleCheckboxItem', () => {
  it('adds an unselected value', () => {
    expect(toggleCheckboxItem(['a'], 'b')).toEqual(['a', 'b'])
  })

  it('removes an already-selected value', () => {
    expect(toggleCheckboxItem(['a', 'b'], 'a')).toEqual(['b'])
  })

  it('adds to empty selection', () => {
    expect(toggleCheckboxItem([], 'x')).toEqual(['x'])
  })

  it('removes last item leaving empty array', () => {
    expect(toggleCheckboxItem(['x'], 'x')).toEqual([])
  })
})

describe('navigateCheckbox', () => {
  it('moves down within bounds', () => {
    expect(navigateCheckbox(0, 3, 'down')).toBe(1)
  })

  it('clamps at last item on down', () => {
    expect(navigateCheckbox(2, 3, 'down')).toBe(2)
  })

  it('moves up within bounds', () => {
    expect(navigateCheckbox(2, 3, 'up')).toBe(1)
  })

  it('clamps at 0 on up', () => {
    expect(navigateCheckbox(0, 3, 'up')).toBe(0)
  })
})

// ── Render tests ──────────────────────────────────────────────────────────────
// NOTE: Only the first render() call with focus=true works in the test environment
// (Ink 5 stdin mock breaks on subsequent useInput activations). Put focus=true
// test first; all others use focus=false.

const items: CheckboxItem[] = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'ESLint', value: 'eslint' },
  { label: 'Prettier', value: 'prettier' },
]

describe('Checkbox (render)', () => {
  it('renders cursor indicator when focused', () => {
    // focus=true test must be first
    const { lastFrame } = render(
      <Checkbox items={items} value={[]} onChange={() => {}} focus />,
    )
    expect(lastFrame()).toContain('❯')
  })

  it('renders all items', () => {
    const { lastFrame } = render(
      <Checkbox items={items} value={[]} onChange={() => {}} focus={false} />,
    )
    const frame = lastFrame() ?? ''
    expect(frame).toContain('TypeScript')
    expect(frame).toContain('ESLint')
    expect(frame).toContain('Prettier')
  })

  it('renders checked state for selected items', () => {
    const { lastFrame } = render(
      <Checkbox items={items} value={['typescript']} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('[x]')
    expect(lastFrame()).toContain('[ ]')
  })

  it('renders unchecked state when nothing is selected', () => {
    const { lastFrame } = render(
      <Checkbox items={items} value={[]} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).not.toContain('[x]')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(
      <Checkbox items={items} value={[]} onChange={() => {}} label="Select features" focus={false} />,
    )
    expect(lastFrame()).toContain('Select features')
  })
})
