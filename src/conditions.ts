import { Parser } from 'expr-eval'
import type { ExpressionModel } from './types'

const parser = new Parser()

export function evaluate(expression: string | undefined, model: ExpressionModel): boolean {
  if (!expression) return true
  const expr = parser.parse(expression)
  try {
    return expr.evaluate(model)
  } catch {
    return false
  }
}
