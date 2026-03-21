import { describe, expect, it } from 'bun:test'
import { defaultTheme } from './theme.js'

describe('defaultTheme', () => {
  it('has expected default colors', () => {
    expect(defaultTheme.colors.primary).toBe('cyan')
    expect(defaultTheme.colors.success).toBe('green')
    expect(defaultTheme.colors.warning).toBe('yellow')
    expect(defaultTheme.colors.error).toBe('red')
    expect(defaultTheme.colors.info).toBe('blue')
    expect(defaultTheme.colors.muted).toBe('gray')
  })

  it('has expected default borderStyle', () => {
    expect(defaultTheme.borders.style).toBe('round')
  })

  it('has expected default spinner', () => {
    expect(defaultTheme.spinner).toBe('dots')
  })
})
