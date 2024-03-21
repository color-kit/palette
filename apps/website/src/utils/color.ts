import { colorsNamed, differenceEuclidean, formatHex, nearest, random } from 'culori'

const names = Object.keys(colorsNamed)

export const getColorName = (hex: string) => nearest<string>(names, differenceEuclidean())(hex, 1)[0]!

export const randomColor = () => {
  const hex = formatHex(random())
  const name = getColorName(hex)
  return { hex, name }
}
