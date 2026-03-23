import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'stopwatch',
  name: 'Stopwatch',
  description: 'Count-up elapsed time tracker with pause support.',
  category: 'feedback',
  usage: `import { Stopwatch } from '@/components/ui/orizen/stopwatch'

// Running stopwatch
<Stopwatch />

// Paused stopwatch with label
<Stopwatch running={false} label="Elapsed:" />`,
  props: [
    { name: 'running', type: 'boolean', default: 'true', description: 'Whether the stopwatch is counting up' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Text shown before the elapsed time' },
  ],
}
