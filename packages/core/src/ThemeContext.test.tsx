import { describe, expect, it } from 'bun:test'
import React from 'react'
import { render } from 'ink-testing-library'
import { Text } from 'ink'
import { ThemeProvider, useTheme, defaultTheme } from './index.js'

function ThemeConsumer() {
  const theme = useTheme()
  return <Text>{theme.colors.primary}</Text>
}

describe('useTheme', () => {
  it('returns defaultTheme when no provider is present', () => {
    const { lastFrame } = render(<ThemeConsumer />)
    expect(lastFrame()).toContain(defaultTheme.colors.primary)
  })
})

describe('ThemeProvider', () => {
  it('provides the default theme when no theme prop given', () => {
    const { lastFrame } = render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(lastFrame()).toContain('cyan')
  })

  it('merges partial theme override with defaults', () => {
    const { lastFrame } = render(
      <ThemeProvider theme={{ colors: { primary: 'magenta' } }}>
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(lastFrame()).toContain('magenta')
  })

  it('preserves unoverridden color values', () => {
    function MutedConsumer() {
      const { colors } = useTheme()
      return <Text>{colors.muted}</Text>
    }
    const { lastFrame } = render(
      <ThemeProvider theme={{ colors: { primary: 'magenta' } }}>
        <MutedConsumer />
      </ThemeProvider>,
    )
    // muted should still be the default 'gray'
    expect(lastFrame()).toContain(defaultTheme.colors.muted)
  })
})
