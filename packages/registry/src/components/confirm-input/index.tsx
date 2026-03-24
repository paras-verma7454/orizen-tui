import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React from 'react'

/**
 * Pure key resolution logic — extracted for direct unit testing
 * Returns true (yes), false (no), or null (unhandled key)
 */
export function resolveConfirmKey(
  input: string,
  key: { return?: boolean, escape?: boolean, ctrl?: boolean, meta?: boolean },
  defaultAnswer: 'yes' | 'no',
): boolean | null {
  if (key.return)
    return defaultAnswer === 'yes'
  if (key.escape)
    return false
  if (input.toLowerCase() === 'y')
    return true
  if (input.toLowerCase() === 'n')
    return false
  return null
}

export interface ConfirmInputProps {
  /** Question shown to the user */
  message: string
  /** Pre-selected answer — shown capitalised in the prompt hint */
  defaultAnswer?: 'yes' | 'no'
  /** Called when the user makes a choice */
  onConfirm?: (answer: boolean) => void
  /** Whether this input is focused and accepting keyboard input */
  focus?: boolean
}

/**
 * Inline y/n confirmation prompt.
 *
 * Shows `message [Y/n]` (default yes) or `message [y/N]` (default no).
 * Y/y → true, N/n → false, Enter → defaultAnswer, Escape → false.
 *
 * terminal-ui rules applied:
 * - input-useinput-hook: useInput with isActive for focus management
 * - input-isactive-focus: only register input when focus=true
 * - input-escape-routes: Escape exits as "no"
 */
export function ConfirmInput({
  message,
  defaultAnswer = 'yes',
  onConfirm,
  focus = true,
}: ConfirmInputProps): JSX.Element {
  const { colors } = useTheme()

  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (input, key) => {
      const result = resolveConfirmKey(input, key, defaultAnswer)
      if (result !== null) {
        onConfirm?.(result)
      }
    },
    { isActive: focus },
  )
  // c8 ignore stop

  const hint = defaultAnswer === 'yes' ? '[Y/n]' : '[y/N]'

  return (
    <Box flexDirection="row" gap={1}>
      <Text color={focus ? colors.primary : colors.muted}>{message}</Text>
      <Text color={colors.muted}>{hint}</Text>
      <Text color={focus ? colors.primary : colors.muted}>█</Text>
    </Box>
  )
}
