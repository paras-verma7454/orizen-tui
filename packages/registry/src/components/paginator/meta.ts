import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'paginator',
  name: 'Paginator',
  description: 'Dot-style or numeric page navigation indicator.',
  category: 'display',
  usage: `import { Paginator } from '@/components/ui/orizen/paginator'

// Dot style (default)
<Paginator total={5} current={2} />

// Numeric style
<Paginator total={10} current={3} variant="numeric" />

// Custom dots
<Paginator total={4} current={1} activeDot="◆" inactiveDot="◇" />`,
  demo: `import { Box, Text, render } from 'ink'
import React, { useState, useEffect } from 'react'
import { Paginator } from '@/components/ui/orizen/paginator'

function Demo() {
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setPage(p => (p >= 5 ? 1 : p + 1))
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box flexDirection="column" gap={4}>
      <Text bold>Paginator Variants</Text>

      <Box flexDirection="column" gap={2}>
        <Text dimColor>Dots (default):</Text>
        <Paginator total={5} current={page} variant="dots" />
      </Box>

      <Box flexDirection="column" gap={2}>
        <Text dimColor>Numeric:</Text>
        <Paginator total={5} current={page} variant="numeric" />
      </Box>

      <Text bold>Custom Dots</Text>
      <Box gap={4}>
        <Box flexDirection="column" gap={1}>
          <Paginator total={4} current={2} activeDot="◆" inactiveDot="◇" />
        </Box>
        <Box flexDirection="column" gap={1}>
          <Paginator total={4} current={3} activeDot="▮" inactiveDot="▯" />
        </Box>
        <Box flexDirection="column" gap={1}>
          <Paginator total={4} current={1} activeDot="◉" inactiveDot="○" />
        </Box>
      </Box>

      <Text bold>Many Pages</Text>
      <Paginator total={10} current={7} variant="numeric" />
    </Box>
  )
}

render(<Demo />)`,
  props: [
    { name: 'total', type: 'number', default: '—', description: 'Total number of pages' },
    { name: 'current', type: 'number', default: '—', description: 'Current page (1-based)' },
    { name: 'variant', type: '"dots" | "numeric"', default: '"dots"', description: 'Visual style' },
    { name: 'activeDot', type: 'string', default: '"●"', description: 'Character for the active page dot' },
    { name: 'inactiveDot', type: 'string', default: '"○"', description: 'Character for inactive page dots' },
  ],
}
