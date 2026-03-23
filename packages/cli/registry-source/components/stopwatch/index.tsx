import { Text } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useEffect, useState } from 'react'

/**
 * Format elapsed milliseconds as MM:SS or H:MM:SS — extracted for unit testing.
 */
export function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0)
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export interface StopwatchProps {
  /** Whether the stopwatch is counting up */
  running?: boolean
  /** Label shown before the elapsed time */
  label?: string
}

/**
 * Count-up elapsed time tracker. Dims when paused.
 */
export function Stopwatch({ running = true, label }: StopwatchProps): JSX.Element {
  const { colors } = useTheme()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!running)
      return
    const timer = setInterval(() => {
      setElapsed(e => e + 1000)
    }, 1000)
    return () => clearInterval(timer)
  }, [running])

  return (
    <Text color={running ? colors.primary : colors.muted}>
      {label ? `${label} ` : ''}
      {formatElapsed(elapsed)}
    </Text>
  )
}
