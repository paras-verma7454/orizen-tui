import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'table',
  name: 'Table',
  description: 'Navigable data table with column alignment and scroll.',
  category: 'display',
  usage: `import { Table } from '@/components/ui/orizen/table'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'version', label: 'Version', align: 'right' },
  { key: 'license', label: 'License' },
]

const data = [
  { name: 'react', version: '18.3.0', license: 'MIT' },
  { name: 'ink', version: '5.0.1', license: 'MIT' },
  { name: 'typescript', version: '5.4.5', license: 'Apache-2.0' },
]

<Table columns={columns} data={data} height={5} />`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React from 'react'
import { Table } from '@/components/ui/orizen/table'

const packageColumns = [
  { key: 'name', label: 'Package', width: 16 },
  { key: 'version', label: 'Version', width: 10 },
  { key: 'status', label: 'Status', width: 10 },
]

const packages = [
  { name: 'react', version: '18.3.1', status: '✓' },
  { name: 'ink', version: '5.0.1', status: '✓' },
  { name: 'typescript', version: '5.4.5', status: '✓' },
  { name: 'vitest', version: '1.6.0', status: '✓' },
  { name: 'eslint', version: '9.0.0', status: '⚠' },
]

const cityColumns = [
  { key: 'rank', label: '#', width: 4 },
  { key: 'city', label: 'City', width: 18 },
  { key: 'country', label: 'Country', width: 12 },
  { key: 'pop', label: 'Population', width: 14, align: 'right' },
]

const cities = [
  { rank: '1', city: 'Tokyo', country: 'Japan', pop: '37M' },
  { rank: '2', city: 'Delhi', country: 'India', pop: '31M' },
  { rank: '3', city: 'Shanghai', country: 'China', pop: '28M' },
  { rank: '4', city: 'Sao Paulo', country: 'Brazil', pop: '22M' },
  { rank: '5', city: 'Mexico City', country: 'Mexico', pop: '22M' },
]

function Demo() {
  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Data Tables</Text>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Package Versions (↑↓ to scroll):</Text>
        <Table
          columns={packageColumns}
          data={packages}
          height={4}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>City Populations:</Text>
        <Table
          columns={cityColumns}
          data={cities}
          height={5}
        />
      </Box>

      <Text dimColor>Tables support keyboard navigation and custom column widths.</Text>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'columns', type: 'TableColumn[]', default: '—', description: 'Column definitions (key, label, width, align)' },
    { name: 'data', type: 'Record<string, string>[]', default: '—', description: 'Row data array' },
    { name: 'height', type: 'number', default: '10', description: 'Number of visible data rows' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard navigation' },
  ],
}
