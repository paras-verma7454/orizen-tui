import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'

export interface CheckboxItem<T = string> {
  label: string
  value: T
}

/**
 * Pure toggle logic — extracted for direct unit testing
 */
export function toggleCheckboxItem(selected: string[], value: string): string[] {
  return selected.includes(value)
    ? selected.filter(v => v !== value)
    : [...selected, value]
}

/**
 * Pure navigation logic — extracted for direct unit testing
 */
export function navigateCheckbox(index: number, total: number, direction: 'up' | 'down'): number {
  if (direction === 'up')
    return Math.max(0, index - 1)
  if (direction === 'down')
    return Math.min(total - 1, index + 1)
  return index
}

export interface CheckboxProps<T = string> {
  items: ReadonlyArray<CheckboxItem<T>>
  value: T[]
  onChange: (values: T[]) => void
  /** Label shown above the list */
  label?: string
  /** Whether this component is focused and accepting keyboard input */
  focus?: boolean
}

/**
 * Arrow-key navigable list with independent per-item toggle.
 *
 * terminal-ui rules applied:
 * - input-useinput-hook: useInput with isActive for focus management
 * - input-isactive-focus: only register input when focus=true
 * - tuistate-functional-updates: functional updates avoid stale closures
 * - tuicomp-box-flexbox: Box flexDirection column for item list
 * - input-escape-routes: Escape key exits without change (deselects all)
 */
export function Checkbox<T = string>({
  items,
  value,
  onChange,
  label,
  focus = true,
}: CheckboxProps<T>): JSX.Element {
  const { colors } = useTheme()
  const [cursorIndex, setCursorIndex] = useState(0)

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
        const strValues = value.map(v => String(v))
        const next = toggleCheckboxItem(strValues, strValue)
        onChange(next as T[])
      }
      if (key.escape) {
        onChange([])
      }
    },
    { isActive: focus },
  )
  // c8 ignore stop

  const selectedSet = new Set(value.map(v => String(v)))

  return (
    <Box flexDirection="column">
      {label ? <Text bold color={colors.primary}>{label}</Text> : null}
      {items.map((item, i) => {
        const isChecked = selectedSet.has(String(item.value))
        const isCursor = i === cursorIndex && focus
        const checkbox = isChecked ? '[x]' : '[ ]'
        return (
          <Box key={String(item.value)} flexDirection="row" gap={1}>
            <Text color={isCursor ? colors.primary : colors.muted}>
              {isCursor ? '❯' : ' '}
            </Text>
            <Text color={isChecked ? colors.primary : colors.muted}>{checkbox}</Text>
            <Text color={isCursor ? colors.primary : undefined} bold={isCursor}>
              {item.label}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}
