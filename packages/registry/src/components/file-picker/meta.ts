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
