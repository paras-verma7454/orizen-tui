import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'timer',
  name: 'Timer',
  description: 'Countdown timer with configurable duration and expiry callback.',
  category: 'feedback',
  usage: `import { Timer } from '@/components/ui/orizen/timer'

// Basic countdown from 60 seconds
<Timer durationMs={60000} />

// With label and expiry callback
<Timer
  durationMs={30000}
  label="Time remaining:"
  onExpire={() => console.log('Time is up!')}
/>`,
  props: [
    { name: 'durationMs', type: 'number', default: '—', description: 'Countdown duration in milliseconds' },
    { name: 'label', type: 'string', default: 'undefined', description: 'Text shown before the time display' },
    { name: 'onExpire', type: '() => void', default: 'undefined', description: 'Callback fired when countdown reaches zero' },
  ],
}
