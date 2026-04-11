import process from 'node:process'
import {
  Checkbox,
  ConfirmInput,
  FilePicker,
  Help,
  List,
  MultiSelect,
  Paginator,
  Progress,
  Select,
  Spinner,
  Stopwatch,
  Table,
  Timer,
  Viewport,
} from '@orizen-tui/registry'
import { Box, render, Text, useApp, useInput, useStdin } from 'ink'
import { FocusManager, ThemeProvider, useFocus } from 'orizen-tui-core'
import React, { useEffect, useState } from 'react'

// ── Static data (module-level — not recreated on re-render) ───────────────────

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

const CHECKBOX_ITEMS = [
  { label: 'TypeScript', value: 'ts' },
  { label: 'React', value: 'react' },
  { label: 'Ink', value: 'ink' },
]

const MULTI_SELECT_ITEMS = [
  { label: 'Linting', value: 'lint' },
  { label: 'Formatting', value: 'fmt' },
  { label: 'Testing', value: 'test' },
  { label: 'Build', value: 'build' },
]

const LIST_ITEMS = [
  { label: 'Components', value: 'components' },
  { label: 'Hooks', value: 'hooks' },
  { label: 'Primitives', value: 'primitives' },
  { label: 'Themes', value: 'themes' },
  { label: 'Registry', value: 'registry' },
  { label: 'Demo', value: 'demo' },
]

const TABLE_COLUMNS = [
  { key: 'name', label: 'Component', width: 14 },
  { key: 'type', label: 'Type', width: 12 },
  { key: 'status', label: 'Status', width: 8 },
]

const TABLE_DATA = [
  { name: 'Badge', type: 'Display', status: 'stable' },
  { name: 'Progress', type: 'Display', status: 'stable' },
  { name: 'Spinner', type: 'Animated', status: 'stable' },
  { name: 'Select', type: 'Input', status: 'stable' },
  { name: 'Checkbox', type: 'Input', status: 'stable' },
  { name: 'MultiSelect', type: 'Input', status: 'stable' },
  { name: 'Timer', type: 'Animated', status: 'stable' },
  { name: 'Stopwatch', type: 'Animated', status: 'stable' },
  { name: 'Paginator', type: 'Display', status: 'stable' },
  { name: 'Viewport', type: 'Layout', status: 'stable' },
  { name: 'List', type: 'Input', status: 'stable' },
  { name: 'Help', type: 'Display', status: 'stable' },
  { name: 'FilePicker', type: 'Input', status: 'stable' },
  { name: 'Table', type: 'Layout', status: 'stable' },
]

const VIEWPORT_LINES = [
  'This is a scrollable viewport.',
  'Use ↑↓ or PageUp/PageDown to scroll.',
  'Line 3: orizen-tui component library',
  'Line 4: built on top of Ink + React',
  'Line 5: fully themeable via ThemeProvider',
  'Line 6: composable & accessible',
  'Line 7: keyboard-first navigation',
  'Line 8: zero external UI dependencies',
  'Line 9: small focused components',
  'Line 10: end of content',
]

const HELP_BINDINGS = [
  { key: 'Tab', description: 'switch focus' },
  { key: '↑↓', description: 'navigate' },
  { key: 'Space', description: 'toggle' },
  { key: 'Enter', description: 'select' },
  { key: 'Esc', description: 'cancel' },
  { key: 'q', description: 'quit' },
]

// ── Animated progress ─────────────────────────────────────────────────────────

