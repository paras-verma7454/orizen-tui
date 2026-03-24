import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'
import { getEffectiveBorderStyle } from '../../primitives/borders.js'

export type TextInputKeyHandler = {
  backspace?: boolean
  delete?: boolean
  escape?: boolean
  return?: boolean
  ctrl?: boolean
  meta?: boolean
}

/**
 * Pure input processing logic — extracted for direct unit testing
 * (ink-testing-library stdin simulation is unreliable in Ink 5)
 */
export function processTextInput(
  value: string,
  input: string,
  key: TextInputKeyHandler,
): { value: string; submit: boolean } {
  if (key.backspace || key.delete)
    return { value: value.slice(0, -1), submit: false }
  if (key.escape)
    return { value: '', submit: false }
  if (key.return)
    return { value, submit: true }
  if (!key.ctrl && !key.meta && input.length === 1)
    return { value: value + input, submit: false }
  return { value, submit: false }
}

export interface TextInputProps {
  /** Controlled value (use this for controlled mode) */
  value?: string
  /** Callback fired when value changes */
  onChange?: (value: string) => void
  /** Initial value for uncontrolled mode */
  defaultValue?: string
  /** Callback fired when Enter is pressed */
  onSubmit?: () => void
  /** Placeholder shown when value is empty */
  placeholder?: string
  /** Character to render instead of actual value (e.g. '*' for passwords) */
  mask?: string
  /** Label shown above the input */
  label?: string
  /** Whether this input is focused and accepting keyboard input */
  focus?: boolean
  /** Width of the input box in columns */
  width?: number
  /** Text color */
  color?: string
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
  value: controlledValue,
  onChange,
  defaultValue = '',
  onSubmit,
  placeholder = '',
  mask,
  label,
  focus = true,
  width,
  color,
}: TextInputProps): JSX.Element {
  const { colors, borders } = useTheme()
  const [cursorVisible, _setCursorVisible] = useState(true)
  const [internalValue, setInternalValue] = useState(defaultValue)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  const handleSubmit = () => {
    onSubmit?.()
  }

  const termWidth = process.stdout.columns || 80
  const effectiveWidth = width ?? termWidth

  // input-isactive-focus: only receive input events when focused
  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (input, key) => {
      const result = processTextInput(value, input, key)
      if (result.submit) {
        handleSubmit()
      } else {
        handleChange(result.value)
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
        width={effectiveWidth}
      >
        {showPlaceholder
          ? (
              <Text color={colors.muted}>
                {placeholder}
                {focus ? cursor : ''}
              </Text>
            )
          : (
              <Text color={color}>
                {displayValue}
                {focus ? <Text color={colors.primary}>{cursor}</Text> : null}
              </Text>
            )}
      </Box>
    </Box>
  )
}
