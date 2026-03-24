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
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Help } from '@/components/ui/orizen/help'

const navBindings = [
  { key: '↑/k', description: 'move up' },
  { key: '↓/j', description: 'move down' },
  { key: '←/h', description: 'move left' },
  { key: '→/l', description: 'move right' },
]

const actionBindings = [
  { key: '?', description: 'toggle help' },
  { key: 'q', description: 'quit' },
]

function Demo() {
  return (
    <Box gap={8}>
      <Box flexDirection="column" gap={1}>
        <Help bindings={navBindings} />
      </Box>
      <Box flexDirection="column" gap={1}>
        <Help bindings={actionBindings} />
      </Box>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'bindings', type: 'KeyBinding[]', default: '—', description: 'Array of { key, description } pairs' },
    { name: 'direction', type: '"row" | "column"', default: '"row"', description: 'Layout direction for the binding list' },
  ],
}
