import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'counter',
  name: 'Counter',
  description: 'Animated counter that auto-increments at a specified interval.',
  category: 'feedback',
  usage: `import { Counter } from '@/components/ui/orizen/counter'

render(<Counter />)`,
  examples: [
    {
      title: 'Basic Usage',
      code: `import React from 'react'
import { render } from 'ink'
import { Counter } from '@/components/ui/orizen/counter'

render(<Counter />)`,
    },
    {
      title: 'Custom Interval',
      code: `import React from 'react'
import { render } from 'ink'
import { Counter } from '@/components/ui/orizen/counter'

render(<Counter intervalMs={1000} />)`,
    },
    {
      title: 'Custom Color',
      code: `import React from 'react'
import { render } from 'ink'
import { Counter } from '@/components/ui/orizen/counter'

render(<Counter color="cyan" label="seconds" intervalMs={1000} />)`,
    },
  ],
  props: [
    { name: 'intervalMs', type: 'number', default: '100', description: 'Interval in ms between increments' },
    { name: 'label', type: 'string', default: '"tests passed"', description: 'Label shown after the counter value' },
    { name: 'color', type: 'string', default: '"green"', description: 'Text color' },
  ],
}
