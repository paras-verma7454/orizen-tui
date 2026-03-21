import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'
import pc from 'picocolors'
import { Command } from 'commander'

export type PackageManager = 'bun' | 'pnpm' | 'yarn' | 'npm'
export type PrimitiveName = 'borders' | 'symbols'

const PRIMITIVE_IMPORT_RE = /from ['"]\.\.\/\.\.\/primitives\/(borders|symbols)\.js['"]/g
const REQUIRED_DEPENDENCIES = ['ink', 'react', '@orizen-tui/core'] as const

export interface AddCommandOptions {
  path: string
  cwd?: string
  dryRun?: boolean
  install?: boolean
  overwrite?: boolean
  registryDir?: string
}

export interface PlannedFile {
  type: 'component' | 'primitive'
  slug: string
  sourcePath: string
  outputPath: string
  content: string
  shouldWrite: boolean
}

export interface AddExecutionResult {
  cwd: string
  targetPath: string
  slugs: string[]
  files: PlannedFile[]
  requiredPrimitives: PrimitiveName[]
  installAttempted: boolean
  installSucceeded: boolean
  packageManager?: PackageManager
  manualInstallCommand?: string
}

type InstallRunner = (command: string, args: string[], cwd: string) => Promise<void>

export function rewriteRegistryImports(source: string): string {
  return source.replace(PRIMITIVE_IMPORT_RE, (_full, primitive: PrimitiveName) => {
    return `from './primitives/${primitive}'`
  })
}

export function findRequiredPrimitives(source: string): PrimitiveName[] {
  const primitives = new Set<PrimitiveName>()
  for (const match of source.matchAll(PRIMITIVE_IMPORT_RE)) {
    primitives.add(match[1] as PrimitiveName)
  }

  return [...primitives].sort()
}

export function detectPackageManager(cwd: string, fileExists: (path: string) => boolean = existsSync): PackageManager {
  if (fileExists(join(cwd, 'bun.lock')) || fileExists(join(cwd, 'bun.lockb')))
    return 'bun'
  if (fileExists(join(cwd, 'pnpm-lock.yaml')))
    return 'pnpm'
  if (fileExists(join(cwd, 'yarn.lock')))
    return 'yarn'
  return 'npm'
}

export function buildInstallInvocation(
  packageManager: PackageManager,
  dependencies: readonly string[] = REQUIRED_DEPENDENCIES,
): { command: string, args: string[] } {
  if (packageManager === 'npm') {
    return { command: 'npm', args: ['install', ...dependencies] }
  }

  return { command: packageManager, args: ['add', ...dependencies] }
}

export function buildInstallCommand(packageManager: PackageManager, dependencies: readonly string[] = REQUIRED_DEPENDENCIES): string {
  const { command, args } = buildInstallInvocation(packageManager, dependencies)
  return [command, ...args].join(' ')
}

async function listAvailableSlugs(registrySourceDir: string): Promise<string[]> {
  const componentsDir = join(registrySourceDir, 'components')
  const entries = await readdir(componentsDir, { withFileTypes: true })
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
}

function resolveRegistrySourceDir(cwd: string): string {
  const currentFileDir = dirname(fileURLToPath(import.meta.url))
  const candidates = [
    process.env.ORIZEN_TUI_REGISTRY_SRC,
    resolve(currentFileDir, '../../../registry/src'),
    resolve(cwd, 'packages/registry/src'),
    resolve(cwd, 'node_modules/@orizen-tui/registry/src'),
  ].filter(Boolean) as string[]

  for (const candidate of candidates) {
    if (existsSync(join(candidate, 'components')) && existsSync(join(candidate, 'primitives'))) {
      return candidate
    }
  }

  throw new Error(
    'Unable to locate registry source directory. Set ORIZEN_TUI_REGISTRY_SRC or run from the monorepo root.',
  )
}

function normalizeRequestedSlugs(slugs: string[]): string[] {
  const unique = new Set<string>()
  for (const slug of slugs) {
    const trimmed = slug.trim()
    if (trimmed)
      unique.add(trimmed)
  }
  return [...unique]
}

function suggestSlugs(slug: string, available: string[]): string[] {
  const lower = slug.toLowerCase()
  const prefixMatches = available.filter(candidate => candidate.startsWith(lower))
  if (prefixMatches.length > 0)
    return prefixMatches.slice(0, 5)

  const partialMatches = available.filter(candidate => candidate.includes(lower))
  return partialMatches.slice(0, 5)
}

export async function executeAddCommand(
  slugs: string[],
  options: AddCommandOptions,
  installRunner: InstallRunner = async (command, args, cwd) => {
    await execa(command, args, { cwd, stdio: 'inherit' })
  },
): Promise<AddExecutionResult> {
  const cwd = resolve(options.cwd ?? process.cwd())
  const targetPath = resolve(cwd, options.path || 'components/ui')
  const registrySourceDir = options.registryDir ?? resolveRegistrySourceDir(cwd)
  const dryRun = Boolean(options.dryRun)
  const overwrite = Boolean(options.overwrite)
  const install = options.install ?? true

  const requestedSlugs = normalizeRequestedSlugs(slugs)
  if (requestedSlugs.length === 0) {
    throw new Error('No component slugs provided. Example: orizen-tui add spinner')
  }

  const availableSlugs = await listAvailableSlugs(registrySourceDir)
  const invalidSlugs = requestedSlugs.filter(slug => !availableSlugs.includes(slug))

  if (invalidSlugs.length > 0) {
    const details = invalidSlugs
      .map((slug) => {
        const suggestions = suggestSlugs(slug, availableSlugs)
        if (suggestions.length === 0)
          return `- ${slug}`
        return `- ${slug} (did you mean: ${suggestions.join(', ')})`
      })
      .join('\n')

    throw new Error(
      `Unknown component slug(s):\n${details}\nAvailable components: ${availableSlugs.join(', ')}`,
    )
  }

  const files: PlannedFile[] = []
  const primitiveNames = new Set<PrimitiveName>()

  for (const slug of requestedSlugs) {
    const sourcePath = join(registrySourceDir, 'components', slug, 'index.tsx')
    const originalContent = await readFile(sourcePath, 'utf8')
    const rewrittenContent = rewriteRegistryImports(originalContent)
    const requiredPrimitives = findRequiredPrimitives(originalContent)

    for (const primitive of requiredPrimitives) {
      primitiveNames.add(primitive)
    }

    const outputPath = join(targetPath, 'orizen', `${slug}.tsx`)
    const shouldWrite = overwrite || !existsSync(outputPath)

    files.push({
      type: 'component',
      slug,
      sourcePath,
      outputPath,
      content: rewrittenContent,
      shouldWrite,
    })
  }

  for (const primitive of [...primitiveNames].sort()) {
    const sourcePath = join(registrySourceDir, 'primitives', `${primitive}.ts`)
    const content = await readFile(sourcePath, 'utf8')
    const outputPath = join(targetPath, 'orizen', 'primitives', `${primitive}.ts`)
    const shouldWrite = overwrite || !existsSync(outputPath)

    files.push({
      type: 'primitive',
      slug: primitive,
      sourcePath,
      outputPath,
      content,
      shouldWrite,
    })
  }

  if (!dryRun) {
    for (const file of files) {
      if (!file.shouldWrite)
        continue

      await mkdir(dirname(file.outputPath), { recursive: true })
      await writeFile(file.outputPath, file.content, 'utf8')
    }
  }

  let installAttempted = false
  let installSucceeded = false
  let packageManager: PackageManager | undefined
  let manualInstallCommand: string | undefined

  if (!dryRun && install) {
    packageManager = detectPackageManager(cwd)
    installAttempted = true
    manualInstallCommand = buildInstallCommand(packageManager)

    const { command, args } = buildInstallInvocation(packageManager)
    try {
      await installRunner(command, args, cwd)
      installSucceeded = true
    } catch {
      installSucceeded = false
    }
  }

  return {
    cwd,
    targetPath,
    slugs: requestedSlugs,
    files,
    requiredPrimitives: [...primitiveNames].sort(),
    installAttempted,
    installSucceeded,
    packageManager,
    manualInstallCommand,
  }
}

function printSummary(result: AddExecutionResult, dryRun: boolean): void {
  const verb = dryRun ? 'Would write' : 'Wrote'
  const wroteCount = result.files.filter(file => file.shouldWrite).length
  const skippedCount = result.files.length - wroteCount

  for (const file of result.files) {
    const rel = relative(result.cwd, file.outputPath)
    if (file.shouldWrite) {
      console.log(`${pc.green('✔')} ${verb}: ${rel}`)
    } else {
      console.log(`${pc.yellow('•')} Skipped (exists): ${rel}`)
    }
  }

  console.log('')
  console.log(`${pc.cyan('Components')}: ${result.slugs.join(', ')}`)
  console.log(`${pc.cyan('Target')}: ${relative(result.cwd, result.targetPath) || result.targetPath}`)
  console.log(`${pc.cyan('Files')}: ${wroteCount} ${dryRun ? 'planned' : 'written'}, ${skippedCount} skipped`)

  if (result.installAttempted && result.installSucceeded) {
    console.log(`${pc.green('✔')} Dependencies installed with ${result.packageManager}`)
  } else if (result.installAttempted && !result.installSucceeded) {
    console.log(`${pc.yellow('!')} Dependency install failed. Run manually:`)
    console.log(`  ${pc.yellow(result.manualInstallCommand ?? 'npm install ink react @orizen-tui/core')}`)
  }
}

export function createAddCommand(): Command {
  return new Command('add')
    .description('Add Orizen TUI components as source files (shadcn-style).')
    .argument('<slug...>', 'component slugs to add')
    .option('--path <dir>', 'output directory', 'components/ui')
    .option('--cwd <dir>', 'project root to run in')
    .option('--dry-run', 'print planned changes without writing files')
    .option('--no-install', 'skip dependency installation')
    .option('--overwrite', 'overwrite existing files')
    .action(async (slugs: string[], rawOptions: Omit<AddCommandOptions, 'registryDir'>) => {
      const result = await executeAddCommand(slugs, rawOptions)
      printSummary(result, Boolean(rawOptions.dryRun))
    })
}
