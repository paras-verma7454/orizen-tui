import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'text-input',
  name: 'TextInput',
  description: 'Single-line keyboard-driven text input with focus management. Press Enter to submit.',
  category: 'input',
  usage: `import { useState } from 'react'
import { TextInput } from '@/components/ui/orizen/text-input'

const [value, setValue] = useState('')

<TextInput
  label="Component name:"
  value={value}
  onChange={setValue}
  placeholder="e.g. button..."
  onSubmit={(val) => console.log(val)}
/>`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { TextInput } from '@/components/ui/orizen/text-input'

function Demo() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState('')

  return (
    <Box flexDirection="column" gap={1}>
      <Text dimColor>Enter name:</Text>
      <TextInput
        value={value}
        onChange={setValue}
        placeholder="Type and press Enter..."
        onSubmit={() => {
          setSubmitted(value)
          setValue('')
        }}
      />
      {submitted && <Text color="green">Submitted: {submitted}</Text>}
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'value', type: 'string', default: '-', description: 'Current input value' },
    { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Called on every keypress' },
    { name: 'onSubmit', type: '() => void', default: '-', description: 'Called when Enter is pressed' },
    { name: 'placeholder', type: 'string', default: '\'\'', description: 'Shown when value is empty' },
    { name: 'mask', type: 'string', default: 'undefined', description: 'Mask character (e.g. \'*\' for passwords)' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label above the input' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
    { name: 'width', type: 'number', default: 'undefined', description: 'Width of the input box in columns' },
    { name: 'color', type: 'string', default: 'undefined', description: 'Text color' },
  ],
}
