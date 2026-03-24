import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'stopwatch',
  name: 'Stopwatch',
  description: 'Count-up elapsed time tracker with pause support.',
  category: 'feedback',
  usage: `import { Stopwatch } from '@/components/ui/orizen/stopwatch'

// Running stopwatch
<Stopwatch />

// Paused stopwatch with label
<Stopwatch running={false} label="Elapsed:" />`,
  examples: [
    {
      title: 'Variants',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { Stopwatch } from '@/components/ui/orizen/stopwatch'

function Demo() {
  const [isRunning, setIsRunning] = useState(true)

  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Stopwatch Variants</Text>

      <Box gap={6}>
        <Box flexDirection="column" gap={1}>
          <Text dimColor>Running:</Text>
          <Stopwatch running label="Elapsed:" />
        </Box>

        <Box flexDirection="column" gap={1}>
          <Text dimColor>Paused:</Text>
          <Stopwatch running={false} label="Time:" />
        </Box>
      </Box>

      <Text bold>Without Labels</Text>
      <Box gap={4}>
        <Stopwatch running />
        <Stopwatch running={false} />
      </Box>

      <Text bold>Race Timer</Text>
      <Box gap={6}>
        <Box flexDirection="column" gap={1}>
          <Text dimColor>Runner 1:</Text>
          <Stopwatch running={isRunning} label="T1:" />
        </Box>
        <Box flexDirection="column" gap={1}>
          <Text dimColor>Runner 2:</Text>
          <Stopwatch running={!isRunning} label="T2:" />
        </Box>
        <Text dimColor>(toggles every 3s)</Text>
      </Box>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'running', type: 'boolean', default: 'true', description: 'Whether the stopwatch is counting up' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Text shown before the elapsed time' },
  ],
}
