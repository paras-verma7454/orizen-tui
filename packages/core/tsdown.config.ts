import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  tsconfig: './tsconfig.build.json',
  external: ['react-devtools-core'],
  exports: {
    devExports: true,
    enabled: true,
  },
  publint: true,
  esbuild: {
    jsx: 'automatic',
  },
})
