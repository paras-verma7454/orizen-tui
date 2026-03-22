import type { ComponentDocsMeta } from '../../docs/types.js'

export const meta: ComponentDocsMeta = {
  slug: 'confirm-input',
  name: 'ConfirmInput',
  description: 'Inline y/n confirmation prompt with configurable default answer.',
  category: 'input',
  usage: `import { ConfirmInput } from '@/components/ui/orizen/confirm-input'

<ConfirmInput
  message="Overwrite existing file?"
  defaultAnswer="yes"
  onConfirm={(answer) => {
    if (answer) overwriteFile()
  }}
/>`,
  props: [
    { name: 'message', type: 'string', default: '-', description: 'Question shown to the user' },
    { name: 'defaultAnswer', type: '\'yes\' | \'no\'', default: '\'yes\'', description: 'Pre-selected answer (shown capitalized)' },
    { name: 'onConfirm', type: '(answer: boolean) => void', default: '-', description: 'Called when Enter is pressed' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
  ],
}
