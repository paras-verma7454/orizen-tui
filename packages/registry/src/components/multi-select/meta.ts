import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'multi-select',
  name: 'MultiSelect',
  description: 'Arrow-key list with space-to-toggle multi-choice selection.',
  category: 'input',
  usage: `import React, { useState } from 'react'
import { render, Box, Text } from 'ink'
import { MultiSelect } from '@/components/ui/orizen/multi-select'

const items = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
]

function App() {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>Pick frameworks: <Text dimColor>(space to toggle)</Text></Text>
      <MultiSelect
        items={items}
        value={selected}
        onChange={setSelected}
        onSubmit={(values) => console.log('Selected:', values)}
      />
    </Box>
  )
}

render(<App />)`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { MultiSelect } from '@/components/ui/orizen/multi-select'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
]

function Demo() {
  const [selected, setSelected] = useState<string[]>(['react', 'svelte'])

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>Pick frameworks: <Text dimColor>(space to toggle)</Text></Text>
      <MultiSelect
        label=""
        items={frameworks}
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
    { name: 'items', type: 'Array<{ label: string; value: string }>', default: '-', description: 'List of selectable items' },
    { name: 'value', type: 'string[]', default: '-', description: 'Selected values (controlled)' },
    { name: 'onChange', type: '(values: string[]) => void', default: '-', description: 'Called when selection changes (controlled)' },
    { name: 'defaultValue', type: 'string[]', default: '[]', description: 'Initial values (uncontrolled)' },
    { name: 'onSubmit', type: '(values: string[]) => void', default: 'undefined', description: 'Called when Enter is pressed' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Heading above the list' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether list accepts keyboard events' },
  ],
}
