import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'timer',
  name: 'Timer',
  description: 'Countdown timer with configurable duration and expiry callback.',
  category: 'feedback',
  usage: `import { Timer } from '@/components/ui/orizen/timer'

// Basic countdown from 60 seconds
<Timer durationMs={60000} />

// With label and expiry callback
<Timer
  durationMs={30000}
  label="Time remaining:"
  onExpire={() => console.log('Time is up!')}
/>`,
  demo: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { Timer } from '@/components/ui/orizen/timer'

function Demo() {
  const [shortTimer, setShortTimer] = useState(5000)
  const [mediumTimer, setMediumTimer] = useState(15000)

  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Countdown Timers</Text>

      <Box gap={6}>
        <Box flexDirection="column" gap={1}>
          <Text dimColor>5 seconds:</Text>
          <Timer
            durationMs={shortTimer}
            label="Starting in:"
            onExpire={() => setShortTimer(5000)}
          />
        </Box>

        <Box flexDirection="column" gap={1}>
          <Text dimColor>15 seconds:</Text>
          <Timer
            durationMs={mediumTimer}
            label="Session ends:"
            onExpire={() => setMediumTimer(15000)}
          />
        </Box>
      </Box>

      <Text bold>Without Labels</Text>
      <Box gap={4}>
        <Timer durationMs={10000} />
        <Timer durationMs={30000} />
      </Box>

      <Text bold>Session Timeout</Text>
      <Timer
        durationMs={60000}
        label="Auto-logout in:"
        onExpire={() => console.log('Session expired!')}
      />

      <Text dimColor>Use onExpire callback to trigger actions when timer ends.</Text>
    </Box>
  )
}

render(<Demo />)`,
  props: [
    { name: 'durationMs', type: 'number', default: '—', description: 'Countdown duration in milliseconds' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Text shown before the time display' },
    { name: 'onExpire', type: '() => void', default: 'undefined', description: 'Callback fired when countdown reaches zero' },
  ],
}
