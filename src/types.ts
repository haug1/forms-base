import type { Value } from 'expr-eval'

export interface ElementTemplate {
  key: string
  label: string
  condition?: string
  default?: string
}

export interface ElementModel {
  template: ElementTemplate
  value?: string
  activeCondition: boolean
}

export interface DataModel {
  [key: string]: ElementModel['value']
}

export type ExpressionModel = { [key: string]: Value }
