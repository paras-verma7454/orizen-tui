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
  props: [
    { name: 'items', type: 'ReadonlyArray<{ label: string; value: T }>', default: '-', description: 'List items' },
    { name: 'onSelect', type: '(item) => void', default: '-', description: 'Called when Enter is pressed' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Heading above the list' },
    { name: 'initialIndex', type: 'number', default: '0', description: 'Initially highlighted item' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether list accepts keyboard events' },
  ],
}
