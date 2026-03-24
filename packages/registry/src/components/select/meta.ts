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
  demo: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { Select } from '@/components/ui/orizen/select'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Angular', value: 'angular' },
]

const colors = [
  { label: 'Cyan (default)', value: 'cyan' },
  { label: 'Magenta', value: 'magenta' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Green', value: 'green' },
]

function Demo() {
  const [framework, setFramework] = useState('')
  const [color, setColor] = useState('cyan')

  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Select Components (↑↓ navigate, Enter select)</Text>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Pick a framework:</Text>
        <Select
          items={frameworks}
          onSelect={(item) => setFramework(item.value)}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>Choose theme color:</Text>
        <Select
          items={colors}
          initialIndex={0}
          onSelect={(item) => setColor(item.value)}
        />
      </Box>

      <Text dimColor>Selected: {framework || 'none'}</Text>
    </Box>
  )
}

render(<Demo />)`,
  props: [
    { name: 'items', type: 'ReadonlyArray<{ label: string; value: T }>', default: '-', description: 'List items' },
    { name: 'onSelect', type: '(item) => void', default: '-', description: 'Called when Enter is pressed' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Heading above the list' },
    { name: 'initialIndex', type: 'number', default: '0', description: 'Initially highlighted item' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether list accepts keyboard events' },
  ],
}