function AnimatedProgress(): JSX.Element {
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

function FocusedSelect({ onThemeChange }: { onThemeChange: (color: string) => void }): JSX.Element {
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

// ── Checkbox ──────────────────────────────────────────────────────────────────

function FocusedCheckbox(): JSX.Element {
  const { isFocused } = useFocus('checkbox')
  const [selected, setSelected] = useState<string[]>([])

  return (
    <Box flexDirection="column">
      <Text dimColor>{isFocused ? '❯ Checkbox:' : '  Checkbox:'}</Text>
      <Checkbox
        label=""
        items={CHECKBOX_ITEMS}
        value={selected}
        onChange={setSelected}
        focus={isFocused}
      />
    </Box>
  )
}

// ── MultiSelect ───────────────────────────────────────────────────────────────

function FocusedMultiSelect(): JSX.Element {
  const { isFocused } = useFocus('multiselect')
  const [selected, setSelected] = useState<string[]>([])

  return (
    <Box flexDirection="column">
      <Text dimColor>{isFocused ? '❯ MultiSelect:' : '  MultiSelect:'}</Text>
      <MultiSelect
        label=""
        items={MULTI_SELECT_ITEMS}
        value={selected}
        onChange={setSelected}
        focus={isFocused}
      />
    </Box>
  )
}

// ── ConfirmInput ──────────────────────────────────────────────────────────────

function FocusedConfirm(): JSX.Element {
  const { isFocused } = useFocus('confirm')
  const [answer, setAnswer] = useState<boolean | null>(null)

  return (
    <Box flexDirection="column">
      {answer === null
        ? (
            <ConfirmInput
              message="Publish to npm?"
              defaultAnswer="yes"
              onConfirm={setAnswer}
              focus={isFocused}
            />
          )
        : (
            <Text>
              Answer:
              {' '}
              <Text color={answer ? 'green' : 'red'}>{answer ? 'yes' : 'no'}</Text>
              <Text dimColor>  (reset on re-focus)</Text>
            </Text>
          )}
    </Box>
  )
}

// ── Viewport ──────────────────────────────────────────────────────────────────

function FocusedViewport(): JSX.Element {
  const { isFocused } = useFocus('viewport')

  return (
    <Box flexDirection="column">
      <Text dimColor>{isFocused ? '❯ Viewport  (↑↓ · PageUp/Down)' : '  Viewport:'}</Text>
      <Viewport
        lines={VIEWPORT_LINES}
        height={4}
        width={50}
        focus={isFocused}
      />
    </Box>
  )
}

// ── List ──────────────────────────────────────────────────────────────────────

function FocusedList(): JSX.Element {
  const { isFocused } = useFocus('list')

  return (
    <Box flexDirection="column">
      <Text dimColor>{isFocused ? '❯ List:' : '  List:'}</Text>
      <List
        items={LIST_ITEMS}
        height={4}
        focus={isFocused}
      />
    </Box>
  )
}

// ── Table ─────────────────────────────────────────────────────────────────────

function FocusedTable(): JSX.Element {
  const { isFocused } = useFocus('table')

  return (
    <Box flexDirection="column">
      <Text dimColor>{isFocused ? '❯ Table  (↑↓ · scroll rows):' : '  Table:'}</Text>
      <Table
        columns={TABLE_COLUMNS}
        data={TABLE_DATA}
        height={5}
        focus={isFocused}
      />
    </Box>
  )
}

// ── FilePicker ────────────────────────────────────────────────────────────────

function FocusedFilePicker(): JSX.Element {
  const { isFocused } = useFocus('filepicker')
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <Box flexDirection="column">
      <Text dimColor>{isFocused ? '❯ FilePicker:' : '  FilePicker:'}</Text>
      {selected
        ? (
            <Text dimColor>
              Selected:
              <Text color="cyan">{selected}</Text>
            </Text>
          )
        : null}
      <FilePicker
        initialDir="."
        height={5}
        onSelect={entry => setSelected(entry.path)}
        focus={isFocused}
      />
    </Box>
  )
}

// ── Quit handler ──────────────────────────────────────────────────────────────

function QuitHandler(): null {
  const { exit } = useApp()
  useInput((input) => {
    if (input === 'q')
      exit()
  })
  return null
}

// ── App ───────────────────────────────────────────────────────────────────────

function App({ onThemeChange }: { onThemeChange: (c: string) => void }): JSX.Element {
  const cols = Math.min(process.stdout.columns || 80, 80)
  const { isRawModeSupported } = useStdin()
  const div = <Text dimColor>{'─'.repeat(cols)}</Text>

  // Paginator animation - disabled since Paginator is commented out
  // useEffect(() => {
  //   const t = setInterval(() => setPaginatorPage(p => (p % 5) + 1), 1200)
  //   return () => clearInterval(t)
  // }, [])

  return (
    <Box flexDirection="column" paddingX={1}>
      {isRawModeSupported ? <QuitHandler /> : null}

      {/* Header */}
      <Box gap={2}>
        <Text bold color="cyan">orizen-tui</Text>
        <Text dimColor>component showcase</Text>
        <Text dimColor>·  q to quit</Text>
      </Box>


      {/* Timer & Stopwatch */}
      {/* <Text dimColor>── Timer · Stopwatch</Text>
      <Box gap={6} paddingLeft={2}>
        <Timer durationMs={30000} label="Countdown:" />
        <Stopwatch running label="Elapsed:" />
        <Stopwatch running={false} label="Paused:" />
      </Box> */}

      {div}

      {/* Help */}
      <Text dimColor>── Help</Text>
      <Box paddingLeft={2}>
        <Help bindings={HELP_BINDINGS} direction="row" />
      </Box>

      {div}

      {/* Interactive — Row 1: Select, TextInput */}
      <Text dimColor>── Interactive  (Tab · switch focus)</Text>
      <FocusManager defaultId="select">
        <Box flexDirection="column" gap={1} paddingLeft={2}>

          <Box gap={6}>
            <FocusedSelect onThemeChange={onThemeChange} />
          </Box>

          {/* {div}

          <Box gap={4} alignItems="flex-start">
            <FocusedCheckbox />
            <FocusedMultiSelect />
            <FocusedConfirm />
          </Box> */}

          {div}

          <Box >
            {/* <FocusedViewport /> */}
          </Box>

          {div}

          {/* <Box gap={4} alignItems="flex-start">
            <FocusedList />
            <FocusedTable />
          </Box> */}

          {div}

          <FocusedFilePicker />

        </Box>
      </FocusManager>

      {div}

      <Help bindings={HELP_BINDINGS} direction="row" />
    </Box>
  )
}

// ── Demo root ─────────────────────────────────────────────────────────────────

function Demo(): JSX.Element {
  const [primary, setPrimary] = useState('cyan')

  return (
    <ThemeProvider theme={{ colors: { primary } }}>
      <App onThemeChange={setPrimary} />
    </ThemeProvider>
  )
}

render(<Demo />)
