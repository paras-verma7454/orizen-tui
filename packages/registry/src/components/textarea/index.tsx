import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'
import { getEffectiveBorderStyle } from '../../primitives/borders.js'

export type TextareaKeyHandler = {
  backspace?: boolean
  delete?: boolean
  escape?: boolean
  return?: boolean
  shift?: boolean
  ctrl?: boolean
  meta?: boolean
}

export function processTextarea(
  value: string,
  input: string,
  key: TextareaKeyHandler,
): { value: string; submit: boolean } {
  if (key.backspace || key.delete)
    return { value: value.slice(0, -1), submit: false }
  if (key.escape)
    return { value: '', submit: false }
  if (key.return) {
    if (key.shift)
      return { value: `${value}\n`, submit: false }
    return { value, submit: true }
  }
  if (!key.ctrl && !key.meta && input.length === 1)
    return { value: value + input, submit: false }
  return { value, submit: false }
}

export interface TextareaProps {
  value: string
  onChange: (value: string) => void
  /** Callback fired when Enter is pressed (Shift+Enter adds newline instead) */
  onSubmit: () => void
  /** Placeholder shown when value is empty */
  placeholder?: string
  /** Label shown above the textarea */
  label?: string
  /** Visible row count (does not limit input) */
  rows?: number
  /** Whether this input is focused and accepting keyboard input */
  focus?: boolean
  /** Width of the textarea in columns */
  width?: number
  /** Text color */
  color?: string
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
  onSubmit,
  placeholder = '',
  label,
  rows = 3,
  focus = true,
  width,
  color,
}: TextareaProps): JSX.Element {
  const { colors, borders } = useTheme()
  const [cursorVisible] = useState(true)

  const termWidth = process.stdout.columns || 80
  const effectiveWidth = width ?? termWidth

  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (input, key) => {
      const result = processTextarea(value, input, key)
      if (result.submit) {
        onSubmit()
      } else {
        onChange(result.value)
      }
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
        width={effectiveWidth}
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
                <Text key={i} color={color}>
                  {line}
                  {isLastLine && focus ? <Text color={colors.primary}>{cursor}</Text> : null}
                </Text>
              )
            })}
      </Box>
    </Box>
  )
}
