import type { Options, Palette, SwatchLike } from './types'

import { createOptions } from './build-option'
import { createShades } from './shade'
import { createSwatches } from './swatch'

export function createPalette(swatchLike: SwatchLike, options?: Partial<Options>) {
  const paletteOptions = createOptions(options)
  const swatches = createSwatches(swatchLike, paletteOptions)

  const palette: Palette[] = swatches.map(swatch => {
    const shade = createShades(swatch.color, paletteOptions)
    return {
      default: shade.default,
      name: swatch.name,
      shades: shade.shades,
    }
  })

  return palette
}
