import { Box, Text } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React from 'react'

export interface KeyBinding {
  /** The key or key combo to display e.g. "↑↓", "Enter", "q" */
  key: string
  /** Short description of what the key does */
  description: string
}

export interface HelpProps {
  /** Key bindings to display */
  bindings: KeyBinding[]
  /** Layout direction — 'row' spreads bindings horizontally, 'column' stacks them */
  direction?: 'row' | 'column'
}

/**
 * Auto-generated keybinding help panel.
 * Renders a list of key/description pairs using theme colors.
 */
export function Help({ bindings, direction = 'row' }: HelpProps): JSX.Element {
  const { colors } = useTheme()

  return (
    <Box flexDirection={direction} gap={2} flexWrap="wrap">
      {bindings.map(({ key, description }) => (
        <Box key={key} flexDirection="row" gap={1}>
          <Text color={colors.primary} bold>{key}</Text>
          <Text color={colors.muted}>{description}</Text>
        </Box>
      ))}
    </Box>
  )
}
