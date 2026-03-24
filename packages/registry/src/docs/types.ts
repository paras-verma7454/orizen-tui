export type ComponentCategory = 'feedback' | 'input' | 'display'

export interface ComponentPropMeta {
  name: string
  type: string
  default: string
  description: string
}

export interface ComponentDocsMeta {
  slug: string
  name: string
  description: string
  category: ComponentCategory
  usage: string
  demo?: string
  props: ComponentPropMeta[]
}
