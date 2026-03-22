import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'badge',
  name: 'Badge',
  description: 'Inline colored label with semantic variants driven by the theme.',
  category: 'display',
  usage: `import { Badge } from '@/components/ui/orizen/badge'

<Badge variant="default">v1.0.0</Badge>
<Badge variant="success">Deployed</Badge>
<Badge variant="error">Failed</Badge>`,
  props: [
    { name: 'variant', type: '\'default\' | \'success\' | \'warning\' | \'error\' | \'info\'', default: '\'default\'', description: 'Visual variant' },
    { name: 'children', type: 'React.ReactNode', default: '-', description: 'Badge content' },
  ],
}
