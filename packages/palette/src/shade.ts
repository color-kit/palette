import { Blend, Hct, TonalPalette, argbFromHex, hexFromArgb } from '@material/material-color-utilities'

import type { ParsedOptions, Shade } from './types'

export function createShades(
  hex: string,
  options: ParsedOptions,
): {
  default: string
  shades: Shade[]
} {
  const { dark, harmonize, primary, steps } = options

  const argb = harmonize && primary ? Blend.harmonize(argbFromHex(hex), argbFromHex(primary)) : argbFromHex(hex)

  const hct = Hct.fromInt(argb)

  const palette = TonalPalette.fromHueAndChroma(hct.hue, hct.chroma)

  return {
    default: dark ? hexFromArgb(Hct.from(hct.hue, hct.chroma, hct.tone * 0.95).toInt()) : hexFromArgb(hct.toInt()),
    shades: steps.map(step => ({
      color: hexFromArgb(palette.tone(dark ? step * 0.95 : step)),
      step,
    })),
  }
}
