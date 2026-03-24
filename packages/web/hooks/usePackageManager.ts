'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'orizen-package-manager'
const DEFAULT_MANAGER = 'npm' as const

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

const VALID_MANAGERS: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun']

export function usePackageManager(): {
  manager: PackageManager
  setManager: (m: PackageManager) => void
  isLoaded: boolean
} {
  const [manager, setManagerState] = useState<PackageManager>(DEFAULT_MANAGER)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined')
      return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && isValidManager(stored)) {
      setManagerState(stored)
    }
    setIsLoaded(true)
  }, [])

  const setManager = (m: PackageManager): void => {
    setManagerState(m)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, m)
    }
  }

  return { manager, setManager, isLoaded }
}

function isValidManager(m: string): m is PackageManager {
  return VALID_MANAGERS.includes(m as PackageManager)
}
