import type { DefaultColors } from 'tailwindcss/types/generated/colors'

import tailwindColors from 'tailwindcss/colors'

import type { DefaultColorsKeys } from './types'

export const DEFAULT_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
export const DEFAULT_COLOR_KEYS = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]

export const getTailwindColors = (step: number = 500) =>
  Object.fromEntries(
    DEFAULT_COLOR_KEYS.map(colorName => {
      const color = tailwindColors[colorName as DefaultColorsKeys][step as keyof DefaultColors[DefaultColorsKeys]]
      return [colorName, color]
    }),
  )

export const toSteps = (interval?: number | number[]) => {
  let steps: number | number[] = DEFAULT_STEPS
  if (Array.isArray(interval)) {
    steps = interval
  } else if (typeof interval === 'number') {
    let current = 0
    steps = []
    while (current + interval < 1000) {
      steps.push(current + interval)
      current += interval
    }
    steps = steps
  } else {
    steps = DEFAULT_STEPS
  }
  return steps
}
