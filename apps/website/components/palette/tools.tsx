'use client'

import { useMemo, useRef, useState, useTransition } from 'react'

import { BookOpenIcon, CogIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useAtom } from 'jotai'

import {
  Badge,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Snippet,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'

import { ColorPicker } from '../../components/color-picker'
import { randomColor } from '../../utils/color'
import { IconButton, colorsAtom, optionsAtom } from './utils'

export function PaletteTools() {
  const [inPaletteView, setInPaletteView] = useState(false)
  const [options, setOptions] = useAtom(optionsAtom)
  const [colors, setColors] = useAtom(colorsAtom)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const toolsRef = useRef()

  const [, startTransition] = useTransition()

  const isEmptyPalette = colors.length === 0

  const addSwatch = () => {
    let color = randomColor()

    while (colors.some(({ name }) => name === color.name)) {
      color = randomColor()
    }
    setColors([...colors, color])
  }

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    if (latest > window.innerHeight / 2) {
      !inPaletteView && setInPaletteView(true)
    } else {
      inPaletteView && setInPaletteView(false)
    }
  })

  const copiedOptions = useMemo(() => {
    return JSON.stringify(
      Object.fromEntries([
        ['colors', Object.fromEntries(colors.map(color => [color.name, color.hex]))],
        ...Object.entries(options).filter(([, value]) => Boolean(value)),
      ]),
      null,
      2,
    )
  }, [colors, options])

  return (
    <div>
      <motion.div
        animate={inPaletteView ? 'show' : 'hide'}
        className="fixed bottom-10 left-[calc(50%-140px)] z-20 select-none"
        initial="hide"
        ref={toolsRef}
        variants={{
          hide: { opacity: 0.3, y: 64 + 40 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <motion.div className="flex h-16 items-center gap-3 rounded-full bg-white/30 p-4 shadow backdrop-blur-lg">
          <Badge
            className="cursor-pointer"
            color="danger"
            content={<XMarkIcon width={12} />}
            isInvisible={!options.primary}
            isOneChar
            onClick={() => {
              setOptions({ ...options, primary: '' })
              setColors(colors.filter(color => !['primary', 'secondary'].includes(color.name)))
            }}
            shape="circle"
            showOutline={false}
          >
            <ColorPicker
              className="z-10"
              onChange={value => {
                if (!options.primary) {
                  colors.unshift({ disabled: true, name: 'primary' }, { disabled: true, name: 'secondary' })
                }
                startTransition(() => {
                  setOptions(options => ({ ...options, primary: value }))
                })
              }}
              value={options.primary}
            />
          </Badge>

          <motion.div className="flex gap-3" layout="position">
            <Tooltip content="Add a swatch">
              <IconButton onPress={addSwatch}>
                <PlusIcon width={14} />
              </IconButton>
            </Tooltip>

            <Popover placement="top-start" portalContainer={toolsRef.current} shouldCloseOnBlur>
              <PopoverTrigger>
                <IconButton>
                  <CogIcon width={14} />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-4 px-1 py-2">
                  <h4 className="text-base">More options</h4>
                  <Checkbox isSelected={options.dark} onValueChange={value => setOptions({ ...options, dark: value })}>
                    Dark
                  </Checkbox>

                  <Checkbox
                    isSelected={options.reversed}
                    onValueChange={value => setOptions({ ...options, reversed: value })}
                  >
                    Reversed
                  </Checkbox>

                  <Checkbox
                    isSelected={options.harmonize}
                    onValueChange={value => setOptions({ ...options, harmonize: value })}
                  >
                    Harmonize
                  </Checkbox>
                </div>
              </PopoverContent>
            </Popover>

            <Tooltip content="Copy the options">
              <Snippet
                classNames={{
                  base: 'p-0 rounded-full gap-0 bg-default',
                  copyButton: 'rounded-full text-sm w-10 h-10',
                }}
                codeString={copiedOptions}
                disableCopy={isEmptyPalette}
                disableTooltip
                hideSymbol
              />
            </Tooltip>
            <Tooltip content="Documentation">
              <IconButton onPress={onOpen}>
                <BookOpenIcon width={14} />
              </IconButton>
            </Tooltip>
          </motion.div>
        </motion.div>
      </motion.div>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="xl">
        <ModalContent>
          <ModalHeader className="text-xl">How to configure your Tailwind.CSS?</ModalHeader>
          <ModalBody className="prose dark:prose-invert max-h-[50vh] overflow-y-auto">
            <div>
              <h4>1. Install tailwind-plugin-palette</h4>
              <div className="not-prose flex gap-2">
                <Snippet codeString="npm install --save-dev tailwind-plugin-palette" hideSymbol>
                  npm
                </Snippet>
                <Snippet codeString="pnpm install --save-dev tailwind-plugin-palette">pnpm</Snippet>
                <Snippet codeString="bun add --dev tailwind-plugin-palette" hideSymbol>
                  bun
                </Snippet>
              </div>
              <h4>2. Configure your tailwind config file</h4>
              <pre>{`import palette, { getTailwindColors } from 'tailwind-plugin-palette'

export default {
  plugins: [
    palette({
      colors: getTailwindColors(400),
      primary: "#ADCE91",
      dark: true,
      reversed: true,
      harmonize: true
    })
  ]
}`}</pre>
              <h4>3. Options</h4>
              <ul>
                <li>
                  <code>{'colors: Record<string, string>'}</code>: A colors object, where the key is the name of the
                  color and the value is the hexadecimal value of the color. eg,{' '}
                  <code>{'colors: { red: "#ff0000" }'}</code>
                </li>
                <li>
                  <code>primary: string</code>: Provide a hex value as primary color, automatically generate a secondary
                  color
                </li>
                <li>
                  <code>dark: boolean</code>: Reduce the brightness to adapt to the dark mode
                </li>
                <li>
                  <code>reversed: boolean</code>: Reverse the color value
                </li>
                <li>
                  <code>harmonize: boolean</code>: Make the palette more harmonious with the primary color(primary
                  required)
                </li>
              </ul>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
