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
  demo: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { List } from '@/components/ui/orizen/list'

const fruits = [
  { label: 'Apple', value: 'apple', desc: 'Crisp and sweet' },
  { label: 'Banana', value: 'banana', desc: 'Rich in potassium' },
  { label: 'Cherry', value: 'cherry', desc: 'Stone fruit' },
  { label: 'Date', value: 'date', desc: 'Sweet and sticky' },
  { label: 'Elderberry', value: 'elderberry', desc: 'Immune booster' },
  { label: 'Fig', value: 'fig', desc: 'Soft and chewy' },
]

function Demo() {
  const [filter, setFilter] = useState('')

  return (
    <Box flexDirection="column" gap={3}>
      <Text bold>Filterable List</Text>
      
      <Box flexDirection="column" gap={1}>
        <Text dimColor>Type to filter (↑↓ navigate, Enter select):</Text>
        <List
          items={fruits}
          height={4}
          filter={filter}
          onSelect={(item) => console.log('Selected:', item.label)}
        />
      </Box>

      <Text bold>All Items</Text>
      <List
        items={fruits}
        height={5}
        onSelect={(item) => console.log('Picked:', item.label)}
      />

      <Text bold>Loading State</Text>
      <List items={[]} isLoading height={4} />
    </Box>
  )
}

render(<Demo />)`,
  props: [
    { name: 'items', type: 'ListItem[]', default: '—', description: 'Items to display' },
    { name: 'height', type: 'number', default: '8', description: 'Number of visible items' },
    { name: 'filter', type: 'string', default: '""', description: 'Case-insensitive filter string' },
    { name: 'onSelect', type: '(item: ListItem) => void', default: 'undefined', description: 'Called when Enter is pressed on an item' },
    { name: 'isLoading', type: 'boolean', default: 'false', description: 'Show loading spinner instead of items' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard input' },
  ],
}
