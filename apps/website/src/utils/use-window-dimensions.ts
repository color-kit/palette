/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from 'react'

type WindowDimentions = {
  height: number | undefined
  width: number | undefined
}

export const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    height: undefined,
    width: undefined,
  })
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return (): void => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowDimensions
}
