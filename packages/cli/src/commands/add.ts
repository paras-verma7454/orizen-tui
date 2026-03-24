import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { Command } from 'commander'
import { execa } from 'execa'
import pc from 'picocolors'

export type PackageManager = 'bun' | 'pnpm' | 'yarn' | 'npm'
export type PrimitiveName = 'borders' | 'symbols'

const PRIMITIVE_IMPORT_RE = /from ['"]\.\.\/\.\.\/primitives\/(borders|symbols)\.js['"]/g
const TRAILING_SLASH_RE = /\/+$/
const REQUIRED_DEPENDENCIES = ['ink@^5.0.1', 'react@^18.3.1', '@types/react@^18.3.18', '@types/node@latest', 'orizen-tui-core@latest', 'yoga-layout-prebuilt'] as const
const DEFAULT_REGISTRY_BASE_URL = 'https://raw.githubusercontent.com/paras-verma7454/orizen-tui/main/packages/registry/src'

export interface AddCommandOptions {
  path: string
  cwd?: string
  dryRun?: boolean
  install?: boolean
  overwrite?: boolean
  registryDir?: string
  registryBaseUrl?: string
}

export interface PlannedFile {
  type: 'component' | 'primitive' | 'manifest' | 'barrel'
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

interface InstalledComponentsManifest {
  components: string[]
}

function toComponentSymbol(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join('')
}

async function readInstalledComponents(manifestPath: string): Promise<string[]> {
  if (!existsSync(manifestPath))
    return []

  try {
    const raw = await readFile(manifestPath, 'utf8')
    const parsed = JSON.parse(raw) as Partial<InstalledComponentsManifest>
    if (!Array.isArray(parsed.components))
      return []
    return parsed.components.filter(Boolean).map(component => component.trim()).filter(Boolean)
  }
  catch {
    return []
  }
}

function buildComponentsManifestContent(slugs: string[]): string {
  const manifest: InstalledComponentsManifest = { components: [...new Set(slugs)].sort() }
  return `${JSON.stringify(manifest, null, 2)}\n`
}

function buildBarrelContent(slugs: string[]): string {
  const uniqueSorted = [...new Set(slugs)].sort()
  const lines = uniqueSorted.map((slug) => {
    const symbol = toComponentSymbol(slug)
    return `export { ${symbol} } from './${slug}'`
  })
  return `${lines.join('\n')}\n`
}

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

interface UserPackageJson {
  overrides?: Record<string, string>
  resolutions?: Record<string, string>
}

export async function injectYogaLayoutOverride(cwd: string): Promise<boolean> {
  const packageJsonPath = join(cwd, 'package.json')

  if (!existsSync(packageJsonPath))
    return false

  try {
    const rawContent = await readFile(packageJsonPath, 'utf8')
    const pkg = JSON.parse(rawContent) as UserPackageJson

    const overrideKey = pkg.overrides ? 'overrides' : 'resolutions'
    const existing = pkg[overrideKey] || {}
    const yogaKey = 'yoga-layout'

    if (existing[yogaKey] === 'yoga-layout-prebuilt')
      return true

    const updated: UserPackageJson = {
      ...pkg,
      [overrideKey]: {
        ...existing,
        [yogaKey]: 'yoga-layout-prebuilt',
      },
    }

    await writeFile(packageJsonPath, `${JSON.stringify(updated, null, 2)}\n`, 'utf8')
    return true
  }
  catch {
    return false
  }
}

async function listAvailableSlugs(registrySourceDir: string): Promise<string[]> {
  const componentsDir = join(registrySourceDir, 'components')
  const entries = await readdir(componentsDir, { withFileTypes: true })
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
}

function isRegistrySourceDir(path: string): boolean {
  return existsSync(join(path, 'components')) && existsSync(join(path, 'primitives'))
}

function resolveLocalRegistrySourceDir(cwd: string): string | undefined {
  const currentFileDir = dirname(fileURLToPath(import.meta.url))
  const candidates = [
    process.env.ORIZEN_TUI_REGISTRY_SRC,
    resolve(currentFileDir, '../registry-source'),
    resolve(currentFileDir, '../../../registry/src'),
    resolve(cwd, 'packages/registry/src'),
    resolve(cwd, 'node_modules/@orizen-tui/registry/src'),
  ].filter(Boolean) as string[]

  for (const candidate of candidates) {
    if (isRegistrySourceDir(candidate)) {
      return candidate
    }
  }
}

function normalizeRegistryBaseUrl(url: string): string {
  return url.replace(TRAILING_SLASH_RE, '')
}

async function fetchRemoteSource(url: string): Promise<string | undefined> {
  const response = await fetch(url)
  if (response.status === 404) {
    return undefined
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch remote registry source (${response.status}): ${url}`)
  }
  return response.text()
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
  const dryRun = Boolean(options.dryRun)
  const overwrite = Boolean(options.overwrite)
  const install = options.install ?? true

  const requestedSlugs = normalizeRequestedSlugs(slugs)
  if (requestedSlugs.length === 0) {
    throw new Error('No component slugs provided. Example: orizen-tui add spinner')
  }

  const localRegistrySourceDir = options.registryDir
    ? (isRegistrySourceDir(options.registryDir) ? options.registryDir : undefined)
    : resolveLocalRegistrySourceDir(cwd)
  const remoteRegistryBaseUrl = normalizeRegistryBaseUrl(
    options.registryBaseUrl
    ?? process.env.ORIZEN_TUI_REGISTRY_BASE_URL
    ?? DEFAULT_REGISTRY_BASE_URL,
  )

  const files: PlannedFile[] = []
  const primitiveNames = new Set<PrimitiveName>()

  if (localRegistrySourceDir) {
    const availableSlugs = await listAvailableSlugs(localRegistrySourceDir)
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

    for (const slug of requestedSlugs) {
      const sourcePath = join(localRegistrySourceDir, 'components', slug, 'index.tsx')
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
      const sourcePath = join(localRegistrySourceDir, 'primitives', `${primitive}.ts`)
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
  }
  else {
    const invalidSlugs: string[] = []

    for (const slug of requestedSlugs) {
      const sourcePath = `${remoteRegistryBaseUrl}/components/${slug}/index.tsx`
      const originalContent = await fetchRemoteSource(sourcePath)
      if (!originalContent) {
        invalidSlugs.push(slug)
        continue
      }

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

    if (invalidSlugs.length > 0) {
      throw new Error(`Unknown component slug(s): ${invalidSlugs.join(', ')}`)
    }

    for (const primitive of [...primitiveNames].sort()) {
      const sourcePath = `${remoteRegistryBaseUrl}/primitives/${primitive}.ts`
      const content = await fetchRemoteSource(sourcePath)
      if (!content) {
        throw new Error(`Missing remote primitive source: ${primitive}`)
      }

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
  }

  if (!dryRun) {
    for (const file of files) {
      if (!file.shouldWrite)
        continue

      await mkdir(dirname(file.outputPath), { recursive: true })
      await writeFile(file.outputPath, file.content, 'utf8')
    }
  }

  const manifestPath = join(targetPath, 'orizen', 'components.json')
  const existingSlugs = await readInstalledComponents(manifestPath)
  const mergedSlugs = [...new Set([...existingSlugs, ...requestedSlugs])].sort()

  const manifestContent = buildComponentsManifestContent(mergedSlugs)
  const manifestShouldWrite = overwrite || !existsSync(manifestPath) || (await readFile(manifestPath, 'utf8').catch(() => '')) !== manifestContent
  files.push({
    type: 'manifest',
    slug: 'components',
    sourcePath: '[generated]',
    outputPath: manifestPath,
    content: manifestContent,
    shouldWrite: manifestShouldWrite,
  })

  const barrelPath = join(targetPath, 'orizen', 'index.ts')
  const barrelContent = buildBarrelContent(mergedSlugs)
  const barrelShouldWrite = overwrite || !existsSync(barrelPath) || (await readFile(barrelPath, 'utf8').catch(() => '')) !== barrelContent
  files.push({
    type: 'barrel',
    slug: 'index',
    sourcePath: '[generated]',
    outputPath: barrelPath,
    content: barrelContent,
    shouldWrite: barrelShouldWrite,
  })

  if (!dryRun) {
    for (const file of files) {
      if (!file.shouldWrite)
        continue
      if (file.type !== 'manifest' && file.type !== 'barrel')
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
      await injectYogaLayoutOverride(cwd)
    }
    catch {
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
    }
    else {
      console.log(`${pc.yellow('•')} Skipped (exists): ${rel}`)
    }
  }

  console.log('')
  console.log(`${pc.cyan('Components')}: ${result.slugs.join(', ')}`)
  console.log(`${pc.cyan('Target')}: ${relative(result.cwd, result.targetPath) || result.targetPath}`)
  console.log(`${pc.cyan('Files')}: ${wroteCount} ${dryRun ? 'planned' : 'written'}, ${skippedCount} skipped`)

  if (result.installAttempted && result.installSucceeded) {
    console.log(`${pc.green('✔')} Dependencies installed with ${result.packageManager}`)
  }
  else if (result.installAttempted && !result.installSucceeded) {
    console.log(`${pc.yellow('!')} Dependency install failed. Run manually:`)
    console.log(`  ${pc.yellow(result.manualInstallCommand ?? 'npm install ink@^5.0.1 react@^18.3.1 @types/react@^18.3.18 @types/node@latest orizen-tui-core@latest yoga-layout-prebuilt')}`)
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
    .option('--registry <url>', 'remote registry base URL')
    .action(async (slugs: string[], rawOptions: Omit<AddCommandOptions, 'registryDir'>) => {
      const result = await executeAddCommand(slugs, {
        ...rawOptions,
        registryBaseUrl: (rawOptions as AddCommandOptions & { registry?: string }).registry,
      })
      printSummary(result, Boolean(rawOptions.dryRun))
    })
}
