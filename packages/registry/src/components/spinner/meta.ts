import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'spinner',
  name: 'Spinner',
  description: 'Animated terminal spinner with named presets and customizable frames.',
  category: 'feedback',
  usage: `import { Spinner } from '@/components/ui/orizen/spinner'

// Named presets
<Spinner preset="dots" label="Loading..." />
<Spinner preset="circle" label="Processing" />
<Spinner preset="bar" label="Building" />

// Custom frames (advanced)
<Spinner frames={['-', '\\\\', '|', '/']} label="Processing" />`,
  props: [
    { name: 'label', type: 'string', default: 'undefined', description: 'Text shown after the spinner frame' },
    { name: 'preset', type: '"dots" | "circle" | "bar"', default: 'undefined', description: 'Named spinner style for common presets' },
    { name: 'frames', type: 'string[]', default: 'theme spinner', description: 'Custom animation frames (overrides preset/theme)' },
    { name: 'intervalMs', type: 'number', default: '80', description: 'Frame advance interval in ms' },
  ],
}
