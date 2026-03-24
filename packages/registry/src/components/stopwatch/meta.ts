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
import React, { useState, useEffect } from 'react'
import { Stopwatch } from '@/components/ui/orizen/stopwatch'

function Demo() {
  const [running, setRunning] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setRunning(r => !r), 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box flexDirection="column" gap={1}>
      <Text>Elapsed: <Text color={running ? 'cyan' : 'dimColor'}>{running ? '0.00' : '4.15'}</Text></Text>
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
