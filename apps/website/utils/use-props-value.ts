import type { SetStateAction } from 'react'
import { useRef, useState } from 'react'

import { useMemoizedFn } from './use-memoized-fn'

type Options<T> = {
  defaultValue: T
  onChange?: (v: T) => void
  value?: T
}

export function usePropsValue<T>(options: Options<T>) {
  const { defaultValue, onChange, value } = options
  const [, forceUpdate] = useState<unknown[]>([])
  const stateRef = useRef<T>(value === undefined ? defaultValue : value)
  // 如果受控，保持更新
  if (value !== undefined) {
    stateRef.current = value
  }

  const setState = useMemoizedFn((v: SetStateAction<T>) => {
    const nextValue = typeof v === 'function' ? (v as (prevState: T) => T)(stateRef.current) : v
    if (nextValue === stateRef.current) return
    stateRef.current = nextValue
    forceUpdate([])
    return onChange?.(nextValue)
  })
  return [stateRef.current, setState] as const
}
