import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'
import { getEffectiveBorderStyle } from '../../primitives/borders.js'

/**
 * Pure key processing logic — extracted for direct unit testing
 */
export function processNumberKey(
  value: number,
  input: string,
  key: { upArrow?: boolean, downArrow?: boolean, ctrl?: boolean, meta?: boolean },
  min: number,
  max: number,
  step: number,
): number {
  if (key.upArrow)
    return Math.min(max, value + step)
  if (key.downArrow)
    return Math.max(min, value - step)
  return value
}

export interface NumberInputProps {
  /** Controlled value (use this for controlled mode) */
  value?: number
  /** Callback fired when value changes */
  onChange?: (value: number) => void
  /** Initial value for uncontrolled mode */
  defaultValue?: number
  /** Label shown above the input */
  label?: string
  /** Minimum allowed value */
  min?: number
  /** Maximum allowed value */
  max?: number
  /** Arrow key increment/decrement step */
  step?: number
  /** Whether this input is focused and accepting keyboard input */
  focus?: boolean
}

/**
 * Numeric input with ↑/↓ arrow key increment and configurable step.
 *
 * terminal-ui rules applied:
 * - input-useinput-hook: useInput with isActive for focus management
 * - input-isactive-focus: only register input when focus=true
 * - input-immediate-feedback: value updates on every keypress
 * - tuicomp-border-styles: Box borderStyle for visual structure
 */
export function NumberInput({
  value: controlledValue,
  onChange,
  defaultValue = 0,
  label,
  min = -Infinity,
  max = Infinity,
  step = 1,
  focus = true,
}: NumberInputProps): JSX.Element {
  const { colors, borders } = useTheme()
  const [internalValue, setInternalValue] = useState(defaultValue)

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (newValue: number) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (input, key) => {
      const next = processNumberKey(value, input, key, min, max, step)
      if (next !== value) {
        handleChange(next)
      }
    },
    { isActive: focus },
  )
  // c8 ignore stop

  return (
    <Box flexDirection="column">
      {label ? <Text color={colors.muted}>{label}</Text> : null}
      <Box
        borderStyle={getEffectiveBorderStyle(borders.style)}
        borderColor={focus ? colors.primary : colors.border}
        paddingX={1}
        flexDirection="row"
        gap={1}
      >
        <Text color={focus ? colors.primary : undefined} bold={focus}>
          {String(value)}
        </Text>
        <Text color={colors.muted}>↑↓</Text>
      </Box>
    </Box>
  )
}
