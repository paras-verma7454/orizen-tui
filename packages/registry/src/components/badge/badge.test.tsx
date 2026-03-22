import { describe, expect, it } from 'bun:test'
import { render } from 'ink-testing-library'
import React from 'react'
import { Badge } from './index.js'

describe('Badge', () => {
  it('renders children text', () => {
    const { lastFrame } = render(<Badge>hello</Badge>)
    expect(lastFrame()).toContain('hello')
  })

  it('renders with default variant', () => {
    const { lastFrame } = render(<Badge>default</Badge>)
    expect(lastFrame()).toContain('[default]')
  })

  it('renders with success variant', () => {
    const { lastFrame } = render(<Badge variant="success">done</Badge>)
    expect(lastFrame()).toContain('[done]')
  })

  it('renders with error variant', () => {
    const { lastFrame } = render(<Badge variant="error">failed</Badge>)
    expect(lastFrame()).toContain('[failed]')
  })

  it('renders with warning variant', () => {
    const { lastFrame } = render(<Badge variant="warning">warn</Badge>)
    expect(lastFrame()).toContain('[warn]')
  })

  it('renders with info variant', () => {
    const { lastFrame } = render(<Badge variant="info">info</Badge>)
    expect(lastFrame()).toContain('[info]')
  })
})
