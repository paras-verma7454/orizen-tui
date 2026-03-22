// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  pnpm: true,
  ignores: [
    'packages/web/lib/generated/**',
    'packages/web/next-env.d.ts',
  ],
})
