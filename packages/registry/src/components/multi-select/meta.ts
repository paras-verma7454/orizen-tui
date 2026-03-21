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
  props: [
    { name: 'items', type: 'Array<{ label: string; value: string }>', default: '-', description: 'List of selectable items' },
    { name: 'value', type: 'string[]', default: '[]', description: 'Currently selected values' },
    { name: 'onChange', type: '(values: string[]) => void', default: '-', description: 'Called when selection changes' },
    { name: 'onSubmit', type: '(values: string[]) => void', default: 'undefined', description: 'Called when Enter is pressed' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Heading above the list' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether list accepts keyboard events' },
  ],
}
