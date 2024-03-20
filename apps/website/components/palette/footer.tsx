import { useState } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Link } from '@nextui-org/react'

const MotionImage = motion(Image)

export function PaletteFooter() {
  const [isHovered, setHovered] = useState(false)
  return (
    <footer className="mb-40 flex justify-center">
      <motion.div
        className="relative"
        layout="position"
        layoutScroll
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MotionImage
          alt="logo"
          animate={{ x: isHovered ? -80 : 0 }}
          className="relative z-10 bg-white"
          height={120}
          initial={{ x: 0 }}
          src="/assets/logo.svg"
          width={120}
        />
        <motion.div
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
          className="absolute left-16 top-8 whitespace-nowrap"
          initial={{ opacity: 0, x: 15 }}
        >
          <h5 className="space-x-2 text-lg font-bold">
            <Link href="https://github.com/nnecec/color-kit" target="_blank">
              Github
            </Link>
            <Link href="https://x.com/nnecec_cn" target="_blank">
              X
            </Link>
          </h5>
          <div>
            Built by{' '}
            <Link href="https://github.com/nnecec" target="_blank">
              nnecec
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
