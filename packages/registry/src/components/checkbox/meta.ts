import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'checkbox',
  name: 'Checkbox',
  description: 'Arrow-key navigable list of toggleable boolean items.',
  category: 'input',
  usage: `import { useState } from 'react'
import { Checkbox } from '@/components/ui/orizen/checkbox'

const [selected, setSelected] = useState<string[]>(['typescript'])

<Checkbox
  label="Select features:"
  items={[
    { label: 'TypeScript', value: 'typescript' },
    { label: 'ESLint', value: 'eslint' },
    { label: 'Prettier', value: 'prettier' },
  ]}
  value={selected}
  onChange={setSelected}
/>`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/orizen/checkbox'

const items = [
  { label: 'TypeScript', value: 'ts' },
  { label: 'ESLint', value: 'eslint' },
  { label: 'Prettier', value: 'prettier' },
  { label: 'Husky', value: 'husky' },
]

function Demo() {
  const [selected, setSelected] = useState<string[]>(['ts', 'eslint'])

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>Select features:</Text>
      <Checkbox
        label=""
        items={items}
        value={selected}
        onChange={setSelected}
      />
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'items', type: 'Array<{ label: string; value: string }>', default: '-', description: 'List of toggleable items' },
    { name: 'value', type: 'string[]', default: '[]', description: 'Array of selected values' },
    { name: 'onChange', type: '(values: string[]) => void', default: '-', description: 'Called when an item is toggled' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Heading above the list' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether list accepts keyboard events' },
  ],
}
