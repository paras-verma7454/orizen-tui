import { Box, Text } from 'ink'
import { tv, useTheme } from 'orizen-tui-core'
import React from 'react'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface BadgeProps {
  /** Visual variant — ux-color-semantics: red=error, yellow=warning, green=success */
  variant?: BadgeVariant
  children: React.ReactNode
}

/**
 * Inline colored label.
 *
 * First component to use tv() — the terminal variant system.
 * Variant styles are resolved at render time from the theme's color tokens.
 */
export function Badge({ variant = 'default', children }: BadgeProps): JSX.Element {
  const { colors } = useTheme()

  // tv() — terminal variants (orizen-tui's equivalent of cva())
  // Variant map is derived from theme tokens so it respects theme overrides.
  const badgeVariants = tv<BadgeVariant>(
    {
      default: { color: colors.primary, bold: true },
      success: { color: colors.success, bold: true },
      warning: { color: colors.warning, bold: true },
      error: { color: colors.error, bold: true },
      info: { color: colors.info, bold: true },
    },
  )

  const style = badgeVariants(variant)

  return (
    <Box>
      <Text bold={style.bold} color={style.color}>
        [
        {children}
        ]
      </Text>
    </Box>
  )
}
