import type { TuiTheme } from './theme.js'
import React, { createContext, useContext, useMemo } from 'react'
import { defaultTheme } from './theme.js'

export const ThemeContext = createContext<TuiTheme>(defaultTheme)

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface ThemeProviderProps {
  theme?: DeepPartial<TuiTheme>
  children: React.ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const merged: TuiTheme = useMemo(() => ({
    ...defaultTheme,
    ...theme,
    colors: { ...defaultTheme.colors, ...theme?.colors },
    spacing: { ...defaultTheme.spacing, ...theme?.spacing },
    borders: { ...defaultTheme.borders, ...theme?.borders },
  }), [theme])

  return <ThemeContext.Provider value={merged}>{children}</ThemeContext.Provider>
}

export function useTheme(): TuiTheme {
  return useContext(ThemeContext)
}
