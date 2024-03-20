import type { ButtonProps } from '@nextui-org/react'

import { forwardRef } from 'react'

import { motion } from 'framer-motion'
import { atom } from 'jotai'
import { createPalette } from 'tailwind-plugin-palette'

import { Button } from '@nextui-org/react'

export const IconButton = forwardRef(function IconButton(props: ButtonProps, ref: any) {
  return <Button isIconOnly radius="full" {...props} ref={ref} />
})
export const MotionIconButton = motion(IconButton)

export type Options = {
  dark?: boolean
  harmonize?: boolean
  primary?: string
  reversed?: boolean
}

export const optionsAtom = atom<Options>({
  dark: false,
  harmonize: false,
  primary: undefined,
  reversed: false,
})

export type EditingSwatch = {
  disabled?: boolean
  hex?: string
  name: string
}

export const colorsAtom = atom<EditingSwatch[]>([])
export const editingSwatchesAtom = atom<Map<number, EditingSwatch & { errorMessage?: string }>>(new Map())
export const paletteAtom = atom(get => {
  const options = get(optionsAtom)
  const colors = get(colorsAtom)

  return createPalette({
    ...options,
    colors: Object.fromEntries(
      colors.filter(({ name }) => !['primary', 'secondary'].includes(name)).map(color => [color.name, color.hex!]),
    ),
  })
})
