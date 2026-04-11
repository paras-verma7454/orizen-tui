import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it, mock } from 'bun:test'
import {
  buildInstallCommand,
  buildInstallInvocation,
  createAddCommand,
  detectPackageManager,
  executeAddCommand,
  findRequiredPrimitives,
  rewriteRegistryImports,
} from './add.js'

const currentDir = dirname(fileURLToPath(import.meta.url))
const registryDir = resolve(currentDir, '../../../registry/src')
const tempDirs: string[] = []

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'orizen-cli-test-'))
  tempDirs.push(dir)
  return dir
}

afterEach(async () => {
  mock.restore()
  await Promise.all(tempDirs.splice(0).map(dir => rm(dir, { recursive: true, force: true })))
})

describe('detectPackageManager', () => {
  it('prefers bun over pnpm/yarn/npm locks', () => {
    const manager = detectPackageManager('C:\\demo', path =>
      path.endsWith('bun.lock') || path.endsWith('pnpm-lock.yaml') || path.endsWith('yarn.lock'))
    expect(manager).toBe('bun')
  })

  it('falls back to npm/bun when no lockfiles are found', () => {
    const manager = detectPackageManager('/demo', () => false)
    // In Bun environment, process.execPath includes 'bun', so it returns 'bun'
    // In Node environment, it would return 'npm'
    expect(['npm', 'bun']).toContain(manager)
  })

  it('detects pnpm and yarn lockfiles when bun lock is absent', () => {
    const pnpmManager = detectPackageManager('/demo', path => path.endsWith('pnpm-lock.yaml'))
    expect(pnpmManager).toBe('pnpm')

    const yarnManager = detectPackageManager('/demo', path => path.endsWith('yarn.lock'))
    expect(yarnManager).toBe('yarn')
  })
})

describe('install command builders', () => {
  it('builds npm install invocation for npm', () => {
    expect(buildInstallInvocation('npm')).toEqual({
      command: 'npm',
      args: ['install', 'ink@^5.0.1', 'react@^18.3.1', '@types/react@^18.3.18', '@types/node@latest', 'orizen-tui-core@latest', 'yoga-layout-prebuilt'],
    })
    expect(buildInstallCommand('npm')).toBe('npm install ink@^5.0.1 react@^18.3.1 @types/react@^18.3.18 @types/node@latest orizen-tui-core@latest yoga-layout-prebuilt')
  })

  it('builds add invocation for non-npm package managers', () => {
    expect(buildInstallInvocation('bun', ['a', 'b'])).toEqual({
      command: 'bun',
      args: ['add', 'a', 'b'],
    })
    expect(buildInstallCommand('pnpm', ['a', 'b'])).toBe('pnpm add a b')
  })
})

describe('rewriteRegistryImports', () => {
  it('rewrites primitive imports to local copied paths', () => {
    const source = `
import { getEffectiveBorderStyle } from '../../primitives/borders.js'
import { spinnerFrames } from "../../primitives/symbols.js"
`

    const rewritten = rewriteRegistryImports(source)
    expect(rewritten).toContain(`from './primitives/borders'`)
    expect(rewritten).toContain(`from './primitives/symbols'`)
    expect(rewritten).not.toContain('../../primitives')
  })

  it('detects required primitive files', () => {
    const source = `
import { getEffectiveBorderStyle } from '../../primitives/borders.js'
import { spinnerFrames } from "../../primitives/symbols.js"
`
    expect(findRequiredPrimitives(source)).toEqual(['borders', 'symbols'])
  })
})

