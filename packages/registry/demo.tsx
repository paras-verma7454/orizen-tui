import { Box, render, Text } from 'ink'
import { ThemeProvider } from 'orizen-tui-core'
import React, { useEffect, useState } from 'react'
import { Badge } from './src/components/badge/index.js'
import { Progress } from './src/components/progress/index.js'
import { Spinner } from './src/components/spinner/index.js'

function Main(): JSX.Element {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => (p < 100 ? p + 2 : 100))
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1} borderStyle="round" borderColor="cyan" minWidth={60}>
      <Box marginBottom={1} justifyContent="center" width="100%">
        <Text bold color="yellow">
          Orizen-TUI Component Gallery
        </Text>
      </Box>

      <Box flexDirection="column" paddingX={1} gap={1} width="100%">
        <Box gap={2} alignItems="center">
          <Badge variant="info">STATUS</Badge>
          {progress < 100
            ? (
                <Box gap={1}>
                  <Spinner />
                  <Text>Running builds...</Text>
                </Box>
              )
            : (
                <Text color="green">Builds completed!</Text>
              )}
        </Box>

        <Box flexDirection="column">
          <Box gap={1}>
            <Badge variant="warning">BUILDING</Badge>
            <Text>@orizen-tui/registry</Text>
          </Box>
          <Progress value={progress} label="Compilation:" width={30} />
        </Box>

        <Box gap={1} marginTop={1}>
          <Badge variant="success">SUCCESS</Badge>
          <Badge variant="error">ERROR: 0</Badge>
          <Badge variant="default">TUI: 0.1.0</Badge>
        </Box>
      </Box>

      <Box marginTop={1} justifyContent="center" width="100%">
        <Text italic color="gray">Ctrl+C to stop demo</Text>
      </Box>
    </Box>
  )
}

function Demo(): JSX.Element {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  )
}

render(<Demo />)
