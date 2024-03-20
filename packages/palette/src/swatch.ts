import { Hct, TemperatureCache, argbFromHex, hexFromArgb } from '@material/material-color-utilities'

import type { ParsedOptions, Swatch, SwatchLike } from './types'

import { toColor } from './utils'

export function createSwatches(swatchLike: SwatchLike, options: ParsedOptions): Swatch[] {
  const swatchesArray = Array.isArray(swatchLike) ? swatchLike : Object.entries(swatchLike)

  if (options.primary) {
    const temperatureCache = new TemperatureCache(Hct.fromInt(argbFromHex(options.primary)))

    const secondary = hexFromArgb(temperatureCache.complement.toInt())
    swatchesArray.unshift(['secondary', secondary])
    swatchesArray.unshift(['primary', options.primary])
  }

  return swatchesArray
    .map(([name, value]) => {
      const color = toColor(value)
      if (!color) return null
      return {
        color,
        name,
      }
    })
    .filter(Boolean)
}
