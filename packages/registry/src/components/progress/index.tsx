import React from 'react'
import { Box, Text } from 'ink'
import { useTheme } from '@orizen-tui/core'

export interface ProgressProps {
  /** Current value (0 to max). Omit for indeterminate mode. */
  value?: number
  /** Maximum value — defaults to 100 */
  max?: number
  /** Bar width in columns — defaults to terminal width or 40 */
  width?: number
  /** Label shown before the bar */
  label?: string
  /** Show percentage text after the bar */
  showPercent?: boolean
}

const FILLED = '█'
const EMPTY = '░'

/**
 * Horizontal progress bar.
 *
 * terminal-ui rules applied:
 * - tuicomp-box-flexbox: Box with flexDirection row for layout
 * - tuicomp-percentage-widths: bar width respects terminal width
 * - ux-progress-indicators: show for operations over 1 second
 */
export function Progress({ value, max = 100, width, label, showPercent = true }: ProgressProps) {
  const { colors } = useTheme()
  // robust-tty-detection: fallback to 40 if stdout.columns is 0 (piped/CI)
  const termWidth = process.stdout.columns || 80
  const barWidth = width ?? Math.min(40, termWidth - (label ? label.length + 3 : 0) - (showPercent ? 8 : 0))

  const isIndeterminate = value === undefined

  let filledCount: number
  let percent: number

  if (isIndeterminate) {
    // Indeterminate: show a moving partial fill — handled externally via animation
    filledCount = Math.floor(barWidth * 0.3)
    percent = 0
  }
  else {
    percent = Math.min(100, Math.max(0, (value / max) * 100))
    filledCount = Math.round((percent / 100) * barWidth)
  }

  const emptyCount = barWidth - filledCount
  const bar = FILLED.repeat(filledCount) + EMPTY.repeat(emptyCount)

  return (
    <Box flexDirection="row" gap={1}>
      {label ? <Text>{label}</Text> : null}
      <Text color={colors.primary}>{bar}</Text>
      {showPercent && !isIndeterminate
        ? <Text color={colors.muted}>{`${Math.round(percent)}%`}</Text>
        : null}
    </Box>
  )
}
