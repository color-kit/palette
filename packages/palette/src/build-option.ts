import type { Options, ParsedOptions } from './types'

import { toColor } from './utils'

export const createOptions = (options?: Partial<Options>): ParsedOptions => {
  const base = {
    dark: options?.dark ?? false,
    easing: 'easeInQuad',
    harmonize: options?.harmonize ?? false,
    shift: 0,
    steps: options?.steps ?? 10,
  }

  const steps =
    Array.isArray(base.steps) ?
      base.steps
    : Array.from({ length: base.steps }).map((_, i) => i / (base.steps as number))

  return {
    ...base,
    primary: options?.primary ? toColor(options?.primary as any) : undefined,
    steps,
  }
}
