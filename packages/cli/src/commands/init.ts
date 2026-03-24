import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { Command } from 'commander'
import { execa } from 'execa'
import pc from 'picocolors'

export interface InitOptions {
  cwd?: string
  force?: boolean
  git?: boolean
  install?: boolean
}

export interface InitResult {
  success: boolean
  projectDir: string
  packageManager?: string
}

const DEFAULT_COMPONENTS = ['spinner', 'badge', 'progress']

const STARTER_APP_TEMPLATE = `import { Box, render, Text } from 'ink'
import { ThemeProvider } from 'orizen-tui-core'
import React from 'react'
import { Spinner } from '../components/ui/orizen/spinner'
import { Badge } from '../components/ui/orizen/badge'
import { Progress } from '../components/ui/orizen/progress'

function App() {
  return (
    <ThemeProvider>
      <Box flexDirection="column" gap={1} padding={1}>
        <Spinner label="Loading" />
        <Badge variant="success">Ready</Badge>
        <Progress value={65} max={100} label="Progress" />
        <Text dimColor>Run npx orizen-tui add to add more!</Text>
      </Box>
    </ThemeProvider>
  )
}

render(<App />)
`

const TS_CONFIG = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
`

function DEFAULT_PACKAGE_JSON(name: string) {
  return `{
  "name": "${name}",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx src/index.tsx",
    "start": "tsx src/index.tsx",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "ink": "^5.0.1",
    "react": "^18.3.1",
    "orizen-tui-core": "latest",
    "yoga-layout-prebuilt": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^18.3.0",
    "tsx": "^4.19.0",
    "typescript": "^5.0.0"
  },
  "trustedDependencies": [
    "yoga-layout-prebuilt"
  ]
}
`
}

function README_TEMPLATE(projectName: string) {
  return `# ${projectName}

A terminal UI app built with [orizen-tui](https://github.com/paras-verma7454/orizen-tui).

## Setup

\`\`\`bash
# Choose your package manager
npm install
# or
pnpm install
# or
yarn install
# or
bun install
\`\`\`

## Run

\`\`\`bash
bun src/index.tsx
# or with bun run (if you prefer scripts)
bun run dev
\`\`\`

## Add More Components

\`\`\`bash
# Using npx (npm), bunx (bun), pnpm dlx, or yarn dlx
npx orizen-tui add <component-name>
\`\`\`

Available components: spinner, badge, progress, text-input, textarea, select, checkbox, list, table, timer, stopwatch, paginator, viewport, file-picker, confirm-input, number-input, multi-select, help
`
}

function detectPackageManager(cwd: string): 'bun' | 'pnpm' | 'yarn' | 'npm' {
  if (existsSync(resolve(cwd, 'bun.lock')) || existsSync(resolve(cwd, 'bun.lockb'))) {
    return 'bun'
  }
  if (existsSync(resolve(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm'
  }
  if (existsSync(resolve(cwd, 'yarn.lock'))) {
    return 'yarn'
  }
  return 'npm'
}

export async function executeInitCommand(
  projectName: string,
  options: InitOptions,
): Promise<InitResult> {
  const cwd = resolve(options.cwd ?? process.cwd())
  const projectDir = resolve(cwd, projectName)
  const force = Boolean(options.force)

  if (existsSync(projectDir) && !force) {
    throw new Error(`Directory "${projectName}" already exists. Use --force to overwrite.`)
  }

  console.log(`${pc.cyan('Creating project:')} ${projectName}`)

  mkdirSync(projectDir, { recursive: true })
  mkdirSync(resolve(projectDir, 'src'), { recursive: true })

  const packageJsonContent = DEFAULT_PACKAGE_JSON(projectName)
  writeFileSync(resolve(projectDir, 'package.json'), packageJsonContent, 'utf8')
  writeFileSync(resolve(projectDir, 'tsconfig.json'), TS_CONFIG, 'utf8')
  writeFileSync(resolve(projectDir, 'src', 'index.tsx'), STARTER_APP_TEMPLATE, 'utf8')
  writeFileSync(resolve(projectDir, 'README.md'), README_TEMPLATE(projectName), 'utf8')

  console.log(`${pc.green('✔')} Created package.json`)
  console.log(`${pc.green('✔')} Created tsconfig.json`)
  console.log(`${pc.green('✔')} Created src/index.tsx`)

  let packageManager: string | undefined

  if (options.install !== false) {
    packageManager = detectPackageManager(projectDir)
    const installCmd = packageManager === 'npm' ? 'npm install' : `${packageManager} install`

    console.log(`${pc.cyan('Installing dependencies with')} ${packageManager}...`)

    try {
      await execa(packageManager === 'npm' ? 'npm' : packageManager, packageManager === 'npm' ? ['install'] : ['install'], { cwd: projectDir, stdio: 'inherit' })
      console.log(`${pc.green('✔')} Dependencies installed`)
    }
    catch {
      console.log(`${pc.yellow('!')} Auto-install failed. Run manually: ${installCmd}`)
    }
  }

  console.log(`${pc.cyan('Scaffolding components with orizen-tui add...')}`)

  const dlxCommands: Record<string, string[]> = {
    npm: ['npx', 'orizen-tui'],
    bun: ['bunx', 'orizen-tui'],
    pnpm: ['pnpm', 'dlx', 'orizen-tui'],
    yarn: ['yarn', 'dlx', 'orizen-tui'],
  }

  const dlxCmd = dlxCommands[packageManager ?? 'npm'] ?? dlxCommands.npm

  try {
    await execa(dlxCmd[0], [...dlxCmd.slice(1), 'add', ...DEFAULT_COMPONENTS, '--cwd', projectDir, '--no-install'], {
      cwd: projectDir,
      stdio: 'inherit',
    })
    console.log(`${pc.green('✔')} Components scaffolded`)
  }
  catch {
    console.log(`${pc.yellow('!')} Failed to scaffold components. Run manually: npx orizen-tui add ${DEFAULT_COMPONENTS.join(' ')}`)
  }

  if (options.git !== false) {
    try {
      await execa('git', ['init'], { cwd: projectDir, stdio: 'ignore' })
      console.log(`${pc.green('✔')} Git initialized`)
    }
    catch {
      console.log(`${pc.yellow('!')} Git init skipped (not available)`)
    }
  }

  console.log('')
  console.log(pc.green('Project created successfully!'))
  console.log('')
  console.log('To run your app:')
  console.log(`  ${pc.cyan('cd')} ${projectName}`)
  console.log(`  ${pc.cyan('npm run dev')}`)
  console.log('')

  return {
    success: true,
    projectDir,
    packageManager,
  }
}

export function createInitCommand(): Command {
  return new Command('init')
    .description('Initialize a new Orizen TUI project')
    .argument('<project-name>', 'Name of the project to create')
    .option('--cwd <dir>', 'Parent directory to create project in', process.cwd())
    .option('--no-install', 'Skip dependency installation')
    .option('--no-git', 'Skip git initialization')
    .option('--force', 'Overwrite existing directory')
    .action(async (projectName: string, rawOptions: Partial<InitOptions>) => {
      try {
        await executeInitCommand(projectName, {
          cwd: rawOptions.cwd,
          force: rawOptions.force,
          git: rawOptions.git,
          install: rawOptions.install,
        })
      }
      catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        console.error(`${pc.red('Error:')} ${message}`)
        process.exit(1)
      }
    })
}
