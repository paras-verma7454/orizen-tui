import React, { useEffect, useMemo, useState } from 'react'
import { Text } from 'ink'
import { useTheme } from '@orizen-tui/core'
import {
  DEFAULT_SPINNER_INTERVAL_MS,
  spinnerFrames,
  spinnerPresetFrames,
  type SpinnerPreset,
} from '../../primitives/symbols.js'

export interface SpinnerProps {
  /** Label shown after the spinner frame */
  label?: string
  /** Named spinner style for common presets */
  preset?: SpinnerPreset
  /** Override the frame set; takes precedence over preset/theme */
  frames?: string[]
  /** Frame advance interval in ms (defaults to 80) */
  intervalMs?: number
}

/**
 * Animated terminal spinner.
 */
export function Spinner({ label, preset, frames, intervalMs }: SpinnerProps) {
  const { colors, spinner } = useTheme()
  const activeFrames = useMemo(() => {
    if (frames && frames.length > 0) return frames
    if (preset) return spinnerPresetFrames[preset]
    return spinnerFrames[spinner]
  }, [frames, preset, spinner])
  const interval = useMemo(() => intervalMs ?? DEFAULT_SPINNER_INTERVAL_MS, [intervalMs])

  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => (f + 1) % activeFrames.length)
    }, interval)

    return () => clearInterval(timer)
  }, [activeFrames.length, interval])

  return (
    <Text color={colors.primary}>
      {activeFrames[frame]}
      {label ? ` ${label}` : ''}
    </Text>
  )
}