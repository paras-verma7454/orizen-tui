import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'help',
  name: 'Help',
  description: 'Auto-generated keybinding help panel for terminal UIs.',
  category: 'display',
  usage: `import { Help } from '@/components/ui/orizen/help'

const bindings = [
  { key: '↑↓', description: 'Navigate' },
  { key: 'Enter', description: 'Select' },
  { key: 'Esc', description: 'Cancel' },
  { name: 'q', description: 'Quit' },
]

// Horizontal layout (default)
<Help bindings={bindings} />

// Vertical layout
<Help bindings={bindings} direction="column" />`,
  demo: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Help } from '@/components/ui/orizen/help'

const navBindings = [
  { key: '↑/k', description: 'move up' },
  { key: '↓/j', description: 'move down' },
  { key: '←/h', description: 'move left' },
  { key: '→/l', description: 'move right' },
]

const actionBindings = [
  { key: 'Enter', description: 'select' },
  { key: 'Space', description: 'toggle' },
  { key: 'Esc', description: 'cancel' },
  { key: 'q', description: 'quit' },
]

function Demo() {
  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Help Panels</Text>

      <Box flexDirection="column" gap={2}>
        <Text dimColor>Horizontal (default):</Text>
        <Help bindings={navBindings} direction="row" />
      </Box>

      <Box flexDirection="column" gap={2}>
        <Text dimColor>Vertical:</Text>
        <Help bindings={actionBindings} direction="column" />
      </Box>

      <Text bold>Combined Navigation + Actions</Text>
      <Box gap={8}>
        <Box flexDirection="column" gap={1}>
          <Text dimColor>Navigation</Text>
          <Help bindings={navBindings} />
        </Box>
        <Box flexDirection="column" gap={1}>
          <Text dimColor>Actions</Text>
          <Help bindings={actionBindings} />
        </Box>
      </Box>
    </Box>
  )
}

render(<Demo />)`,
  props: [
    { name: 'bindings', type: 'KeyBinding[]', default: '—', description: 'Array of { key, description } pairs' },
    { name: 'direction', type: '"row" | "column"', default: '"row"', description: 'Layout direction for the binding list' },
  ],
}
