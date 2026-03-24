import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'select',
  name: 'Select',
  description: 'Arrow-key navigable single-choice list with full keyboard support.',
  category: 'input',
  usage: `import { Select } from '@/components/ui/orizen/select'

<Select
  label="Pick a framework:"
  items={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
  ]}
  onSelect={(item) => {
    // item.value => "react" | "vue"
  }}
/>`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { Select } from '@/components/ui/orizen/select'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
]

function Demo() {
  const [selected, setSelected] = useState('')

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>Pick a framework:</Text>
      <Select
        items={frameworks}
        onSelect={(item) => setSelected(item.value)}
      />
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'items', type: 'ReadonlyArray<{ label: string; value: T }>', default: '-', description: 'List items' },
    { name: 'value', type: 'T', default: '-', description: 'Selected value (controlled)' },
    { name: 'onSelect', type: '(item) => void', default: '-', description: 'Called when item is selected (optional)' },
    { name: 'initialIndex', type: 'number', default: '0', description: 'Initially highlighted item (uncontrolled)' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Heading above the list' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether list accepts keyboard events' },
  ],
}
