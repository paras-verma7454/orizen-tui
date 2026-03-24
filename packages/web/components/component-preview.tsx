'use client'

import { compactPreviewMap, examplePreviewMap, previewMap } from './previews'

interface ComponentPreviewProps {
  slug: string
  className?: string
  compact?: boolean
  exampleIndex?: number
}

export function ComponentPreview({ slug, className = '', compact = false, exampleIndex }: ComponentPreviewProps): JSX.Element {
  // If exampleIndex is provided, try to use example-specific preview
  if (exampleIndex !== undefined) {
    const exampleKey = `${slug}-${exampleIndex}`
    const ExamplePreview = examplePreviewMap[exampleKey]
    if (ExamplePreview) {
      return (
        <div className={className}>
          <ExamplePreview />
        </div>
      )
    }
  }

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
