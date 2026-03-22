import { describe, expect, it } from 'bun:test'
import { asciiStatusSymbols, DEFAULT_SPINNER_INTERVAL_MS, getStatusSymbol, spinnerFrames, statusSymbols } from './symbols.js'

describe('spinnerFrames', () => {
  it('has dots frames', () => {
    expect(spinnerFrames.dots.length).toBeGreaterThan(0)
    expect(spinnerFrames.dots[0]).toBe('⠋')
  })

  it('has line frames', () => {
    expect(spinnerFrames.line).toContain('-')
    expect(spinnerFrames.line).toContain('/')
  })

  it('has arc frames', () => {
    expect(spinnerFrames.arc.length).toBeGreaterThan(0)
  })

  it('has bounce frames', () => {
    expect(spinnerFrames.bounce.length).toBeGreaterThan(0)
  })
})

describe('DEFAULT_SPINNER_INTERVAL_MS', () => {
  it('is a positive number', () => {
    expect(DEFAULT_SPINNER_INTERVAL_MS).toBeGreaterThan(0)
  })
})

describe('statusSymbols', () => {
  it('has all required status types', () => {
    expect(statusSymbols.success).toBeDefined()
    expect(statusSymbols.error).toBeDefined()
    expect(statusSymbols.warning).toBeDefined()
    expect(statusSymbols.info).toBeDefined()
    expect(statusSymbols.pending).toBeDefined()
    expect(statusSymbols.running).toBeDefined()
  })
})

describe('asciiStatusSymbols', () => {
  it('has ASCII-only values (no Unicode)', () => {
    for (const val of Object.values(asciiStatusSymbols)) {
      // All chars should be in ASCII range
      expect([...val].every(c => c.charCodeAt(0) < 128)).toBe(true)
    }
  })
})

describe('getStatusSymbol', () => {
  it('returns a non-empty string for each status type', () => {
    const types = ['success', 'error', 'warning', 'info', 'pending', 'running'] as const
    for (const type of types) {
      const symbol = getStatusSymbol(type)
      expect(symbol.length).toBeGreaterThan(0)
    }
  })
})
