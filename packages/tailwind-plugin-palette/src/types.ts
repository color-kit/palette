import type { DefaultColors } from 'tailwindcss/types/generated/colors'

export type Options = {
  /** define the color palette map, or provide a number means which color will be used from default tailwind colors */
  colors?: Record<string, string>
  dark?: boolean
  /** define the color stop's interval, it will be same as tailwind default color stops if not present. */
  interval?: number | number[]
  /** provide a primary color, it will generate primary shades */
  primary?: Record<string, number | string> | string
  reversed?: boolean
}

export type DefaultColorsKeys = keyof DefaultColors
