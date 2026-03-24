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
  const [count, setCount] = useState(0)
  const [volume, setVolume] = useState(50)

  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Number Inputs (↑↓ to adjust)</Text>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Port (1-65535, step 1):</Text>
        <NumberInput
          value={port}
          onChange={setPort}
          min={1}
          max={65535}
          step={1}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Counter (0-100, step 1):</Text>
        <NumberInput
          value={count}
          onChange={setCount}
          min={0}
          max={100}
          step={1}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Volume (0-100, step 10):</Text>
        <NumberInput
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          step={10}
        />
      </Box>

      <Text dimColor>
        Port: {port} | Count: {count} | Volume: {volume}%
      </Text>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'value', type: 'number', default: '0', description: 'Current numeric value' },
    { name: 'onChange', type: '(value: number) => void', default: '-', description: 'Called when value changes' },
    { name: 'min', type: 'number', default: '-Infinity', description: 'Minimum allowed value' },
    { name: 'max', type: 'number', default: 'Infinity', description: 'Maximum allowed value' },
    { name: 'step', type: 'number', default: '1', description: 'Increment/decrement amount per keypress' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label above the input' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
  ],
}
