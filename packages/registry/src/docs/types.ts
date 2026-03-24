export type ComponentCategory = 'feedback' | 'input' | 'display'

export interface ComponentPropMeta {
  name: string
  type: string
  default: string
  description: string
}

export interface ComponentExample {
  title: string
  code: string
}

export interface ComponentDocsMeta {
  slug: string
  name: string
  description: string
  category: ComponentCategory
  usage: string
  examples: ComponentExample[]
  props: ComponentPropMeta[]
}
