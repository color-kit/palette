'use client'

import { MotionConfig } from 'framer-motion'
import { Provider } from 'jotai'

import { PaletteFooter, PaletteIntro, PaletteSwatches, PaletteTools } from '../components/palette'

export default function RootPage() {
  return (
    <div className="relative min-h-screen p-3 lg:p-0">
      <Provider>
        <MotionConfig transition={{ duration: 0.4, ease: 'easeInOut' }}>
          <PaletteIntro />
          <PaletteSwatches />
          <PaletteTools />
          <PaletteFooter />
        </MotionConfig>
      </Provider>
    </div>
  )
}