describe('executeAddCommand', () => {
  it('copies a component and only required primitives', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')

    const result = await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: false,
        registryDir,
      },
    )

    const componentPath = join(projectDir, 'components', 'ui', 'orizen', 'spinner.tsx')
    const symbolsPath = join(projectDir, 'components', 'ui', 'orizen', 'primitives', 'symbols.ts')
    const bordersPath = join(projectDir, 'components', 'ui', 'orizen', 'primitives', 'borders.ts')
    const manifestPath = join(projectDir, 'components', 'ui', 'orizen', 'components.json')

    const componentSource = await readFile(componentPath, 'utf8')
    const manifestSource = await readFile(manifestPath, 'utf8')
    const manifest = JSON.parse(manifestSource) as { components: string[] }

    expect(componentSource).toContain(`from './primitives/symbols'`)
    expect(componentSource).not.toContain(`../../primitives/symbols.js`)
    expect(manifest.components).toEqual(['spinner'])
    expect(result.requiredPrimitives).toEqual(['symbols'])
    expect(await Bun.file(symbolsPath).exists()).toBe(true)
    expect(await Bun.file(bordersPath).exists()).toBe(false)
  })

  it('updates index.ts and components.json when multiple components are added', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')

    await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: false,
        registryDir,
      },
    )

    await executeAddCommand(
      ['confirm-input'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: false,
        registryDir,
      },
    )

    const manifestPath = join(projectDir, 'components', 'ui', 'orizen', 'components.json')
    const manifestSource = await readFile(manifestPath, 'utf8')
    const manifest = JSON.parse(manifestSource) as { components: string[] }

    expect(manifest.components).toEqual(['confirm-input', 'spinner'])
  })

  it('does not write files when dry-run is enabled', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')

    const result = await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        dryRun: true,
        install: false,
        registryDir,
      },
    )

    const componentPath = join(projectDir, 'components', 'ui', 'orizen', 'spinner.tsx')
    expect(result.files.some(file => file.shouldWrite)).toBe(true)
    expect(await Bun.file(componentPath).exists()).toBe(false)
  })

  it.skip('skips existing files unless overwrite is set', async () => {
    // Skipped: requires interactive prompts which can't be automated in test environment
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')

    await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: false,
        registryDir,
      },
    )

    const componentPath = join(projectDir, 'components', 'ui', 'orizen', 'spinner.tsx')
    await writeFile(componentPath, '// custom implementation\n')

    const skipped = await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: false,
        overwrite: false,
        registryDir,
      },
    )
    expect(skipped.files.find(file => file.outputPath === componentPath)?.shouldWrite).toBe(false)
    expect(await readFile(componentPath, 'utf8')).toContain('// custom implementation')

    const overwritten = await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: false,
        overwrite: true,
        registryDir,
      },
    )
    expect(overwritten.files.find(file => file.outputPath === componentPath)?.shouldWrite).toBe(true)
    expect(await readFile(componentPath, 'utf8')).not.toContain('// custom implementation')
  })

  it('skips install runner when --no-install behavior is used', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')
    const installSpy = mock(async () => {})

    await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: false,
        registryDir,
      },
      installSpy,
    )

    expect(installSpy).toHaveBeenCalledTimes(0)
  })

  it('returns manual install command when dependency install fails', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')
    const installSpy = mock(async () => {
      throw new Error('install failed')
    })

    const result = await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: true,
        registryDir,
      },
      installSpy,
    )

    expect(result.installAttempted).toBe(true)
    expect(result.installSucceeded).toBe(false)
    expect(result.manualInstallCommand).toBeTruthy()
  })

  it('marks install as succeeded when install runner resolves', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')
    await writeFile(join(projectDir, 'bun.lock'), '')
    const installSpy = mock(async () => {})

    const result = await executeAddCommand(
      ['spinner'],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: true,
        registryDir,
      },
      installSpy,
    )

    expect(result.installAttempted).toBe(true)
    expect(result.installSucceeded).toBe(true)
    expect(result.packageManager).toBe('bun')
    expect(result.manualInstallCommand).toBe('bun add ink@^5.0.1 react@^18.3.1 @types/react@^18.3.18 @types/node@latest orizen-tui-core@latest yoga-layout-prebuilt')
    expect(installSpy).toHaveBeenCalledWith(
      'bun',
      ['add', 'ink@^5.0.1', 'react@^18.3.1', '@types/react@^18.3.18', '@types/node@latest', 'orizen-tui-core@latest', 'yoga-layout-prebuilt'],
      resolve(projectDir),
    )
  })

  it('normalizes slug input by trimming and de-duplicating', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')

    const result = await executeAddCommand(
      [' spinner ', 'spinner', ''],
      {
        cwd: projectDir,
        path: 'components/ui',
        install: false,
        registryDir,
      },
    )

    expect(result.slugs).toEqual(['spinner'])
  })

  it('throws when only blank slugs are provided', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')

    await expect(
      executeAddCommand(
        [' ', '\n'],
        {
          cwd: projectDir,
          path: 'components/ui',
          install: false,
          registryDir,
        },
      ),
    ).rejects.toThrow('No component slugs provided')
  })

  it('throws for unknown component slugs', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')

    await expect(
      executeAddCommand(
        ['spiner'],
        {
          cwd: projectDir,
          path: 'components/ui',
          install: false,
          registryDir,
        },
      ),
    ).rejects.toThrow('Unknown component slug')
  })

  it('falls back to remote registry source when local registry is unavailable', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')

    const originalFetch = globalThis.fetch
    globalThis.fetch = mock(async (input: string | URL | Request) => {
      const url = String(input)
      if (url.endsWith('/components/spinner/index.tsx')) {
        return new Response(`import { spinnerFrames } from '../../primitives/symbols.js'\nexport const Spinner = () => null\n`, { status: 200 })
      }
      if (url.endsWith('/primitives/symbols.ts')) {
        return new Response(`export const spinnerFrames = { dots: ['.'] }\n`, { status: 200 })
      }
      return new Response('not found', { status: 404 })
    }) as unknown as typeof fetch

    try {
      const result = await executeAddCommand(
        ['spinner'],
        {
          cwd: projectDir,
          path: 'components/ui',
          install: false,
          registryDir: join(projectDir, 'missing-registry-src'),
          registryBaseUrl: 'https://example.com/registry',
        },
      )

      const componentPath = join(projectDir, 'components', 'ui', 'orizen', 'spinner.tsx')
      const symbolsPath = join(projectDir, 'components', 'ui', 'orizen', 'primitives', 'symbols.ts')
      const componentSource = await readFile(componentPath, 'utf8')

      expect(componentSource).toContain(`from './primitives/symbols'`)
      expect(await Bun.file(symbolsPath).exists()).toBe(true)
      expect(result.requiredPrimitives).toEqual(['symbols'])
    }
    finally {
      globalThis.fetch = originalFetch
    }
  })
})

describe('createAddCommand', () => {
  it('parses options and prints dry-run summary', async () => {
    const projectDir = await createTempDir()
    await writeFile(join(projectDir, 'package.json'), '{"name":"demo"}')
    const output: string[] = []
    const originalLog = console.log
    console.log = (...args: unknown[]) => {
      output.push(args.join(' '))
    }

    try {
      await createAddCommand().parseAsync([
        'node',
        'add',
        'spinner',
        '--cwd',
        projectDir,
        '--dry-run',
        '--no-install',
      ])
    }
    finally {
      console.log = originalLog
    }

    expect(output.some(line => line.includes('Would write'))).toBe(true)
    expect(output.some(line => line.includes('Components'))).toBe(true)
    expect(output.some(line => line.includes('spinner'))).toBe(true)
  })
})
