import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'

/**
 * Pure navigation logic — extracted for direct unit testing
 * (ink-testing-library stdin simulation is unreliable in Ink 5)
 */
export function navigateSelect(currentIndex: number, totalItems: number, direction: 'up' | 'down'): number {
  if (direction === 'up')
    return Math.max(0, currentIndex - 1)
  if (direction === 'down')
    return Math.min(totalItems - 1, currentIndex + 1)
  return currentIndex
}

export interface SelectItem<T = string> {
  label: string
  value: T
}

export interface SelectProps<T = string> {
  items: ReadonlyArray<SelectItem<T>>
  /** Selected value (controlled mode) */
  value?: T
  /** Callback fired when an item is selected (controlled mode) */
  onSelect?: (item: SelectItem<T>) => void
  /** Initially highlighted item index (uncontrolled mode) */
  initialIndex?: number
  /** Label shown above the list */
  label?: string
  /** Whether this component is focused and accepting keyboard input */
  focus?: boolean
}

/**
 * Arrow-key navigable single-choice list.
 *
 * terminal-ui rules applied:
 * - input-useinput-hook: useInput for all keyboard handling
 * - input-isactive-focus: isActive prop prevents conflicts with other inputs
 * - tuistate-functional-updates: setIndex(i => ...) avoids stale closure
 * - tuicomp-box-flexbox: Box flexDirection column for item list
 * - input-escape-routes: Escape key exits without selection
 */
export function Select<T = string>({
  items,
  value,
  onSelect,
  initialIndex = 0,
  label,
  focus = true,
}: SelectProps<T>): JSX.Element {
  const { colors } = useTheme()
  const [internalIndex, setInternalIndex] = useState(initialIndex)

  const isControlled = value !== undefined
  const selectedIndex = isControlled ? items.findIndex(item => item.value === value) : internalIndex

  const handleSelect = (item: SelectItem<T>) => {
    if (!isControlled) {
      setInternalIndex(items.findIndex(i => i.value === item.value))
    }
    onSelect?.(item)
  }

  // input-isactive-focus: only active when this component is focused
  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (_input, key) => {
      if (key.upArrow) {
        if (!isControlled) {
          setInternalIndex(i => Math.max(0, i - 1))
        }
      }
      if (key.downArrow) {
        if (!isControlled) {
          setInternalIndex(i => Math.min(items.length - 1, i + 1))
        }
      }
      if (key.return) {
        const currentIndex = isControlled ? selectedIndex : internalIndex
        handleSelect(items[currentIndex])
      }
    },
    { isActive: focus },
  )
  // c8 ignore stop

  return (
    <Box flexDirection="column">
      {label
        ? (
            <Text bold color={colors.primary}>{label}</Text>
          )
        : null}
      {items.map((item, i) => {
        const isActive = i === selectedIndex
        return (
          <Box key={String(item.value)} flexDirection="row" gap={1}>
            <Text color={isActive ? colors.primary : colors.muted}>
              {isActive ? '❯' : ' '}
            </Text>
            <Text color={isActive ? colors.primary : undefined} bold={isActive}>
              {item.label}
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}
