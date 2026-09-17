export type LanguageHeight = 'small' | 'medium' | 'large' | 'extra-large'

export type Typeface = { brand?: string; plain?: string }

type TypeStyle = {
  typeface: keyof Typeface
  size: number
  lineHeight: Record<LanguageHeight, number>
  weight: number
  tracking: number
  emphasized: { weight: number; tracking: number; variableWeight: number }
}

// px values from m3.material.io type scale tokens, 3P (non-Google) audience.
const typeScale: Record<string, TypeStyle> = {
  'display-large': { typeface: 'brand', size: 57, lineHeight: { small: 64, medium: 73, large: 89, 'extra-large': 120 }, weight: 400, tracking: -0.25, emphasized: { weight: 500, tracking: -0.25, variableWeight: 500 } },
  'display-medium': { typeface: 'brand', size: 45, lineHeight: { small: 52, medium: 56, large: 71, 'extra-large': 99 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'display-small': { typeface: 'brand', size: 36, lineHeight: { small: 44, medium: 47, large: 57, 'extra-large': 80 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'headline-large': { typeface: 'brand', size: 32, lineHeight: { small: 40, medium: 42, large: 50, 'extra-large': 75 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'headline-medium': { typeface: 'brand', size: 28, lineHeight: { small: 36, medium: 38, large: 45, 'extra-large': 66 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'headline-small': { typeface: 'brand', size: 24, lineHeight: { small: 32, medium: 35, large: 41, 'extra-large': 59 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'body-large': { typeface: 'plain', size: 16, lineHeight: { small: 24, medium: 27, large: 31, 'extra-large': 41 }, weight: 400, tracking: 0.5, emphasized: { weight: 500, tracking: 0.5, variableWeight: 500 } },
  'body-medium': { typeface: 'plain', size: 14, lineHeight: { small: 20, medium: 23, large: 26, 'extra-large': 35 }, weight: 400, tracking: 0.25, emphasized: { weight: 500, tracking: 0.25, variableWeight: 500 } },
  'body-small': { typeface: 'plain', size: 12, lineHeight: { small: 16, medium: 18, large: 21, 'extra-large': 30 }, weight: 400, tracking: 0.4, emphasized: { weight: 500, tracking: 0.4, variableWeight: 500 } },
  'label-large': { typeface: 'plain', size: 14, lineHeight: { small: 20, medium: 23, large: 26, 'extra-large': 36 }, weight: 500, tracking: 0.1, emphasized: { weight: 700, tracking: 0.1, variableWeight: 600 } },
  'label-medium': { typeface: 'plain', size: 12, lineHeight: { small: 16, medium: 18, large: 21, 'extra-large': 30 }, weight: 500, tracking: 0.5, emphasized: { weight: 700, tracking: 0.5, variableWeight: 600 } },
  'label-small': { typeface: 'plain', size: 11, lineHeight: { small: 16, medium: 18, large: 21, 'extra-large': 29 }, weight: 500, tracking: 0.5, emphasized: { weight: 700, tracking: 0.5, variableWeight: 600 } },
  'title-large': { typeface: 'brand', size: 22, lineHeight: { small: 28, medium: 31, large: 36, 'extra-large': 53 }, weight: 400, tracking: 0, emphasized: { weight: 500, tracking: 0, variableWeight: 500 } },
  'title-medium': { typeface: 'plain', size: 16, lineHeight: { small: 24, medium: 27, large: 31, 'extra-large': 42 }, weight: 500, tracking: 0.15, emphasized: { weight: 700, tracking: 0.15, variableWeight: 600 } },
  'title-small': { typeface: 'plain', size: 14, lineHeight: { small: 20, medium: 23, large: 26, 'extra-large': 36 }, weight: 500, tracking: 0.1, emphasized: { weight: 700, tracking: 0.1, variableWeight: 600 } },
}

const rem = (px: number) => `${px / 16}rem`
const em = (tracking: number, size: number) => `${tracking / size}em`

export function makeTextStyles(languageHeight: LanguageHeight, typeface: Typeface) {
  const baseline: Record<string, { value: object }> = {}
  const emphasized: Record<string, { value: object }> = {}
  const variable: Record<string, { value: object }> = {}
  const variableEmphasized: Record<string, { value: object }> = {}

  for (const [name, style] of Object.entries(typeScale)) {
    const fontSize = rem(style.size)
    const lineHeight = rem(style.lineHeight[languageHeight])
    const fontFamily = typeface[style.typeface] && `md.${style.typeface}`

    baseline[name] = {
      value: {
        ...(fontFamily && { fontFamily }),
        fontSize,
        fontWeight: style.weight,
        lineHeight,
        letterSpacing: em(style.tracking, style.size),
      },
    }
    emphasized[name] = {
      value: {
        ...(fontFamily && { fontFamily }),
        fontSize,
        fontWeight: style.emphasized.weight,
        lineHeight,
        letterSpacing: em(style.emphasized.tracking, style.size),
      },
    }
    // Tracking is 0 for every style in the variable type scale.
    variable[name] = {
      value: {
        ...(fontFamily && { fontFamily }),
        fontSize,
        fontWeight: style.weight,
        lineHeight,
        letterSpacing: '0em',
      },
    }
    variableEmphasized[name] = {
      value: {
        ...(fontFamily && { fontFamily }),
        fontSize,
        fontWeight: style.emphasized.variableWeight,
        lineHeight,
        letterSpacing: '0em',
      },
    }
  }

  return {
    ...baseline,
    emphasized,
    variable: { ...variable, emphasized: variableEmphasized },
  }
}
