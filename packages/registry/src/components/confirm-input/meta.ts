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
  examples: [
    {
      title: 'Usage',
      code: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { ConfirmInput } from '@/components/ui/orizen/confirm-input'

function Demo() {
  const [result, setResult] = useState<boolean | null>(null)

  return (
    <Box flexDirection="column" gap={2}>
      <Box gap={2}>
        <Text>Overwrite existing file?</Text>
        <ConfirmInput
          message="Overwrite existing file?"
          defaultAnswer="yes"
          onConfirm={setResult}
        />
      </Box>
      <Box gap={2}>
        <Text>Delete 3 files?</Text>
        <ConfirmInput
          message="Delete 3 files?"
          defaultAnswer="no"
          onConfirm={(answer) => console.log('Deleted:', answer)}
        />
      </Box>
    </Box>
  )
}

render(<Demo />)`,
    },
  ],
  props: [
    { name: 'message', type: 'string', default: '-', description: 'Question shown to the user' },
    { name: 'defaultAnswer', type: '\'yes\' | \'no\'', default: '\'yes\'', description: 'Pre-selected answer (shown capitalized)' },
    { name: 'onConfirm', type: '(answer: boolean) => void', default: '-', description: 'Called when Enter is pressed' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
  ],
}
