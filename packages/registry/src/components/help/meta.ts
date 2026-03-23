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
  { key: 'q', description: 'Quit' },
]

// Horizontal layout (default)
<Help bindings={bindings} />

// Vertical layout
<Help bindings={bindings} direction="column" />`,
  props: [
    { name: 'bindings', type: 'KeyBinding[]', default: '—', description: 'Array of { key, description } pairs' },
    { name: 'direction', type: '"row" | "column"', default: '"row"', description: 'Layout direction for the binding list' },
  ],
}
