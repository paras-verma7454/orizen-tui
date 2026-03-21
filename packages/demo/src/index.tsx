import React, { useEffect, useState } from 'react'
import { Box, Text, render, useApp, useInput, useStdin } from 'ink'
import { FocusManager, ThemeProvider, useFocus } from '@orizen-tui/core'
import {
  Badge,
  Progress,
  Select,
  Spinner,
  TextInput,
} from '@orizen-tui/registry'

// ── Static data (module-level — not recreated on re-render) ───────────────────

// Each value is a valid Ink/terminal color name
const THEME_OPTIONS = [
  { label: 'Cyan     (default)', value: 'cyan' },
  { label: 'Magenta', value: 'magenta' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Green', value: 'green' },
] as const

const SPINNER_VARIANTS = [
  { preset: 'dots' as const, label: 'Loading...' },
  { preset: 'circle' as const, label: 'Processing' },
  { preset: 'bar' as const, label: 'Building' },
]

const BADGE_VARIANTS = ['default', 'success', 'warning', 'error', 'info'] as const

// ── Animated progress ─────────────────────────────────────────────────────────

function AnimatedProgress() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(v => (v >= 100 ? 0 : v + 2))
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box flexDirection="column">
      <Progress value={value} label="Animated:" width={30} />
      <Progress value={65} label="  Static:" width={30} />
      <Progress value={100} label="Complete:" width={30} />
    </Box>
  )
}

// ── Theme-picking Select ───────────────────────────────────────────────────────

function FocusedSelect({ onThemeChange }: { onThemeChange: (color: string) => void }) {
  const { isFocused } = useFocus('select')

  return (
    <Select
      label={isFocused ? '❯ Primary color:' : '  Primary color:'}
      items={THEME_OPTIONS}
      focus={isFocused}
      onSelect={item => onThemeChange(item.value)}
    />
  )
}

// ── Text input ────────────────────────────────────────────────────────────────

function FocusedInput() {
  const { isFocused } = useFocus('input')
  const [value, setValue] = useState('')

  return (
    <TextInput
      label={isFocused ? '❯ Component name:' : '  Component name:'}
      value={value}
      onChange={setValue}
      placeholder="e.g. button…"
      focus={isFocused}
    />
  )
}

// ── Quit handler (only mounted when stdin supports raw mode) ──────────────────

function QuitHandler() {
  const { exit } = useApp()
  useInput((input) => { if (input === 'q') exit() })
  return null
}

// ── App (receives onThemeChange from Demo wrapper) ────────────────────────────

function App({ onThemeChange }: { onThemeChange: (c: string) => void }) {
  const cols = Math.min(process.stdout.columns || 60, 60)
  const { isRawModeSupported } = useStdin()
  const div = <Text dimColor>{'─'.repeat(cols)}</Text>

  return (
    <Box flexDirection="column" paddingX={1}>
      {isRawModeSupported ? <QuitHandler /> : null}

      {/* Header */}
      <Box gap={2}>
        <Text bold color="cyan">orizen-tui</Text>
        <Text dimColor>component showcase</Text>
        <Text dimColor>·  q to quit</Text>
      </Box>

      {div}

      {/* Spinners */}
      <Text dimColor>── Spinner</Text>
      <Box gap={4} paddingLeft={2}>
        {SPINNER_VARIANTS.map(s => (
          <Spinner key={s.label} preset={s.preset} label={s.label} />
        ))}
      </Box>

      {div}

      {/* Badges */}
      <Text dimColor>── Badge</Text>
      <Box gap={2} paddingLeft={2}>
        {BADGE_VARIANTS.map(v => <Badge key={v} variant={v}>{v}</Badge>)}
      </Box>

      {div}

      {/* Progress */}
      <Text dimColor>── Progress</Text>
      <Box paddingLeft={2}>
        <AnimatedProgress />
      </Box>

      {div}

      {/* Interactive */}
      <Text dimColor>── Interactive  (Tab · switch focus)</Text>
      <Box paddingLeft={2}>
        <FocusManager defaultId="select">
          <Box gap={6}>
            <FocusedSelect onThemeChange={onThemeChange} />
            <FocusedInput />
          </Box>
        </FocusManager>
      </Box>

      {div}

      <Text dimColor>Tab · switch    ↑↓ · navigate    Enter · apply theme    q · quit</Text>
    </Box>
  )
}

// ── Demo root — holds live theme state ────────────────────────────────────────

function Demo() {
  const [primary, setPrimary] = useState('cyan')

  return (
    <ThemeProvider theme={{ colors: { primary } }}>
      <App onThemeChange={setPrimary} />
    </ThemeProvider>
  )
}

render(<Demo />)
