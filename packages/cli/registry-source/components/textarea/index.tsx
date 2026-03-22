import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'
import { getEffectiveBorderStyle } from '../../primitives/borders.js'

/**
 * Pure input processing logic — extracted for direct unit testing
 */
export function processTextarea(
  value: string,
  input: string,
  key: { backspace?: boolean, delete?: boolean, escape?: boolean, return?: boolean, ctrl?: boolean, meta?: boolean },
): string {
  if (key.backspace || key.delete)
    return value.slice(0, -1)
  if (key.escape)
    return ''
  if (key.return)
    return `${value}\n`
  if (!key.ctrl && !key.meta && input.length === 1)
    return value + input
  return value
}

export interface TextareaProps {
  value: string
  onChange: (value: string) => void
  /** Placeholder shown when value is empty */
  placeholder?: string
  /** Label shown above the textarea */
  label?: string
  /** Visible row count (does not limit input) */
  rows?: number
  /** Whether this input is focused and accepting keyboard input */
  focus?: boolean
}

/**
 * Multi-line text input with keyboard handling.
 *
 * terminal-ui rules applied:
 * - input-useinput-hook: useInput with isActive for focus management
 * - input-isactive-focus: only register input when focus=true
 * - input-immediate-feedback: value updates on every keypress
 * - input-escape-routes: Escape clears the input
 * - tuicomp-border-styles: Box borderStyle for visual structure
 */
export function Textarea({
  value,
  onChange,
  placeholder = '',
  label,
  rows = 3,
  focus = true,
}: TextareaProps): JSX.Element {
  const { colors, borders } = useTheme()
  const [cursorVisible] = useState(true)

  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (input, key) => {
      onChange(processTextarea(value, input, key))
    },
    { isActive: focus },
  )
  // c8 ignore stop

  const lines = value.split('\n')
  const cursor = focus && cursorVisible ? '█' : ''
  const isEmpty = value.length === 0

  // Pad lines to fill visible rows
  const displayLines: string[] = []
  for (let i = 0; i < rows; i++) {
    displayLines.push(lines[i] ?? '')
  }

  return (
    <Box flexDirection="column">
      {label ? <Text color={colors.muted}>{label}</Text> : null}
      <Box
        borderStyle={getEffectiveBorderStyle(borders.style)}
        borderColor={focus ? colors.primary : colors.border}
        paddingX={1}
        flexDirection="column"
      >
        {isEmpty
          ? (
              <Text color={colors.muted}>
                {placeholder}
                {focus ? cursor : ''}
              </Text>
            )
          : displayLines.map((line, i) => {
              const isLastLine = i === lines.length - 1
              return (
                <Text key={i}>
                  {line}
                  {isLastLine && focus ? <Text color={colors.primary}>{cursor}</Text> : null}
                </Text>
              )
            })}
      </Box>
    </Box>
  )
}
