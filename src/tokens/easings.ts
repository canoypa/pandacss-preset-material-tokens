export type MotionScheme = 'standard' | 'expressive'

type Spring = Record<'fast' | 'default' | 'slow', Record<'spatial' | 'effects', string>>

export function springTokens(spring: Spring) {
  const tokens: Record<string, Record<string, { value: string }>> = {}
  for (const [speed, { spatial, effects }] of Object.entries(spring)) {
    tokens[speed] = { spatial: { value: spatial }, effects: { value: effects } }
  }
  return tokens
}

const springEasings: Record<MotionScheme, Spring> = {
  standard: {
    fast: {
      spatial: 'cubic-bezier(0.27, 1.06, 0.18, 1)',
      effects: 'cubic-bezier(0.31, 0.94, 0.34, 1)',
    },
    default: {
      spatial: 'cubic-bezier(0.27, 1.06, 0.18, 1)',
      effects: 'cubic-bezier(0.34, 0.8, 0.34, 1)',
    },
    slow: {
      spatial: 'cubic-bezier(0.27, 1.06, 0.18, 1)',
      effects: 'cubic-bezier(0.34, 0.88, 0.34, 1)',
    },
  },
  expressive: {
    fast: {
      spatial: 'cubic-bezier(0.42, 1.67, 0.21, 0.9)',
      effects: 'cubic-bezier(0.31, 0.94, 0.34, 1)',
    },
    default: {
      spatial: 'cubic-bezier(0.38, 1.21, 0.22, 1)',
      effects: 'cubic-bezier(0.34, 0.8, 0.34, 1)',
    },
    slow: {
      spatial: 'cubic-bezier(0.39, 1.29, 0.35, 0.98)',
      effects: 'cubic-bezier(0.34, 0.88, 0.34, 1)',
    },
  },
}

export function makeEasings(motionScheme: MotionScheme) {
  return {
    linear: { value: 'cubic-bezier(0, 0, 1, 1)' },
    standard: {
      DEFAULT: { value: 'cubic-bezier(0.2, 0, 0, 1)' },
      accelerate: { value: 'cubic-bezier(0.3, 0, 1, 1)' },
      decelerate: { value: 'cubic-bezier(0, 0, 0, 1)' },
    },
    emphasized: {
      // The spec defines this as a two-segment path, which CSS can't express;
      // the spec says to fall back to standard.
      DEFAULT: { value: 'cubic-bezier(0.2, 0, 0, 1)' },
      accelerate: { value: 'cubic-bezier(0.3, 0, 0.8, 0.15)' },
      decelerate: { value: 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
    },
    legacy: {
      DEFAULT: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      accelerate: { value: 'cubic-bezier(0.4, 0, 1, 1)' },
      decelerate: { value: 'cubic-bezier(0, 0, 0.2, 1)' },
    },

    spring: springTokens(springEasings[motionScheme]),
  }
}
