import { Text } from 'ink'
import React, { useEffect, useState } from 'react'

export interface CounterProps {
  /** Interval in ms between increments (default 100) */
  intervalMs?: number
  /** Label shown after the counter value */
  label?: string
  /** Text color (default green) */
  color?: string
}

/**
 * Animated counter that auto-increments at a specified interval.
 */
export function Counter({
  intervalMs = 100,
  label = 'tests passed',
  color = 'green',
}: CounterProps): JSX.Element {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(previousCounter => previousCounter + 1)
    }, intervalMs)

    return () => {
      clearInterval(timer)
    }
  }, [intervalMs])

  return <Text color={color}>{counter} {label}</Text>
}
