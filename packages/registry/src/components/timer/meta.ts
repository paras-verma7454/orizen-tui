import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'timer',
  name: 'Timer',
  description: 'Countdown timer with configurable duration and expiry callback.',
  category: 'feedback',
  usage: `import React from 'react'
import { render, Box, Text } from 'ink'
import { Timer } from '@/components/ui/orizen/timer'

function App() {
  return (
    <Box flexDirection="column" gap={1}>
      <Timer durationMs={60000} label="Time remaining:" />
      <Timer
        durationMs={30000}
        label="Auto-save in:"
        onExpire={() => console.log('Time is up!')}
      />
    </Box>
  )
}

render(<App />)`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState, useEffect } from 'react'
import { Timer } from '@/components/ui/orizen/timer'

function Demo() {
  const [ms, setMs] = useState(5320)

  useEffect(() => {
    const timer = setInterval(() => {
      setMs(m => m <= 0 ? 9999 : m - 37)
    }, 37)
    return () => clearInterval(timer)
  }, [])

  const display = ms > 0 ? \`\${ms}ms\` : '0ms'

  return (
    <Box flexDirection="column" gap={2}>
      <Text>Exiting in <Text color={ms <= 3000 ? 'yellow' : 'cyan'}>{display}</Text></Text>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'durationMs', type: 'number', default: '—', description: 'Countdown duration in milliseconds' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Text shown before the time display' },
    { name: 'onExpire', type: '() => void', default: 'undefined', description: 'Callback fired when countdown reaches zero' },
  ],
}
