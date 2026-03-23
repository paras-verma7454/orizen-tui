import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'list',
  name: 'List',
  description: 'Filterable, paginated scrollable list with an integrated loading spinner.',
  category: 'display',
  usage: `import { List } from '@/components/ui/orizen/list'

const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

// Basic list
<List items={items} onSelect={(item) => console.log(item.value)} />

// With filter and custom height
<List items={items} filter="an" height={5} />

// Loading state
<List items={[]} isLoading />`,
  props: [
    { name: 'items', type: 'ListItem[]', default: '—', description: 'Items to display' },
    { name: 'height', type: 'number', default: '8', description: 'Number of visible items' },
    { name: 'filter', type: 'string', default: '""', description: 'Case-insensitive filter string' },
    { name: 'onSelect', type: '(item: ListItem) => void', default: 'undefined', description: 'Called when Enter is pressed on an item' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Show loading spinner instead of items' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard input' },
  ],
}
