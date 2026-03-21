import { describe, expect, it } from 'bun:test'
import React from 'react'
import { render } from 'ink-testing-library'
import type { MultiSelectItem } from './index.js'
import { MultiSelect, toggleMultiSelect, navigateMultiSelect } from './index.js'

// ── Pure logic tests ──────────────────────────────────────────────────────────
describe('toggleMultiSelect', () => {
  it('adds an unselected value', () => {
    expect(toggleMultiSelect(['react'], 'vue')).toEqual(['react', 'vue'])
  })

  it('removes an already-selected value', () => {
    expect(toggleMultiSelect(['react', 'vue'], 'react')).toEqual(['vue'])
  })

  it('adds to empty selection', () => {
    expect(toggleMultiSelect([], 'react')).toEqual(['react'])
  })

  it('removes last item leaving empty array', () => {
    expect(toggleMultiSelect(['react'], 'react')).toEqual([])
  })
})

describe('navigateMultiSelect', () => {
  it('moves down within bounds', () => {
    expect(navigateMultiSelect(0, 4, 'down')).toBe(1)
  })

  it('clamps at last item on down', () => {
    expect(navigateMultiSelect(3, 4, 'down')).toBe(3)
  })

  it('moves up within bounds', () => {
    expect(navigateMultiSelect(2, 4, 'up')).toBe(1)
  })

  it('clamps at 0 on up', () => {
    expect(navigateMultiSelect(0, 4, 'up')).toBe(0)
  })
})

// ── Render tests ──────────────────────────────────────────────────────────────
// NOTE: Only the first render() call with focus=true works in the test environment
// (Ink 5 stdin mock breaks on subsequent useInput activations). Put focus=true
// test first; all others use focus=false.

const items: MultiSelectItem[] = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

describe('MultiSelect (render)', () => {
  it('renders cursor indicator when focused', () => {
    // focus=true test must be first
    const { lastFrame } = render(
      <MultiSelect items={items} value={[]} onChange={() => {}} focus />,
    )
    expect(lastFrame()).toContain('❯')
  })

  it('renders all items', () => {
    const { lastFrame } = render(
      <MultiSelect items={items} value={[]} onChange={() => {}} focus={false} />,
    )
    const frame = lastFrame() ?? ''
    expect(frame).toContain('React')
    expect(frame).toContain('Vue')
    expect(frame).toContain('Svelte')
  })

  it('renders filled marker for selected items', () => {
    const { lastFrame } = render(
      <MultiSelect items={items} value={['react']} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('◉')
  })

  it('renders empty marker for unselected items', () => {
    const { lastFrame } = render(
      <MultiSelect items={items} value={[]} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('○')
    expect(lastFrame()).not.toContain('◉')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(
      <MultiSelect items={items} value={[]} onChange={() => {}} label="Pick frameworks" focus={false} />,
    )
    expect(lastFrame()).toContain('Pick frameworks')
  })

  it('shows hint text when onSubmit is provided', () => {
    const { lastFrame } = render(
      <MultiSelect items={items} value={[]} onChange={() => {}} onSubmit={() => {}} focus={false} />,
    )
    expect(lastFrame()).toContain('Enter to confirm')
  })

  it('does not show hint text without onSubmit', () => {
    const { lastFrame } = render(
      <MultiSelect items={items} value={[]} onChange={() => {}} focus={false} />,
    )
    expect(lastFrame()).not.toContain('Enter to confirm')
  })
})
