import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'textarea',
  name: 'Textarea',
  description: 'Multi-line text input with cursor management and configurable row height. Press Enter to submit, Shift+Enter for new line.',
  category: 'input',
  usage: `import { useState } from 'react'
import { Textarea } from '@/components/ui/orizen/textarea'

const [value, setValue] = useState('')

<Textarea
  label="Description:"
  value={value}
  onChange={setValue}
  rows={4}
  placeholder="Enter description..."
  onSubmit={(val) => console.log(val)}
/>`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/orizen/textarea'

function Demo() {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState('')

  return (
    <Box flexDirection="column" gap={1}>
      <Text dimColor>Message:</Text>
      <Textarea
        value={value}
        onChange={setValue}
        rows={3}
        placeholder="Type here... (Enter to submit, Shift+Enter for new line)"
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
    { name: 'value', type: 'string', default: '-', description: 'Current text value (controlled)' },
    { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Called when value changes (controlled)' },
    { name: 'defaultValue', type: 'string', default: "''", description: 'Initial value (uncontrolled)' },
    { name: 'onSubmit', type: '() => void', default: '-', description: 'Called when Enter is pressed (Shift+Enter adds newline)' },
    { name: 'rows', type: 'number', default: '3', description: 'Visible row height' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Shown when value is empty' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label above the textarea' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
    { name: 'width', type: 'number', default: 'undefined', description: 'Width of the textarea in columns' },
    { name: 'color', type: 'string', default: 'undefined', description: 'Text color' },
  ],
}
