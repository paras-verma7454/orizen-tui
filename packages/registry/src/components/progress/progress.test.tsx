import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { Progress } from './index.js'

describe('Progress', () => {
  it('renders filled bar at 100%', () => {
    const { lastFrame } = render(<Progress value={100} width={10} />)
    const frame = lastFrame() ?? ''
    // All chars should be filled (█)
    expect(frame).toContain('██████████')
  })

  it('renders empty bar at 0%', () => {
    const { lastFrame } = render(<Progress value={0} width={10} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('░░░░░░░░░░')
  })

  it('renders half-filled bar at 50%', () => {
    const { lastFrame } = render(<Progress value={50} max={100} width={10} />)
    const frame = lastFrame() ?? ''
    expect(frame).toContain('█████░░░░░')
  })

  it('shows percentage text by default', () => {
    const { lastFrame } = render(<Progress value={75} width={10} />)
    expect(lastFrame()).toContain('75%')
  })

  it('hides percentage when showPercent=false', () => {
    const { lastFrame } = render(<Progress value={75} width={10} showPercent={false} />)
    expect(lastFrame()).not.toContain('%')
  })

  it('renders a label when provided', () => {
    const { lastFrame } = render(<Progress value={50} label="Build" width={10} />)
    expect(lastFrame()).toContain('Build')
  })

  it('renders in indeterminate mode when value is undefined', () => {
    const { lastFrame } = render(<Progress width={10} />)
    const frame = lastFrame() ?? ''
    // Should contain some filled chars but not all
    expect(frame).toContain('█')
    expect(frame).toContain('░')
  })

  it('clamps value below 0 to 0%', () => {
    const { lastFrame } = render(<Progress value={-10} width={10} />)
    expect(lastFrame()).toContain('░░░░░░░░░░')
  })

  it('clamps value above max to 100%', () => {
    const { lastFrame } = render(<Progress value={150} max={100} width={10} />)
    expect(lastFrame()).toContain('██████████')
  })
})
