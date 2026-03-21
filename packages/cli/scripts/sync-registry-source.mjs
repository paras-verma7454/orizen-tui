import { cp, mkdir, readdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const cliRoot = join(currentDir, '..')
const registrySrcRoot = join(cliRoot, '..', 'registry', 'src')
const outRoot = join(cliRoot, 'registry-source')

async function syncRegistrySource() {
  await rm(outRoot, { recursive: true, force: true })
  await mkdir(join(outRoot, 'components'), { recursive: true })
  await mkdir(join(outRoot, 'primitives'), { recursive: true })

  const componentEntries = await readdir(join(registrySrcRoot, 'components'), { withFileTypes: true })
  for (const entry of componentEntries) {
    if (!entry.isDirectory())
      continue

    const slug = entry.name
    const sourcePath = join(registrySrcRoot, 'components', slug, 'index.tsx')
    const targetDir = join(outRoot, 'components', slug)
    const targetPath = join(targetDir, 'index.tsx')

    await mkdir(targetDir, { recursive: true })
    await cp(sourcePath, targetPath)
  }

  await cp(join(registrySrcRoot, 'primitives', 'borders.ts'), join(outRoot, 'primitives', 'borders.ts'))
  await cp(join(registrySrcRoot, 'primitives', 'symbols.ts'), join(outRoot, 'primitives', 'symbols.ts'))
}

await syncRegistrySource()
