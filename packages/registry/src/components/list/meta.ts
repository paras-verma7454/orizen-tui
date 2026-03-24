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
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React from 'react'
import { List } from '@/components/ui/orizen/list'

const items = [
  { label: 'Pocky', value: 'pocky', desc: 'Expensive' },
  { label: 'Ginger', value: 'ginger', desc: 'Exquisite' },
  { label: 'Plantains', value: 'plantains', desc: 'Questionable' },
  { label: 'Honey Dew', value: 'honey-dew', desc: 'Delectable' },
  { label: 'Pineapple', value: 'pineapple', desc: 'Kind of spicy' },
]

function Demo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Box>
        <Text bold>Groceries</Text>
        <Text dimColor> 72 items</Text>
      </Box>
      <List
        items={items}
        height={5}
        onSelect={(item) => console.log('Selected:', item.label)}
      />
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'items', type: 'ListItem[]', default: '—', description: 'Items to display' },
    { name: 'height', type: 'number', default: '8', description: 'Number of visible items' },
    { name: 'filter', type: 'string', default: '""', description: 'Case-insensitive filter string' },
    { name: 'onSelect', type: '(item: ListItem) => void', default: 'undefined', description: 'Called when Enter is pressed on an item' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Show loading spinner instead of items' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard input' },
  ],
}
