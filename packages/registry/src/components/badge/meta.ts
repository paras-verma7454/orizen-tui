import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'badge',
  name: 'Badge',
  description: 'Inline colored label with semantic variants driven by the theme.',
  category: 'display',
  usage: `import React from 'react'
import { render, Box } from 'ink'
import { Badge } from '@/components/ui/orizen/badge'

function App() {
  return (
    <Box gap={2}>
      <Badge variant="default">v1.0.0</Badge>
      <Badge variant="success">Deployed</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info">Info</Badge>
    </Box>
  )
}

render(<App />)`,
  examples: [
    {
      title: 'Variants',
      code: `import { Box, render } from 'ink'
import React from 'react'
import { Badge } from '@/components/ui/orizen/badge'

function Demo() {
  return (
    <Box gap={2}>
      <Badge variant="default">[default]</Badge>
      <Badge variant="success">[success]</Badge>
      <Badge variant="warning">[warning]</Badge>
      <Badge variant="error">[error]</Badge>
      <Badge variant="info">[info]</Badge>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'variant', type: '\'default\' | \'success\' | \'warning\' | \'error\' | \'info\'', default: '\'default\'', description: 'Visual variant' },
    { name: 'children', type: 'React.ReactNode', default: '-', description: 'Badge content' },
  ],
}
