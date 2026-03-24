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
  demo: `import { Box, Text, render } from 'ink'
import React, { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/orizen/progress'

function AnimatedProgress() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(v => (v >= 100 ? 0 : v + 5))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box flexDirection="column" gap={2}>
      <Text bold>Progress Bars</Text>
      
      <Progress value={value} label="Download:" width={30} />
      <Progress value={75} label="Upload:" width={30} />
      <Progress value={100} label="Complete:" width={30} />
      
      <Text bold>No Labels</Text>
      <Progress value={45} width={20} showPercent={false} />
      
      <Text bold>Indeterminate</Text>
      <Progress />
    </Box>
  )
}

render(<AnimatedProgress />)`,
  props: [
    { name: 'value', type: 'number', default: 'undefined', description: 'Current value (omit for indeterminate)' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
    { name: 'width', type: 'number', default: '40', description: 'Bar width in columns' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label before the bar' },
    { name: 'showPercent', type: 'boolean', default: 'true', description: 'Show percentage after bar' },
  ],
}
