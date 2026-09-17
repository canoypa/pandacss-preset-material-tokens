import type { Typeface } from './text_styles'

export function makeFonts(typeface: Typeface) {
  const fonts: Record<string, { value: string }> = {}
  for (const [role, value] of Object.entries(typeface)) {
    if (value) fonts[role] = { value }
  }
  return fonts
}
