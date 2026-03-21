import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'text-input',
  name: 'TextInput',
  description: 'Single-line keyboard-driven text input with focus management.',
  category: 'input',
  usage: `import { useState } from 'react'
import { TextInput } from '@/components/ui/orizen/text-input'

const [value, setValue] = useState('')

<TextInput
  label="Component name:"
  value={value}
  onChange={setValue}
  placeholder="e.g. button..."
/>`,
  props: [
    { name: 'value', type: 'string', default: '-', description: 'Current input value' },
    { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Called on every keypress' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Shown when value is empty' },
    { name: 'mask', type: 'string', default: 'undefined', description: "Mask character (e.g. '*' for passwords)" },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label above the input' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
  ],
}
