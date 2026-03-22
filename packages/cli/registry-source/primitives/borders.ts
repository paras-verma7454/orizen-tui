import type { BorderStyle } from 'orizen-tui-core'
import process from 'node:process'

// terminal-ui skill (tuicomp-border-styles): use Ink's native Box borderStyle prop,
// not manual ASCII string concatenation.
export type InkBorderStyle = 'round' | 'single' | 'double' | 'bold' | 'classic'

export const borderStyleMap: Record<BorderStyle, InkBorderStyle> = {
  round: 'round',
  single: 'single',
  double: 'double',
  bold: 'bold',
  // terminal-ui (robust-graceful-degradation): ASCII fallback for limited terminals
  classic: 'classic',
}

/**
 * Returns the effective Ink border style for the current environment.
 *
 * terminal-ui skill (robust-tty-detection): detect limited terminal and
 * fall back to 'classic' ASCII borders on Windows CMD (no Unicode support).
 */
export function getEffectiveBorderStyle(style: BorderStyle): InkBorderStyle {
  const isLimitedTerminal
    = process.platform === 'win32'
      && !process.env.WT_SESSION // not Windows Terminal
      && !process.env.TERM_PROGRAM // not VS Code / Windows Terminal via TERM_PROGRAM

  if (isLimitedTerminal)
    return 'classic'

  return borderStyleMap[style]
}
