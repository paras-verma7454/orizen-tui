import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'progress',
  name: 'Progress',
  description: 'Horizontal progress bar with determinate and indeterminate modes.',
  category: 'feedback',
  usage: `import { Progress } from '@/components/ui/orizen/progress'

<Progress value={75} label="Uploading:" />
<Progress value={100} label="Done:" />
<Progress /> // indeterminate`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/orizen/progress'

function AnimatedProgress() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(v => (v >= 100 ? 0 : v + 2))
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box flexDirection="column" gap={1}>
      <Box gap={2}>
        <Text dimColor>Animated:</Text>
        <Progress value={value} width={30} />
      </Box>
      <Box gap={2}>
        <Text dimColor>Static:</Text>
        <Progress value={65} width={30} />
      </Box>
      <Box gap={2}>
        <Text dimColor>Complete:</Text>
        <Progress value={100} width={30} />
      </Box>
    </Box>
  )
}

render(<AnimatedProgress />)`,
    },
  ],
  props: [
    { name: 'value', type: 'number', default: 'undefined', description: 'Current value (omit for indeterminate)' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
    { name: 'width', type: 'number', default: '40', description: 'Bar width in columns' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label before the bar' },
    { name: 'showPercent', type: 'boolean', default: 'true', description: 'Show percentage after bar' },
  ],
}
