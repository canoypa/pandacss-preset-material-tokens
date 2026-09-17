export type LanguageHeight = 'small' | 'medium'

type TypeStyle = {
  size: number
  lineHeight: Record<LanguageHeight, number>
  weight: number
  tracking: number
  emphasized: { weight: number; tracking: number }
}

// px values from m3.material.io type scale tokens.
const typeScale: Record<string, TypeStyle> = {
  'display-large': { size: 57, lineHeight: { small: 64, medium: 73 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'display-medium': { size: 45, lineHeight: { small: 52, medium: 56 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'display-small': { size: 36, lineHeight: { small: 44, medium: 47 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'headline-large': { size: 32, lineHeight: { small: 40, medium: 42 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'headline-medium': { size: 28, lineHeight: { small: 36, medium: 38 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'headline-small': { size: 24, lineHeight: { small: 32, medium: 35 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'body-large': { size: 16, lineHeight: { small: 24, medium: 27 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'body-medium': { size: 14, lineHeight: { small: 20, medium: 23 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'body-small': { size: 12, lineHeight: { small: 16, medium: 18 }, weight: 400, tracking: 0.1, emphasized: { weight: 500, tracking: 0 } },
  'label-large': { size: 14, lineHeight: { small: 20, medium: 23 }, weight: 500, tracking: 0, emphasized: { weight: 700, tracking: 0 } },
  'label-medium': { size: 12, lineHeight: { small: 16, medium: 18 }, weight: 500, tracking: 0.1, emphasized: { weight: 700, tracking: 0.1 } },
  'label-small': { size: 11, lineHeight: { small: 16, medium: 18 }, weight: 500, tracking: 0.1, emphasized: { weight: 700, tracking: 0.1 } },
  'title-large': { size: 22, lineHeight: { small: 28, medium: 31 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0 } },
  'title-medium': { size: 16, lineHeight: { small: 24, medium: 27 }, weight: 500, tracking: 0, emphasized: { weight: 700, tracking: 0 } },
  'title-small': { size: 14, lineHeight: { small: 20, medium: 23 }, weight: 500, tracking: 0, emphasized: { weight: 700, tracking: 0 } },
}

const rem = (px: number) => `${px / 16}rem`

export function makeTextStyles(languageHeight: LanguageHeight) {
  const baseline: Record<string, { value: object }> = {}
  const emphasized: Record<string, { value: object }> = {}

  for (const [name, style] of Object.entries(typeScale)) {
    const fontSize = rem(style.size)
    const lineHeight = rem(style.lineHeight[languageHeight])

    baseline[name] = {
      value: {
        fontSize,
        fontWeight: style.weight,
        lineHeight,
        letterSpacing: rem(style.tracking),
      },
    }
    emphasized[name] = {
      value: {
        fontSize,
        fontWeight: style.emphasized.weight,
        lineHeight,
        letterSpacing: rem(style.emphasized.tracking),
      },
    }
  }

  return { ...baseline, emphasized }
}
