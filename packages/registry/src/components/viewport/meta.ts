import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'viewport',
  name: 'Viewport',
  description: 'Scrollable content area with overflow indicators and keyboard navigation.',
  category: 'display',
  usage: `import { Viewport } from '@/components/ui/orizen/viewport'

const lines = Array.from({ length: 50 }, (_, i) => \`Line \${i + 1}\`)

// Basic scrollable viewport
<Viewport lines={lines} height={10} />

// Fixed width, no indicators
<Viewport lines={lines} height={8} width={60} showScrollIndicator={false} />`,
  demo: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Viewport } from '@/components/ui/orizen/viewport'

const poem = [
  'Roses are red,',
  'Violets are blue,',
  'Terminals are awesome,',
  'And so are you!',
  '',
  '## Features',
  '',
  '- Scrollable content',
  '- Keyboard navigation',
  '- Overflow indicators',
  '- Custom heights',
  '',
  '## Tips',
  '',
  'Use ↑↓ keys to scroll',
  'or PageUp/PageDown.',
  '',
  'The viewport component',
  'handles overflow elegantly.',
]

const logLines = [
  '[INFO] Server started on port 3000',
  '[INFO] Database connected',
  '[INFO] Cache initialized',
  '[WARN] Rate limit approaching',
  '[INFO] Processing request...',
  '[DEBUG] Query: SELECT * FROM users',
  '[INFO] Request completed in 45ms',
  '[ERROR] Failed to connect to redis',
  '[INFO] Retrying connection...',
  '[INFO] Redis connected',
  '[INFO] Health check passed',
]

function Demo() {
  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Viewports (↑↓ to scroll)</Text>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Poem (height 6):</Text>
        <Viewport lines={poem} height={6} />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Log output (height 5):</Text>
        <Viewport lines={logLines} height={5} />
      </Box>

      <Text dimColor>Viewports show overflow indicators when content exceeds height.</Text>
    </Box>
  )
}

render(<Demo />)`,
  props: [
    { name: 'lines', type: 'string[]', default: '—', description: 'Lines of text to render' },
    { name: 'height', type: 'number', default: '—', description: 'Number of visible lines' },
    { name: 'width', type: 'number', default: 'undefined', description: 'Fixed column width (optional)' },
    { name: 'showScrollIndicator', type: 'boolean', default: 'true', description: 'Show ↑/↓ overflow indicators' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard scroll input' },
  ],
}
