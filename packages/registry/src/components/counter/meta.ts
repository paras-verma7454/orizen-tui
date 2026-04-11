import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'counter',
  name: 'Counter',
  description: 'Display component for numeric values. User provides the increment logic.',
  category: 'feedback',
  usage: `import React, { useState, useEffect } from 'react'
import { render } from 'ink'
import { Counter } from '@/components/ui/orizen/counter'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCount(c => c + 1), 100)
    return () => clearInterval(timer)
  }, [])

  return <Counter value={count} onChange={setCount} />
}

render(<App />)`,
  examples: [
    {
      title: 'Basic Usage',
      code: `import React, { useState, useEffect } from 'react'
import { render } from 'ink'
import { Counter } from '@/components/ui/orizen/counter'

const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setInterval(() => setCount(c => c + 1), 100)
  return () => clearInterval(timer)
}, [])

render(<Counter value={count} onChange={setCount} />)`,
    },
    {
      title: 'Custom Label',
      code: `import React, { useState, useEffect } from 'react'
import { render } from 'ink'
import { Counter } from '@/components/ui/orizen/counter'

const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(timer)
}, [])

render(<Counter value={count} onChange={setCount} label="seconds" />)`,
    },
    {
      title: 'Custom Color',
      code: `import React, { useState, useEffect } from 'react'
import { render } from 'ink'
import { Counter } from '@/components/ui/orizen/counter'

const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(timer)
}, [])

render(<Counter value={count} onChange={setCount} color="cyan" label="seconds" />)`,
    },
  ],
  props: [
    { name: 'value', type: 'number', default: '-', description: 'Current value (controlled mode)' },
    { name: 'onChange', type: '(value: number) => void', default: '-', description: 'Callback fired when value changes' },
    { name: 'defaultValue', type: 'number', default: '0', description: 'Initial value for uncontrolled mode' },
    { name: 'label', type: 'string', default: '"count"', description: 'Label shown after the counter value' },
    { name: 'color', type: 'string', default: '"green"', description: 'Text color' },
    { name: 'focus', type: 'boolean', default: 'false', description: 'Focus state (makes text bold)' },
  ],
}