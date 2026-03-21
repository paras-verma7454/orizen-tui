import {
  componentDocs,
  type ComponentCategory,
  type ComponentDocsMeta,
} from './generated/components'

export type { ComponentCategory }

export interface ComponentMeta extends ComponentDocsMeta {
  install: string
}

export const components: ComponentMeta[] = componentDocs.map(component => ({
  ...component,
  install: `npx orizen-tui@latest add ${component.slug}`,
}))

export function getComponent(slug: string): ComponentMeta | undefined {
  return components.find(component => component.slug === slug)
}

export const categories: Record<ComponentCategory, string> = {
  feedback: 'Feedback',
  input: 'Input',
  display: 'Display',
}
