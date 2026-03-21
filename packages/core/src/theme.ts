// Border styles map to Ink's native borderStyle prop values
export type BorderStyle = 'round' | 'single' | 'double' | 'bold' | 'classic'

// Spinner animation types
export type SpinnerType = 'dots' | 'line' | 'arc' | 'bounce'

// ── Color tokens ──────────────────────────────────────────────────────────────
// ux-color-semantics: red=error, yellow=warning, green=success, cyan=info
export interface TuiColors {
  // Brand
  primary: string
  secondary: string
  // Semantic
  success: string
  warning: string
  error: string
  info: string
  // Neutral
  muted: string
  border: string
}

// ── Spacing tokens (column/row counts for paddingX/paddingY) ─────────────────
export interface TuiSpacing {
  xs: number // 0
  sm: number // 1
  md: number // 2
  lg: number // 3
  xl: number // 4
}

// ── Inline style for Ink components — what tv() resolves to ──────────────────
export interface TerminalStyle {
  color?: string
  bold?: boolean
  dim?: boolean
  underline?: boolean
  borderColor?: string
  backgroundColor?: string
  paddingX?: number
  paddingY?: number
}

// ── Full theme type ───────────────────────────────────────────────────────────
export interface TuiTheme {
  colors: TuiColors
  spacing: TuiSpacing
  borders: {
    style: BorderStyle
    color: string
  }
  spinner: SpinnerType
}

// ── Default theme ─────────────────────────────────────────────────────────────
export const defaultTheme: TuiTheme = {
  colors: {
    primary: 'cyan',
    secondary: 'magenta',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
    muted: 'gray',
    border: 'gray',
  },
  spacing: {
    xs: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  },
  borders: {
    style: 'round',
    color: 'gray',
  },
  spinner: 'dots',
}
