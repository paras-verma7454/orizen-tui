'use client'

import { compactPreviewMap, previewMap } from './previews'

interface ComponentPreviewProps {
  slug: string
  className?: string
  compact?: boolean
}

export function ComponentPreview({ slug, className = '', compact = false }: ComponentPreviewProps): JSX.Element {
  const CompactPreview = compactPreviewMap[slug]
  const RegularPreview = previewMap[slug]

  // If we have a dedicated compact version, use it
  if (compact && CompactPreview) {
    return (
      <div className={className}>
        <CompactPreview />
      </div>
    )
  }

  // Otherwise use the regular preview with compact prop if available
  if (!RegularPreview)
    return <span className="text-zinc-600 text-xs">No preview</span>

  // Pass compact prop to the component
  return (
    <div className={className}>
      <RegularPreview compact={compact} />
    </div>
  )
}
