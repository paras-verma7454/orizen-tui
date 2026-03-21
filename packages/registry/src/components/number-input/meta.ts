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
