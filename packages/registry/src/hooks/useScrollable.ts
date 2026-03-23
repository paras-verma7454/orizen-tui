import { useCallback, useState } from 'react'

export interface UseScrollableOptions {
  itemCount: number
  viewportHeight: number
}

export interface UseScrollableResult {
  scrollOffset: number
  selectedIndex: number
  selectNext: () => void
  selectPrev: () => void
  scrollTo: (index: number) => void
}

/**
 * Manages scroll offset and selection index for scrollable list-like components.
 * Keeps the selected item within the visible viewport window.
 */
export function useScrollable({ itemCount, viewportHeight }: UseScrollableOptions): UseScrollableResult {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)

  const scrollTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(itemCount - 1, index))
    setSelectedIndex(clamped)
    setScrollOffset((offset) => {
      if (clamped < offset)
        return clamped
      if (clamped >= offset + viewportHeight)
        return clamped - viewportHeight + 1
      return offset
    })
  }, [itemCount, viewportHeight])

  const selectNext = useCallback(() => {
    setSelectedIndex((i) => {
      const next = Math.min(itemCount - 1, i + 1)
      setScrollOffset((offset) => {
        if (next >= offset + viewportHeight)
          return next - viewportHeight + 1
        return offset
      })
      return next
    })
  }, [itemCount, viewportHeight])

  const selectPrev = useCallback(() => {
    setSelectedIndex((i) => {
      const prev = Math.max(0, i - 1)
      setScrollOffset((offset) => {
        if (prev < offset)
          return prev
        return offset
      })
      return prev
    })
  }, [])

  return { scrollOffset, selectedIndex, selectNext, selectPrev, scrollTo }
}
