import { Text } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useEffect, useState } from 'react'

/**
 * Format milliseconds as MM:SS or H:MM:SS — extracted for unit testing.
 */
export function formatTime(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (h > 0)
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export interface TimerProps {
  /** Duration in milliseconds */
  durationMs: number
  /** Label shown before the time */
  label?: string
  /** Callback fired when the countdown reaches zero */
  onExpire?: () => void
}

/**
 * Countdown timer. Turns warning color in the last 10 seconds.
 */
export function Timer({ durationMs, label, onExpire }: TimerProps): JSX.Element {
  const { colors } = useTheme()
  const [remaining, setRemaining] = useState(durationMs)

  useEffect(() => {
    setRemaining(durationMs)
  }, [durationMs])

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.()
      return
    }
    const timer = setInterval(() => {
      setRemaining((r) => {
        const next = r - 1000
        if (next <= 0) {
          onExpire?.()
          return 0
        }
        return next
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [remaining <= 0])

  const color = remaining <= 10000 ? colors.warning : colors.primary

  return (
    <Text color={color}>
      {label ? `${label} ` : ''}
      {formatTime(remaining)}
    </Text>
  )
}
