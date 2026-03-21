import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { collectComponentDocs, renderWebComponentDocsModule } from '../src/docs/collect.js'

async function main() {
  const scriptDir = dirname(fileURLToPath(import.meta.url))
  const registrySourceDir = resolve(scriptDir, '../src')
  const outputPath = resolve(scriptDir, '../../web/lib/generated/components.ts')

  const docs = await collectComponentDocs(registrySourceDir)
  const output = renderWebComponentDocsModule(docs)

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, output, 'utf8')

  console.log(`Generated docs manifest: ${outputPath}`)
  console.log(`Components: ${docs.length}`)
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Failed to generate docs manifest: ${message}`)
  process.exit(1)
})
