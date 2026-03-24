import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'multi-select',
  name: 'MultiSelect',
  description: 'Arrow-key list with space-to-toggle multi-choice selection.',
  category: 'input',
  usage: `import { useState } from 'react'
import { MultiSelect } from '@/components/ui/orizen/multi-select'

const [chosen, setChosen] = useState<string[]>([])

<MultiSelect
  label="Pick frameworks:"
  items={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
  ]}
  value={chosen}
  onChange={setChosen}
  onSubmit={(values) => console.log(values)}
/>`,
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
  { label: 'Angular', value: 'angular' },
]

const features = [
  { label: 'TypeScript', value: 'ts' },
  { label: 'SSR', value: 'ssr' },
  { label: 'SSG', value: 'ssg' },
  { label: 'Edge Runtime', value: 'edge' },
]

function Demo() {
  const [selected, setSelected] = useState<string[]>([])
  const [featureSet, setFeatureSet] = useState<string[]>(['ts'])

  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>MultiSelect (Space to toggle, Enter to submit)</Text>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Pick frameworks:</Text>
        <MultiSelect
          label=""
          items={frameworks}
          value={selected}
          onChange={setSelected}
          onSubmit={(vals) => console.log('Submitted:', vals)}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Feature set:</Text>
        <MultiSelect
          label=""
          items={features}
          value={featureSet}
          onChange={setFeatureSet}
        />
      </Box>

      <Text dimColor>Selected: {selected.join(', ') || 'none'}</Text>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'items', type: 'Array<{ label: string; value: string }>', default: '-', description: 'List of selectable items' },
    { name: 'value', type: 'string[]', default: '[]', description: 'Currently selected values' },
    { name: 'onChange', type: '(values: string[]) => void', default: '-', description: 'Called when selection changes' },
    { name: 'onSubmit', type: '(values: string[]) => void', default: 'undefined', description: 'Called when Enter is pressed' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Heading above the list' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether list accepts keyboard events' },
  ],
}
