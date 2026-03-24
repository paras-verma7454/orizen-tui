import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'number-input',
  name: 'NumberInput',
  description: 'Numeric input with up/down arrow key increment and configurable step.',
  category: 'input',
  usage: `import { useState } from 'react'
import { NumberInput } from '@/components/ui/orizen/number-input'

const [port, setPort] = useState(3000)

<NumberInput
  label="Port:"
  value={port}
  onChange={setPort}
  min={1024}
  max={65535}
  step={1}
/>`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { NumberInput } from '@/components/ui/orizen/number-input'

function Demo() {
  const [port, setPort] = useState(3000)
  const [workers, setWorkers] = useState(4)

  return (
    <Box flexDirection="column" gap={3}>
      <Box flexDirection="column" gap={1}>
        <Text dimColor>Port:</Text>
        <NumberInput
          value={port}
          onChange={setPort}
          min={3000}
          max={3005}
          step={1}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Workers:</Text>
        <NumberInput
          value={workers}
          onChange={setWorkers}
          min={1}
          max={8}
          step={1}
        />
      </Box>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'value', type: 'number', default: '-', description: 'Current numeric value (controlled)' },
    { name: 'onChange', type: '(value: number) => void', default: '-', description: 'Called when value changes (controlled)' },
    { name: 'defaultValue', type: 'number', default: '0', description: 'Initial value (uncontrolled)' },
    { name: 'min', type: 'number', default: '-Infinity', description: 'Minimum allowed value' },
    { name: 'max', type: 'number', default: 'Infinity', description: 'Maximum allowed value' },
    { name: 'step', type: 'number', default: '1', description: 'Increment/decrement amount per keypress' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label above the input' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
  ],
}
