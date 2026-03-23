import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'

export interface ViewportProps {
  /** Lines of text to display */
  lines: string[]
  /** Number of visible lines */
  height: number
  /** Width in columns (optional) */
  width?: number
  /** Minimum width in columns */
  minWidth?: number
  /** Show right-side scrollbar when content overflows */
  showScrollIndicator?: boolean
  /** Whether the viewport accepts keyboard input */
  focus?: boolean
}

/** Renders a proportional scrollbar track for the given scroll state. */
function Scrollbar({
  total,
  height,
  offset,
}: {
  total: number
  height: number
  offset: number
}): JSX.Element {
  const { colors } = useTheme()

  const thumbSize = Math.max(1, Math.round((height / total) * height))
  const maxThumbOffset = height - thumbSize
  const maxOffset = total - height
  const thumbOffset = maxOffset > 0 ? Math.round((offset / maxOffset) * maxThumbOffset) : 0

  return (
    <Box flexDirection="column" marginLeft={1}>
      {Array.from({ length: height }, (_, i) => {
        const isThumb = i >= thumbOffset && i < thumbOffset + thumbSize
        return (
          <Text key={i} color={isThumb ? colors.primary : colors.muted}>
            {isThumb ? '█' : '░'}
          </Text>
        )
      })}
    </Box>
  )
}

/**
 * Scrollable content area with a proportional right-side scrollbar.
 * Arrow keys scroll one line; PageUp/PageDown scroll by viewport height.
 */
export function Viewport({
  lines,
  height,
  width,
  minWidth = 20,
  showScrollIndicator = true,
  focus = true,
}: ViewportProps): JSX.Element {
  const [offset, setOffset] = useState(0)
  const maxOffset = Math.max(0, lines.length - height)
  const isScrollable = lines.length > height

  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (_input, key) => {
      if (key.upArrow)
        setOffset(o => Math.max(0, o - 1))
      if (key.downArrow)
        setOffset(o => Math.min(maxOffset, o + 1))
      if (key.pageUp)
        setOffset(o => Math.max(0, o - height))
      if (key.pageDown)
        setOffset(o => Math.min(maxOffset, o + height))
    },
    { isActive: focus },
  )
  // c8 ignore stop

  const visible = lines.slice(offset, offset + height)

  return (
    <Box flexDirection="row" width={width} minWidth={minWidth}>
      <Box flexDirection="column" flexGrow={1}>
        {visible.map((line, i) => (
          <Text key={i}>{line}</Text>
        ))}
      </Box>
      {showScrollIndicator && isScrollable
        ? <Scrollbar total={lines.length} height={height} offset={offset} />
        : null}
    </Box>
  )
}
