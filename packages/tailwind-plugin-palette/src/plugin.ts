// import { inspect } from 'node:util'

import tailwindColors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

import type { Options } from './types'

import { createPalette } from './core'

export const palettePlugin = (options: Options) => {
  return plugin(
    function () {
      return function () {}
    },
    function () {
      const paletteColors = createPalette(options)

      return {
        theme: {
          colors: {
            ...tailwindColors,
            ...paletteColors,
          },
        },
      }
    },
  )
}
export const createPlugin = (options: Options = {}): ReturnType<typeof plugin> => {
  return palettePlugin(options)
}
