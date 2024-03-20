'use client'

import { useEffect, useRef, useState } from 'react'

import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useAtom } from 'jotai'

import { Button, Input, Tooltip } from '@nextui-org/react'

import { getColorName } from '../../utils/color'
import { ColorPicker } from '../color-picker'
import { colorsAtom, editingSwatchesAtom, paletteAtom } from './utils'

export function PaletteSwatches() {
  const [inPaletteView, setInPaletteView] = useState(false)
  const [colors, setColors] = useAtom(colorsAtom)
  const [palette] = useAtom(paletteAtom)

  const [editingSwatches, setEditingSwatches] = useAtom(editingSwatchesAtom)

  const isEmptyPalette = colors.length === 0

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > window.innerHeight / 2) {
      !inPaletteView && setInPaletteView(true)
    } else {
      inPaletteView && setInPaletteView(false)
    }
  })

  return (
    <div
      className={clsx(
        'container relative mx-auto min-h-screen select-none space-y-6 pb-60 pt-40',
        isEmptyPalette && 'flex items-center justify-center',
      )}
    >
      {isEmptyPalette ?
        <div className="prose dark:prose-invert">
          <h4>There is no swatch yet,</h4>
          <h4>Please click the plus button or choose a primary color</h4>
        </div>
      : colors.map((swatch, index) => {
          const editingSwatch = editingSwatches.get(index)
          const isInvalid = Boolean(editingSwatch?.errorMessage)

          return (
            <div key={swatch.hex}>
              <motion.div
                animate="show"
                className="mb-4 flex items-center gap-4"
                initial="hide"
                transition={{
                  staggerChildren: 0.01,
                }}
                variants={{
                  hide: {
                    opacity: 0,
                  },
                  show: {
                    opacity: 1,
                  },
                }}
              >
                <Input
                  classNames={{ base: 'w-auto' }}
                  errorMessage={editingSwatch?.errorMessage}
                  fullWidth={false}
                  isDisabled={Boolean(swatch.disabled)}
                  isInvalid={isInvalid}
                  onValueChange={value => {
                    const newSwatch = { ...swatch, name: value }
                    editingSwatches.set(index, newSwatch)
                    setEditingSwatches(new Map(editingSwatches))
                  }}
                  value={editingSwatch?.name ?? swatch.name}
                />

                {!!swatch.hex && (
                  <ColorPicker
                    className="z-10"
                    onChange={value => {
                      const newSwatch = { ...swatch, hex: value, name: getColorName(value) }
                      editingSwatches.set(index, newSwatch)
                      setEditingSwatches(new Map(editingSwatches))
                    }}
                    size="sm"
                    value={editingSwatch?.hex ?? swatch.hex}
                  />
                )}

                {editingSwatch && (editingSwatch.name !== swatch.name || editingSwatch.hex !== swatch.hex) ?
                  <>
                    <Button
                      isIconOnly
                      onPress={() => {
                        const newSwatch = editingSwatches.get(index)!
                        const exist = colors.findIndex(({ name }) => name === newSwatch?.name)
                        if (exist > -1 && index !== exist) {
                          newSwatch.errorMessage = 'There already a swatch with that name'

                          editingSwatches.set(index, newSwatch)
                          setEditingSwatches(new Map(editingSwatches))
                          return
                        }
                        editingSwatches.delete(index)
                        setEditingSwatches(new Map(editingSwatches))
                        setColors(colors.toSpliced(index, 1, { ...newSwatch }))
                      }}
                    >
                      <CheckIcon width={14} />
                    </Button>
                    <Button
                      isIconOnly
                      onPress={() => {
                        const originSwatch = colors[index]!
                        editingSwatches.set(index, originSwatch)
                        setEditingSwatches(new Map(editingSwatches))
                      }}
                    >
                      <XMarkIcon width={14} />
                    </Button>
                  </>
                : null}
              </motion.div>
              {!!palette[swatch.name] && <Swatches name={swatch.name} swatches={palette[swatch.name]!} />}
            </div>
          )
        })
      }
    </div>
  )
}

function Swatches({ name, swatches }: { name: string; swatches: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <motion.div
      animate="show"
      className="grid grid-cols-6 lg:grid-cols-12"
      initial="hide"
      ref={ref}
      transition={{
        staggerChildren: 0.01,
      }}
      variants={{
        hide: {
          opacity: 0,
        },
        show: {
          opacity: 1,
        },
      }}
    >
      {Object.entries(swatches as Record<string, string>).map(([step, shade]) => (
        <motion.div
          className="relative w-full"
          key={name + shade + step}
          variants={{
            hide: {
              opacity: 0,
            },
            show: {
              opacity: 1,
            },
          }}
        >
          <div className="mt-[100%]" />
          <Tooltip content={`${name}-${step}`}>
            <div
              className="absolute inset-[12%] rounded-full text-sm"
              style={{
                backgroundColor: shade,
              }}
            />
          </Tooltip>
        </motion.div>
      ))}
    </motion.div>
  )
}
