import { springTokens, type MotionScheme } from './easings'

const springDurations = {
  standard: {
    fast: { spatial: '350ms', effects: '150ms' },
    default: { spatial: '500ms', effects: '200ms' },
    slow: { spatial: '750ms', effects: '300ms' },
  },
  expressive: {
    fast: { spatial: '350ms', effects: '150ms' },
    default: { spatial: '500ms', effects: '200ms' },
    slow: { spatial: '650ms', effects: '300ms' },
  },
}

export function makeDurations(motionScheme: MotionScheme) {
  return {
    short1: { value: '50ms' },
    short2: { value: '100ms' },
    short3: { value: '150ms' },
    short4: { value: '200ms' },
    medium1: { value: '250ms' },
    medium2: { value: '300ms' },
    medium3: { value: '350ms' },
    medium4: { value: '400ms' },
    long1: { value: '450ms' },
    long2: { value: '500ms' },
    long3: { value: '550ms' },
    long4: { value: '600ms' },
    'extra-long1': { value: '700ms' },
    'extra-long2': { value: '800ms' },
    'extra-long3': { value: '900ms' },
    'extra-long4': { value: '1000ms' },

    spring: springTokens(springDurations[motionScheme]),
  }
}
