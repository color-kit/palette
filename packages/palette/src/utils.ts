import type { Color } from 'culori'

import { converter, formatHex } from 'culori'

export const toColor = (color: Color | string) => {
  return formatHex(converter('rgb')(color))
}
