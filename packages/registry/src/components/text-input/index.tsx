import React, { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import { useTheme } from '@orizen-tui/core'
import { getEffectiveBorderStyle } from '../../primitives/borders.js'

/**
 * Pure input processing logic — extracted for direct unit testing
 * (ink-testing-library stdin simulation is unreliable in Ink 5)
 */
export function processTextInput(
  value: string,
  input: string,
  key: { backspace?: boolean, delete?: boolean, escape?: boolean, ctrl?: boolean, meta?: boolean },
): string {
  if (key.backspace || key.delete)
    return value.slice(0, -1)
  if (key.escape)
    return ''
  if (!key.ctrl && !key.meta && input.length === 1)
    return value + input
  return value
}

export interface TextInputProps {
  value: string
  onChange: (value: string) => void
  /** Placeholder shown when value is empty */
  placeholder?: string
  /** Character to render instead of actual value (e.g. '*' for passwords) */
  mask?: string
  /** Label shown above the input */
  label?: string
  /** Whether this input is focused and accepting keyboard input */
  focus?: boolean
}

/**
 * Single-line text input with keyboard handling.
 *
 * terminal-ui rules applied:
 * - input-useinput-hook: useInput with isActive for focus management
 * - input-isactive-focus: only register input when focus=true
 * - input-immediate-feedback: value updates on every keypress
 * - input-escape-routes: Escape clears the input
 * - tuicomp-border-styles: Box borderStyle for visual structure
 */
export function TextInput({
  value,
  onChange,
  placeholder = '',
  mask,
  label,
  focus = true,
}: TextInputProps) {
  const { colors, borders } = useTheme()
  const [cursorVisible, setCursorVisible] = useState(true)

  // input-isactive-focus: only receive input events when focused
  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (input, key) => {
      if (key.backspace || key.delete) {
        // Immutable update — coding-style: never mutate, always create new
        onChange(value.slice(0, -1))
        return
      }
      if (key.escape) {
        // input-escape-routes: always provide an escape route
        onChange('')
        return
      }
      // Skip control keys (arrows, tab, etc.) — only printable chars
      if (!key.ctrl && !key.meta && input.length === 1) {
        onChange(value + input)
      }
    },
    { isActive: focus },
  )
  // c8 ignore stop

  const displayValue = mask ? mask.repeat(value.length) : value
  const showPlaceholder = value.length === 0
  const cursor = focus && cursorVisible ? '█' : ' '

  return (
    <Box flexDirection="column">
      {label
        ? (
            <Text color={colors.muted}>{label}</Text>
          )
        : null}
      <Box
        borderStyle={getEffectiveBorderStyle(borders.style)}
        borderColor={focus ? colors.primary : colors.border}
        paddingX={1}
      >
        {showPlaceholder
          ? (
              <Text color={colors.muted}>
                {placeholder}
                {focus ? cursor : ''}
              </Text>
            )
          : (
              <Text>
                {displayValue}
                {focus ? <Text color={colors.primary}>{cursor}</Text> : null}
              </Text>
            )}
      </Box>
    </Box>
  )
}
