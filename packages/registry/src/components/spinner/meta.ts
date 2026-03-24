import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'spinner',
  name: 'Spinner',
  description: 'Animated terminal spinner with named presets and customizable frames.',
  category: 'feedback',
  usage: `import { Spinner } from '@/components/ui/orizen/spinner'

// Named presets
<Spinner preset="dots" label="Loading..." />
<Spinner preset="circle" label="Processing" />
<Spinner preset="bar" label="Building" />

// Custom frames (advanced)
<Spinner frames={['-', '\\\\', '|', '/']} label="Processing" />`,
  examples: [
    {
      title: 'Presets',
      code: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Spinner } from '@/components/ui/orizen/spinner'

function Demo() {
  return (
    <Box flexDirection="column" gap={2}>
      <Text bold>Spinner Presets</Text>
      <Box gap={4}>
        <Spinner preset="dots" label="Loading..." />
        <Spinner preset="circle" label="Processing" />
        <Spinner preset="bar" label="Building" />
      </Box>
    </Box>
  )
}

render(<Demo />)`,
    },
    {
      title: 'Custom Frames',
      code: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Spinner } from '@/components/ui/orizen/spinner'

function Demo() {
  return (
    <Box flexDirection="column" gap={2}>
      <Text bold>Custom Frames</Text>
      <Spinner frames={['🌐', '🌍', '🌎', '🌏']} label="Rotating" />
    </Box>
  )
}

render(<Demo />)`,
    },
    {
      title: 'Slow Interval',
      code: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Spinner } from '@/components/ui/orizen/spinner'

function Demo() {
  return (
    <Box flexDirection="column" gap={2}>
      <Text bold>Slow Interval</Text>
      <Spinner preset="dots" label="Take your time..." intervalMs={300} />
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'label', type: 'string', default: 'undefined', description: 'Text shown after the spinner frame' },
    { name: 'preset', type: '"dots" | "circle" | "bar"', default: 'undefined', description: 'Named spinner style for common presets' },
    { name: 'frames', type: 'string[]', default: 'theme spinner', description: 'Custom animation frames (overrides preset/theme)' },
    { name: 'intervalMs', type: 'number', default: '80', description: 'Frame advance interval in ms' },
  ],
}
