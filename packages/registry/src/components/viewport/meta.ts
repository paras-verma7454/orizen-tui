import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'viewport',
  name: 'Viewport',
  description: 'Scrollable content area with overflow indicators and keyboard navigation.',
  category: 'display',
  usage: `import { Viewport } from '@/components/ui/orizen/viewport'

const lines = Array.from({ length: 50 }, (_, i) => \`Line \${i + 1}\`)

// Basic scrollable viewport
<Viewport lines={lines} height={10} />

// Fixed width, no indicators
<Viewport lines={lines} height={8} width={60} showScrollIndicator={false} />`,
  props: [
    { name: 'lines', type: 'string[]', default: '—', description: 'Lines of text to render' },
    { name: 'height', type: 'number', default: '—', description: 'Number of visible lines' },
    { name: 'width', type: 'number', default: 'undefined', description: 'Fixed column width (optional)' },
    { name: 'showScrollIndicator', type: 'boolean', default: 'true', description: 'Show ↑/↓ overflow indicators' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether to accept keyboard scroll input' },
  ],
}
