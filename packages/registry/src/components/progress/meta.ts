import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'progress',
  name: 'Progress',
  description: 'Horizontal progress bar with determinate and indeterminate modes.',
  category: 'feedback',
  usage: `import { Progress } from '@/components/ui/orizen/progress'

<Progress value={75} label="Uploading:" />
<Progress value={100} label="Done:" />
<Progress /> // indeterminate`,
  props: [
    { name: 'value', type: 'number', default: 'undefined', description: 'Current value (omit for indeterminate)' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
    { name: 'width', type: 'number', default: '40', description: 'Bar width in columns' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Label before the bar' },
    { name: 'showPercent', type: 'boolean', default: 'true', description: 'Show percentage after bar' },
  ],
}
