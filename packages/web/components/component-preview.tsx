'use client'

import { compactPreviewMap, previewMap } from './previews'

interface ComponentPreviewProps {
  slug: string
  className?: string
  compact?: boolean
}

export function ComponentPreview({ slug, className = '', compact = false }: ComponentPreviewProps): JSX.Element {
  const Preview = (compact ? compactPreviewMap[slug] : undefined) ?? previewMap[slug]
  if (!Preview)
    return <span className="text-zinc-600 text-xs">No preview</span>
  return (
    <div className={className}>
      <Preview />
    </div>
  )
}
