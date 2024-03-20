'use client'

import { MotionConfig } from 'framer-motion'
import { Provider } from 'jotai'

import { PaletteFooter } from '../components/palette/footer'
import { PaletteIntro } from '../components/palette/intro'
import { PaletteSwatches } from '../components/palette/swatches'
import { PaletteTools } from '../components/palette/tools'

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
