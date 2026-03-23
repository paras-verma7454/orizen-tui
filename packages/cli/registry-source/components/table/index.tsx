import { Box, Text, useInput } from 'ink'
import { useTheme } from 'orizen-tui-core'
import React, { useState } from 'react'
import { getEffectiveBorderStyle } from '../../primitives/borders.js'

export type ColumnAlignment = 'left' | 'right' | 'center'

export interface TableColumn {
  /** Data key to read from each row object */
  key: string
  /** Column header label */
  label: string
  /** Fixed column width in characters */
  width?: number
  /** Text alignment within the column */
  align?: ColumnAlignment
}

export interface TableProps {
  columns: TableColumn[]
  data: Record<string, string>[]
  /** Number of visible data rows (excludes header) */
  height?: number
  /** Whether focused for keyboard navigation */
  focus?: boolean
}

/**
 * Pure row navigation logic — extracted for unit testing.
 */
export function navigateTable(currentRow: number, totalRows: number, direction: 'up' | 'down'): number {
  if (direction === 'up')
    return Math.max(0, currentRow - 1)
  return Math.min(totalRows - 1, currentRow + 1)
}

function pad(text: string, width: number, align: ColumnAlignment): string {
  const truncated = text.length > width ? `${text.slice(0, width - 1)}…` : text
  const padTotal = Math.max(0, width - truncated.length)
  if (align === 'right')
    return `${' '.repeat(padTotal)}${truncated}`
  if (align === 'center') {
    const left = Math.floor(padTotal / 2)
    return `${' '.repeat(left)}${truncated}${' '.repeat(padTotal - left)}`
  }
  return `${truncated}${' '.repeat(padTotal)}`
}

/**
 * Navigable data table with column alignment, scroll, and a border box.
 */
export function Table({ columns, data, height = 10, focus = true }: TableProps): JSX.Element {
  const { colors, borders } = useTheme()
  const [selectedRow, setSelectedRow] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)

  const colWidths = columns.map(col =>
    col.width ?? Math.max(
      col.label.length,
      ...data.map(row => String(row[col.key] ?? '').length),
    ),
  )

  // c8 ignore start — useInput callbacks can't be exercised via ink-testing-library in Ink 5
  useInput(
    (_input, key) => {
      if (key.upArrow) {
        setSelectedRow((r) => {
          const prev = Math.max(0, r - 1)
          setScrollOffset(o => prev < o ? prev : o)
          return prev
        })
      }
      if (key.downArrow) {
        setSelectedRow((r) => {
          const next = Math.min(data.length - 1, r + 1)
          setScrollOffset(o => next >= o + height ? next - height + 1 : o)
          return next
        })
      }
    },
    { isActive: focus },
  )
  // c8 ignore stop

  const visible = data.slice(scrollOffset, scrollOffset + height)
  const header = columns.map((col, i) => pad(col.label, colWidths[i], col.align ?? 'left')).join('  ')
  const separator = colWidths.map(w => '─'.repeat(w)).join('  ')

  const borderStyle = getEffectiveBorderStyle(borders.style)

  return (
    <Box
      flexDirection="column"
      borderStyle={borderStyle}
      borderColor={borders.color}
    >
      <Text bold color={colors.primary}>{header}</Text>
      <Text color={colors.muted}>{separator}</Text>
      {visible.map((row, i) => {
        const idx = scrollOffset + i
        const isActive = idx === selectedRow
        const rowText = columns.map((col, j) =>
          pad(String(row[col.key] ?? ''), colWidths[j], col.align ?? 'left'),
        ).join('  ')
        return (
          <Text key={idx} color={isActive ? colors.primary : undefined} bold={isActive} inverse={isActive}>
            {rowText}
          </Text>
        )
      })}
    </Box>
  )
}
