import { Text } from 'ink'
import React, { useState } from 'react'

export interface CounterProps {
  /** Current value (controlled mode) */
  value?: number
  /** Callback fired when value changes */
  onChange?: (value: number) => void
  /** Initial value for uncontrolled mode */
  defaultValue?: number
  /** Label shown after the counter value */
  label?: string
  /** Text color (default green) */
  color?: string
  /** Focus state */
  focus?: boolean
}

/**
 * Display component for numeric values.
 * User provides the increment logic (e.g., useEffect with setInterval, keyboard input, etc.)
 */
export function Counter({
  value: controlledValue,
  onChange,
  defaultValue = 0,
  label = 'count',
  color = 'green',
  focus = false,
}: CounterProps): JSX.Element {
  const [internalValue, setInternalValue] = useState(defaultValue)

  const isControlled = controlledValue !== undefined
  const displayValue = isControlled ? controlledValue : internalValue

  const handleChange = (newValue: number) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <Text color={focus ? color : undefined} bold={focus}>
      {displayValue} {label}
    </Text>
  )
}
