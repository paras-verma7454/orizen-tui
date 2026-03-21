import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Transpile workspace packages (they ship TS source in dev)
  transpilePackages: ['@orizen-tui/core', '@orizen-tui/registry'],
}

export default nextConfig
