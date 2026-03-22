import { codeToHtml } from 'shiki'
import { CopyButton } from './copy-button'

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
}

export async function CodeBlock({ code, lang = 'tsx', filename }: CodeBlockProps): Promise<JSX.Element> {
  const html = await codeToHtml(code, {
    lang,
    theme: 'tokyo-night',
  })

  return (
    <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-sm">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/40">
          <span className="text-xs text-zinc-500">{filename}</span>
          <CopyButton text={code} />
        </div>
      )}
      {!filename && (
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={code} />
        </div>
      )}
      <div
        className="p-4 overflow-auto [&>pre]:!bg-transparent [&>pre]:!p-0"
        // shiki output is safe — it generates HTML from trusted code strings
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
