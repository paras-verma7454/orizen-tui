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
  demo: `import { Box, Text, render } from 'ink'
import React, { useState } from 'react'
import { ConfirmInput } from '@/components/ui/orizen/confirm-input'

function Demo() {
  const [result, setResult] = useState<boolean | null>(null)

  return (
    <Box flexDirection="column" gap={3}>
      <Text bold>Confirm Inputs</Text>
      
      <Box flexDirection="column">
        <Text dimColor>Default yes:</Text>
        {result === null
          ? <ConfirmInput
              message="Save changes?"
              defaultAnswer="yes"
              onConfirm={setResult}
            />
          : <Text>Answer: <Text color={result ? 'green' : 'red'}>{result ? 'yes' : 'no'}</Text></Text>
        }
      </Box>

      <Box flexDirection="column">
        <Text dimColor>Default no:</Text>
        <ConfirmInput
          message="Delete file?"
          defaultAnswer="no"
          onConfirm={(answer) => console.log('Delete:', answer)}
        />
      </Box>

      <Box flexDirection="column">
        <Text dimColor>With warning:</Text>
        <ConfirmInput
          message="This action cannot be undone. Continue?"
          defaultAnswer="no"
          onConfirm={(answer) => console.log('Confirmed:', answer)}
        />
      </Box>
    </Box>
  )
}

render(<Demo />)`,
  props: [
    { name: 'message', type: 'string', default: '-', description: 'Question shown to the user' },
    { name: 'defaultAnswer', type: '\'yes\' | \'no\'', default: '\'yes\'', description: 'Pre-selected answer (shown capitalized)' },
    { name: 'onConfirm', type: '(answer: boolean) => void', default: '-', description: 'Called when Enter is pressed' },
    { name: 'focus', type: 'boolean', default: 'true', description: 'Whether input accepts keyboard events' },
  ],
}
