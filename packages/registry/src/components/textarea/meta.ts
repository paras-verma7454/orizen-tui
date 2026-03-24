import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'textarea',
  name: 'Textarea',
  description: 'Multi-line text input with cursor management and configurable row height.',
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
/>`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/orizen/textarea'

function Demo() {
  const [value, setValue] = useState('')

  return (
    <Box flexDirection="column" gap={1}>
      <Text dimColor>Description:</Text>
      <Textarea
        value={value}
        onChange={setValue}
        rows={2}
        placeholder="Building a terminal UI"
      />
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'value', type: 'string', default: '-', description: 'Current text value' },
    { name: 'onChange', type: '(value: string) => void', default: '-', description: 'Called on every keypress' },
    { name: 'rows', type: 'number', default: '3', description: 'Visible row height' },
    { name: 'placeholder', type: 'string', default: '\'\'', description: 'Shown when value is empty' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label above the textarea' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
  ],
}
