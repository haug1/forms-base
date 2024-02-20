import { Parser } from 'expr-eval'

const parser = new Parser()

export function evaluate(
  expression: string | undefined,
  model: { [key: string]: string }
): boolean {
  if (!expression) return true
  const expr = parser.parse(expression)
  try {
    return expr.evaluate(model)
  } catch {
    return false
  }
}
