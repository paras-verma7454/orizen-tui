import { Box, Text } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React from 'react'

export interface PaginatorProps {
  /** Total number of pages */
  total: number
  /** Current page (1-based) */
  current: number
  /** Visual style: 'dots' shows bullet chars, 'numeric' shows "3 / 10" */
  variant?: 'dots' | 'numeric'
  /** Character for the active page dot (dots variant) */
  activeDot?: string
  /** Character for inactive page dots (dots variant) */
  inactiveDot?: string
}

/**
 * Dot-style or numeric page navigation indicator.
 */
export function Paginator({
  total,
  current,
  variant = 'dots',
  activeDot = '●',
  inactiveDot = '○',
}: PaginatorProps): JSX.Element {
  const { colors } = useTheme()

  if (variant === 'numeric') {
    return (
      <Box flexDirection="row" gap={0}>
        <Text color={colors.primary}>{current}</Text>
        <Text color={colors.muted}>{` / ${total}`}</Text>
      </Box>
    )
  }

  return (
    <Box flexDirection="row" gap={1}>
      {Array.from({ length: total }, (_, i) => {
        const pageNum = i + 1
        const isActive = pageNum === current
        return (
          <Text key={pageNum} color={isActive ? colors.primary : colors.muted}>
            {isActive ? activeDot : inactiveDot}
          </Text>
        )
      })}
    </Box>
  )
}
