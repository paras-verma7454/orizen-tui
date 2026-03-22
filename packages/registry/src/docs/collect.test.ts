import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'bun:test'
import { collectComponentDocs, renderWebComponentDocsModule } from './collect.js'

const currentDir = dirname(fileURLToPath(import.meta.url))
const registrySourceDir = resolve(currentDir, '..')
const tempDirs: string[] = []

async function createTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'orizen-registry-docs-'))
  tempDirs.push(dir)
  return dir
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map(dir => rm(dir, { recursive: true, force: true })))
})

describe('collectComponentDocs', () => {
  it('collects metadata for all components and sorts by slug', async () => {
    const docs = await collectComponentDocs(registrySourceDir)
    const slugs = docs.map(doc => doc.slug)

    expect(docs.length).toBeGreaterThan(0)
    expect(slugs).toEqual([...slugs].sort())
  })

  it('fails fast when a component is missing meta.ts', async () => {
    const fixture = await createTempDir()
    const componentsDir = join(fixture, 'components')
    await mkdir(join(componentsDir, 'spinner'), { recursive: true })
    await writeFile(join(componentsDir, 'spinner', 'index.tsx'), 'export {}')

    await expect(collectComponentDocs(fixture)).rejects.toThrow('Missing metadata file')
  })
})

describe('renderWebComponentDocsModule', () => {
  it('renders deterministic output for the same docs data', async () => {
    const docs = await collectComponentDocs(registrySourceDir)
    const a = renderWebComponentDocsModule(docs)
    const b = renderWebComponentDocsModule(docs)
    expect(a).toBe(b)
  })
})
