import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'file-picker',
  name: 'FilePicker',
  description: 'Directory navigator with extension filtering and keyboard navigation.',
  category: 'input',
  usage: `import { FilePicker } from '@/components/ui/orizen/file-picker'

// Basic file picker starting in current directory
<FilePicker onSelect={(entry) => console.log(entry.path)} />

// Filtered to TypeScript files only
<FilePicker
  initialDir="/src"
  extensions={['.ts', '.tsx']}
  onSelect={(entry) => console.log(entry.path)}
  onCancel={() => process.exit(0)}
/>`,
  demo: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { FilePicker } from '@/components/ui/orizen/file-picker'

// Mock file entries for demo
const mockEntries = [
  { name: 'src', isDir: true, path: './src' },
  { name: 'dist', isDir: true, path: './dist' },
  { name: 'package.json', isDir: false, path: './package.json' },
  { name: 'tsconfig.json', isDir: false, path: './tsconfig.json' },
  { name: 'README.md', isDir: false, path: './README.md' },
]

function Demo() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <Box flexDirection="column" gap={3}>
      <Text bold>File Picker</Text>
      
      <Box flexDirection="column">
        <Text dimColor>Pick a file (↑↓ to navigate, Enter to select):</Text>
        <FilePicker
          height={6}
          onSelect={(entry) => setSelected(entry.path)}
          onCancel={() => process.exit(0)}
        />
      </Box>

      {selected && (
        <Text>Selected: <Text color="cyan">{selected}</Text></Text>
      )}

      <Text bold>With Extension Filter (.json)</Text>
      <FilePicker
        extensions={['.json']}
        height={5}
        onSelect={(entry) => console.log('Selected:', entry.path)}
      />
    </Box>
  )
}

render(<Demo />)`,
  props: [
    { name: 'initialDir', type: 'string', default: '"."', description: 'Directory to open on mount' },
    { name: 'extensions', type: 'string[]', default: 'undefined', description: 'File extension filter e.g. [".ts", ".tsx"]' },
    { name: 'onSelect', type: '(entry: FileEntry) => void', default: 'undefined', description: 'Called when a file is selected' },
    { name: 'onCancel', type: '() => void', default: 'undefined', description: 'Called when Escape is pressed' },
    { name: 'height', type: 'number', default: '10', description: 'Number of visible directory entries' },
    { name: 'readDir', type: '(dir: string) => Promise<FileEntry[]>', default: 'undefined', description: 'Custom directory reader (useful for testing)' },
    { name: 'joinPath', type: '(base: string, name: string) => string', default: 'undefined', description: 'Custom path join function' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard input' },
  ],
}
