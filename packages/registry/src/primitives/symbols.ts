import type { SpinnerType } from '@orizen-tui/core'

// Spinner frame sets chosen for visual smoothness at 60fps.
export const spinnerFrames: Record<SpinnerType, string[]> = {
  dots: ['\u280b', '\u2819', '\u2839', '\u2838', '\u283c', '\u2834', '\u2826', '\u2827', '\u2807', '\u280f'],
  line: ['-', '\\', '|', '/'],
  arc: ['\u25dc', '\u25e0', '\u25dd', '\u25de', '\u25e1', '\u25df'],
  bounce: ['\u2801', '\u2802', '\u2804', '\u2802'],
}

export type SpinnerPreset = 'dots' | 'circle' | 'bar'

// Named presets for ergonomic Spinner usage.
export const spinnerPresetFrames: Record<SpinnerPreset, string[]> = {
  dots: ['\u280b', '\u2819', '\u2839', '\u2838', '\u283c', '\u2834', '\u2826', '\u2827', '\u2807', '\u280f'],
  circle: ['\u25d0', '\u25d3', '\u25d1', '\u25d2'],
  bar: ['\u2581', '\u2583', '\u2584', '\u2585', '\u2586', '\u2587', '\u2586', '\u2585', '\u2584', '\u2583'],
}

// Default frame interval in ms targeting a smooth animation cadence.
export const DEFAULT_SPINNER_INTERVAL_MS = 80

export const statusSymbols = {
  success: '\u2713',
  error: '\u2717',
  warning: '\u26a0',
  info: '\u2139',
  pending: '\u25cb',
  running: '\u25cf',
} as const

// ASCII fallback for limited terminals.
export const asciiStatusSymbols = {
  success: '[ok]',
  error: '[!!]',
  warning: '[!]',
  info: '[i]',
  pending: '[ ]',
  running: '[>]',
} as const

export type StatusType = keyof typeof statusSymbols

export function getStatusSymbol(type: StatusType): string {
  const isLimitedTerminal
    = process.platform === 'win32'
    && !process.env.WT_SESSION
    && !process.env.TERM_PROGRAM

  return isLimitedTerminal ? asciiStatusSymbols[type] : statusSymbols[type]
}