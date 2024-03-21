import type { ButtonProps } from '@nextui-org/react'

import { useRef } from 'react'

import { Button } from '@nextui-org/react'

import { usePropsValue } from '../utils/use-props-value'

export const ColorPicker = ({
  defaultValue,
  onChange,
  value,
  ...props
}: { defaultValue?: string; onChange?: (value: string) => void; value?: string } & Omit<ButtonProps, 'onChange'>) => {
  const ref = useRef<HTMLInputElement>(null)

  const [val, setVal] = usePropsValue<string>({ defaultValue: defaultValue ?? '', onChange, value })

  return (
    <Button
      isIconOnly
      onClick={() => {
        ref.current?.click()
      }}
      radius="full"
      style={{
        backgroundColor: val ?? '#fff',
        backgroundImage:
          val ? 'none' : (
            `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')`
          ),
        zIndex: 10,
      }}
      {...props}
    >
      <input
        className="invisible absolute left-1/2 top-1/2 size-1"
        defaultValue={defaultValue}
        onChange={e => setVal(e.target.value)}
        ref={ref}
        type="color"
        value={val}
      />
    </Button>
  )
}
