import type { TerminalStyle } from './theme.js'

/**
 * tv() — Terminal Variants
 *
 * Shadcn/ui uses CVA (class-variance-authority) for CSS class variants.
 * tv() is the terminal equivalent: instead of CSS classes it resolves
 * to TerminalStyle objects that Ink components consume directly.
 *
 * Usage:
 *   const badgeVariants = tv({
 *     default: { color: 'cyan', bold: true },
 *     success: { color: 'green', bold: true },
 *     error:   { color: 'red',   bold: true },
 *   })
 *
 *   // In component:
 *   const style = badgeVariants('success') // → { color: 'green', bold: true }
 *   <Text color={style.color} bold={style.bold}>Done</Text>
 */
export function tv<K extends string>(
  variants: Record<K, TerminalStyle>,
  base?: TerminalStyle,
): (variant: K) => TerminalStyle {
  return (variant: K): TerminalStyle => ({
    ...base,
    ...(variants[variant] ?? {}),
  })
}

/**
 * mergeStyles — merge two TerminalStyle objects (right wins on conflict).
 * Use when a component needs to merge theme-derived styles with prop overrides.
 */
export function mergeStyles(base: TerminalStyle, override?: TerminalStyle): TerminalStyle {
  if (!override)
    return base
  return { ...base, ...override }
}
