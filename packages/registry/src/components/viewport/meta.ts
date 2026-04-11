import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'viewport',
  name: 'Viewport',
  description: 'Scrollable content area with overflow indicators and keyboard navigation.',
  category: 'display',
  usage: `import React from 'react'
import { render, Box } from 'ink'
import { Viewport } from '@/components/ui/orizen/viewport'

const lines = [
  'Line 1: Welcome to the viewport',
  'Line 2: Scroll with ↑↓ arrows',
  'Line 3: Page Up/Page Down to jump',
  'Line 4: More content here',
  'Line 5: Even more content',
  'Line 6: Keep scrolling',
  'Line 7: Almost there',
  'Line 8: Last line',
]

function App() {
  return (
    <Box flexDirection="column" gap={1}>
      <Viewport lines={lines} height={5} />
    </Box>
  )
}

render(<App />)`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Viewport } from '@/components/ui/orizen/viewport'

const lines = [
  '> He holds him with a skinny hand,',
  '  \\'There was a ship,\\' quoth he.',
  '  \\'Hold off! unhand me, grey-beard loon!\\'',
  '  An artichoke, dropt he.',
  '',
  '--Samuel Taylor Coleridge',
  '',
  '## Other foods worth mentioning',
  '',
  '1. Carrots',
  '1. Celery',
  '1. Tacos',
  '      * Soft',
  '      * Hard',
  '1. Cucumber',
  '',
  '## Things to eat today',
  '',
  '* [x] Carrots',
  '* [x] Ramen',
  '* [ ] Currywurst',
]

function Demo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Viewport lines={lines} height={10} />
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'lines', type: 'string[]', default: '—', description: 'Lines of text to render' },
    { name: 'height', type: 'number', default: '—', description: 'Number of visible lines' },
    { name: 'width', type: 'number', default: 'undefined', description: 'Fixed column width (optional)' },
    { name: 'showScrollIndicator', type: 'boolean', default: 'true', description: 'Show ↑/↓ overflow indicators' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard scroll input' },
  ],
}
