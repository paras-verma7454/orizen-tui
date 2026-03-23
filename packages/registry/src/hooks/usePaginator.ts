import { useCallback, useState } from 'react'

export interface UsePaginatorOptions {
  total: number
  initialPage?: number
}

export interface UsePaginatorResult {
  page: number
  totalPages: number
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  isFirst: boolean
  isLast: boolean
}

/**
 * Pagination state management hook. Pages are 1-based.
 */
export function usePaginator({ total, initialPage = 1 }: UsePaginatorOptions): UsePaginatorResult {
  const [page, setPage] = useState(Math.max(1, Math.min(total, initialPage)))

  const nextPage = useCallback(() => setPage(p => Math.min(total, p + 1)), [total])
  const prevPage = useCallback(() => setPage(p => Math.max(1, p - 1)), [])
  const goToPage = useCallback((p: number) => setPage(Math.max(1, Math.min(total, p))), [total])

  return {
    page,
    totalPages: total,
    nextPage,
    prevPage,
    goToPage,
    isFirst: page === 1,
    isLast: page === total,
  }
}
