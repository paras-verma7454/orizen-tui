import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'badge',
  name: 'Badge',
  description: 'Inline colored label with semantic variants driven by the theme.',
  category: 'display',
  usage: `import { Badge } from '@/components/ui/orizen/badge'

<Badge variant="default">v1.0.0</Badge>
<Badge variant="success">Deployed</Badge>
<Badge variant="error">Failed</Badge>`,
  examples: [
    {
      title: 'Variants',
      code: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Badge } from '@/components/ui/orizen/badge'

function Demo() {
  return (
    <Box flexDirection="column" gap={2}>
      <Text bold>Status Badges</Text>
      <Box gap={2}>
        <Badge variant="default">default</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="error">error</Badge>
        <Badge variant="info">info</Badge>
      </Box>

      <Text bold>Version Tags</Text>
      <Box gap={2}>
        <Badge>v1.0.0</Badge>
        <Badge variant="success">latest</Badge>
        <Badge variant="warning">beta</Badge>
      </Box>

      <Text bold>Status Indicators</Text>
      <Box gap={2}>
        <Badge variant="success">✓ Online</Badge>
        <Badge variant="error">✗ Offline</Badge>
        <Badge variant="warning">⚠ Pending</Badge>
      </Box>
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
