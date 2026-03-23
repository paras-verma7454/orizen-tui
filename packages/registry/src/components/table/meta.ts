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
  props: [
    { name: 'columns', type: 'TableColumn[]', default: '—', description: 'Column definitions (key, label, width, align)' },
    { name: 'data', type: 'Record<string, string>[]', default: '—', description: 'Row data array' },
    { name: 'height', type: 'number', default: '10', description: 'Number of visible data rows' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard navigation' },
  ],
}
