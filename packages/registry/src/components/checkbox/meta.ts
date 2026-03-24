import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'checkbox',
  name: 'Checkbox',
  description: 'Arrow-key navigable list of toggleable boolean items.',
  category: 'input',
  usage: `import { useState } from 'react'
import { Checkbox } from '@/components/ui/orizen/checkbox'

const [selected, setSelected] = useState<string[]>(['typescript'])

<Checkbox
  label="Select features:"
  items={[
    { label: 'TypeScript', value: 'typescript' },
    { label: 'ESLint', value: 'eslint' },
    { label: 'Prettier', value: 'prettier' },
  ]}
  value={selected}
  onChange={setSelected}
/>`,
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/orizen/checkbox'

const techItems = [
  { label: 'TypeScript', value: 'ts' },
  { label: 'ESLint', value: 'eslint' },
  { label: 'Prettier', value: 'prettier' },
  { label: 'Vitest', value: 'vitest' },
]

const projectItems = [
  { label: 'Run tests', value: 'test' },
  { label: 'Build', value: 'build' },
  { label: 'Deploy', value: 'deploy' },
]

function Demo() {
  const [tech, setTech] = useState<string[]>(['ts'])
  const [tasks, setTasks] = useState<string[]>([])

  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Checkboxes</Text>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Technologies (↑↓ navigate, Space toggle):</Text>
        <Checkbox
          label=""
          items={techItems}
          value={tech}
          onChange={setTech}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Build Tasks:</Text>
        <Checkbox
          label=""
          items={projectItems}
          value={tasks}
          onChange={setTasks}
        />
      </Box>

      <Text dimColor>Selected: {tech.join(', ') || 'none'}</Text>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'items', type: 'Array<{ label: string; value: string }>', default: '-', description: 'List of toggleable items' },
    { name: 'value', type: 'string[]', default: '[]', description: 'Array of selected values' },
    { name: 'onChange', type: '(values: string[]) => void', default: '-', description: 'Called when an item is toggled' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Heading above the list' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether list accepts keyboard events' },
  ],
}
