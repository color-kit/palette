'use client'

import { useState } from 'react'

import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

import { Snippet } from '@nextui-org/react'

export function PaletteIntro() {
  const innerHeight = typeof window === undefined ? 600 : window.innerHeight

  const [inPaletteView, setInPaletteView] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > innerHeight / 2) {
      !inPaletteView && setInPaletteView(true)
    } else {
      inPaletteView && setInPaletteView(false)
    }
  })

  const titleY = useTransform(scrollY, [0, innerHeight], [0, innerHeight / 2.5])

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        animate={{ opacity: 1 }}
        className="group relative"
        initial={{ opacity: 0 }}
        style={{
          y: titleY,
        }}
      >
        <h1 className="isolate mb-4 hidden text-center text-6xl font-bold lg:block">tailwind-plugin-palette</h1>
        <h1 className="isolate mb-4 block text-6xl font-bold lg:hidden">
          tailwind
          <br />
          plugin
          <br />
          palette
        </h1>

        <div className="left-1/2 top-full transition-all group-hover:translate-y-0 group-hover:opacity-100 lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 lg:p-4 lg:opacity-0">
          <h5 className="mb-3 mt-6 font-bold">Install via</h5>
          <div className="space-x-2">
            <Snippet codeString="npm install --save-dev tailwind-plugin-palette" hideSymbol>
              npm
            </Snippet>
            <Snippet codeString="pnpm install --save-dev tailwind-plugin-palette" hideSymbol>
              pnpm
            </Snippet>
            <Snippet codeString="bun add --dev tailwind-plugin-palette" hideSymbol>
              bun
            </Snippet>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
