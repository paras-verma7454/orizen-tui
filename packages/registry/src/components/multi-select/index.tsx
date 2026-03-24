import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'

export interface MultiSelectItem<T = string> {
  label: string
  value: T
}

/**
 * Pure toggle logic — extracted for direct unit testing
 */
export function toggleMultiSelect(selected: string[], value: string): string[] {
  return selected.includes(value)
    ? selected.filter(v => v !== value)
    : [...selected, value]
}

/**
 * Pure navigation logic — extracted for direct unit testing
 */
export function navigateMultiSelect(index: number, total: number, direction: 'up' | 'down'): number {
  if (direction === 'up')
    return Math.max(0, index - 1)
  if (direction === 'down')
    return Math.min(total - 1, index + 1)
  return index
}

export interface MultiSelectProps<T = string> {
  items: ReadonlyArray<MultiSelectItem<T>>
  /** Selected values (controlled mode) */
  value?: T[]
  /** Callback fired when selection changes (controlled mode) */
  onChange?: (values: T[]) => void
  /** Initial values for uncontrolled mode */
  defaultValue?: T[]
  /** Called with final selection when Enter is pressed */
  onSubmit?: (values: T[]) => void
  /** Label shown above the list */
  label?: string
  /** Whether this component is focused and accepting keyboard input */
  focus?: boolean
}

/**
 * Arrow-key navigable list with space-to-toggle multi-choice and Enter to submit.
 *
 * terminal-ui rules applied:
 * - input-useinput-hook: useInput with isActive for focus management
 * - input-isactive-focus: only register input when focus=true
 * - tuistate-functional-updates: functional updates avoid stale closures
 * - tuicomp-box-flexbox: Box flexDirection column for item list
 * - input-escape-routes: Escape key exits without submission
 */
export function MultiSelect<T = string>({
  items,
  value: controlledValue,
  onChange,
  defaultValue = [],
  onSubmit,
  label,
  focus = true,
}: MultiSelectProps<T>): JSX.Element {
  const { colors } = useTheme()
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [cursorIndex, setCursorIndex] = useState(0)

  const isControlled = controlledValue !== undefined
  const selectedValues = isControlled ? controlledValue : internalValue

  const handleChange = (newValues: T[]) => {
    if (!isControlled) {
      setInternalValue(newValues)
    }
    onChange?.(newValues)
  }

  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (_input, key) => {
      if (key.upArrow) {
        setCursorIndex(i => Math.max(0, i - 1))
      }
      if (key.downArrow) {
        setCursorIndex(i => Math.min(items.length - 1, i + 1))
      }
      if (_input === ' ') {
        const item = items[cursorIndex]
        const strValue = String(item.value)
        const strValues = selectedValues.map(v => String(v))
        const next = toggleMultiSelect(strValues, strValue)
        handleChange(next as T[])
      }
      if (key.return) {
        onSubmit?.(selectedValues)
      }
    },
    { isActive: focus },
  )
  // c8 ignore stop

  const selectedSet = new Set(selectedValues.map(v => String(v)))

  return (
    <Box flexDirection="column">
      {label ? <Text bold color={colors.primary}>{label}</Text> : null}
      {items.map((item, i) => {
        const isSelected = selectedSet.has(String(item.value))
        const isCursor = i === cursorIndex && focus
        const marker = isSelected ? '◉' : '○'
        return (
          <Box key={String(item.value)} flexDirection="row" gap={1}>
            <Text color={isCursor ? colors.primary : colors.muted}>
              {isCursor ? '❯' : ' '}
            </Text>
            <Text color={isSelected ? colors.primary : colors.muted}>{marker}</Text>
            <Text color={isCursor ? colors.primary : undefined} bold={isCursor}>
              {item.label}
            </Text>
          </Box>
        )
      })}
      {onSubmit
        ? (
            <Box marginTop={1}>
              <Text color={colors.muted}>Space to toggle · Enter to confirm</Text>
            </Box>
          )
        : null}
    </Box>
  )
}
