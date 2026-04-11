import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'table',
  name: 'Table',
  description: 'Navigable data table with column alignment and scroll.',
  category: 'display',
  usage: `import React from 'react'
import { render, Box } from 'ink'
import { Table } from '@/components/ui/orizen/table'

const columns = [
  { key: 'name', label: 'Name', width: 12 },
  { key: 'version', label: 'Version', width: 10 },
  { key: 'license', label: 'License', width: 12 },
]

const data = [
  { name: 'react', version: '18.3.0', license: 'MIT' },
  { name: 'ink', version: '5.0.1', license: 'MIT' },
  { name: 'typescript', version: '5.4.5', license: 'Apache-2.0' },
]

function App() {
  return (
    <Box flexDirection="column" gap={1}>
      <Table columns={columns} data={data} height={5} />
    </Box>
  )
}

render(<App />)`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState, useEffect } from 'react'
import { Table } from '@/components/ui/orizen/table'

const columns = [
  { key: 'rank', label: 'Rank', width: 6 },
  { key: 'city', label: 'City', width: 20 },
  { key: 'country', label: 'Country', width: 12 },
  { key: 'pop', label: 'Population', width: 16, align: 'right' as const },
]

const rows = [
  { rank: '6', city: 'Mexico City', country: 'Mexico', pop: '22,085,140' },
  { rank: '7', city: 'Cairo', country: 'Egypt', pop: '21,750,020' },
  { rank: '8', city: 'Beijing', country: 'China', pop: '21,333,332' },
  { rank: '9', city: 'Mumbai', country: 'India', pop: '20,961,472' },
  { rank: '10', city: 'Osaka', country: 'Japan', pop: '19,059,856' },
  { rank: '11', city: 'Chongqing', country: 'China', pop: '16,874,740' },
  { rank: '12', city: 'Karachi', country: 'Pakistan', pop: '16,839,950' },
]

function Demo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Table
        columns={columns}
        data={rows}
        height={5}
      />
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
