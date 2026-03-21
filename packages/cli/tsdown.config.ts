import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: { index: 'src/index.ts' },
  dts: false,
  publint: false,
  // Bun is Node-compatible — use 'node' platform for tsdown/rolldown
  platform: 'node',
})
