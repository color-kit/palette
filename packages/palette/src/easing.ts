type EasingFunction = (progress: number) => number

export type EasingKey = keyof typeof easings

export type Easing = EasingFunction | EasingKey

const pow = Math.pow
const sqrt = Math.sqrt
const sin = Math.sin
const cos = Math.cos
const PI = Math.PI
const c1 = 1.701_58
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * PI) / 3
const c5 = (2 * PI) / 4.5

// https://easings.net/
const bounceOut: EasingFunction = (x: number) => {
  const n1 = 7.5625
  const d1 = 2.75

  if (x < 1 / d1) {
    return n1 * x * x
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984_375
  }
}

export const easings = {
  easeInBack: (x: number) => {
    return c3 * x * x * x - c1 * x * x
  },
  easeInBounce: (x: number) => {
    return 1 - bounceOut(1 - x)
  },
  easeInCirc: (x: number) => {
    return 1 - sqrt(1 - pow(x, 2))
  },
  easeInCubic: (x: number) => {
    return x * x * x
  },
  easeInElastic: (x: number) => {
    return (
      x === 0 ? 0
      : x === 1 ? 1
      : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
    )
  },
  easeInExpo: (x: number) => {
    return x === 0 ? 0 : pow(2, 10 * x - 10)
  },
  easeInOutBack: (x: number) => {
    return x < 0.5 ?
        (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
  },
  easeInOutBounce: (x: number) => {
    return x < 0.5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
  },
  easeInOutCirc: (x: number) => {
    return x < 0.5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
  },
  easeInOutCubic: (x: number) => {
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
  },
  easeInOutElastic: (x: number) => {
    return (
      x === 0 ? 0
      : x === 1 ? 1
      : x < 0.5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
      : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1
    )
  },
  easeInOutExpo: (x: number) => {
    return (
      x === 0 ? 0
      : x === 1 ? 1
      : x < 0.5 ? pow(2, 20 * x - 10) / 2
      : (2 - pow(2, -20 * x + 10)) / 2
    )
  },
  easeInOutQuad: (x: number) => {
    return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
  },
  easeInOutQuart: (x: number) => {
    return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2
  },
  easeInOutQuint: (x: number) => {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2
  },
  easeInOutSine: (x: number) => {
    return -(cos(PI * x) - 1) / 2
  },
  easeInQuad: (x: number) => {
    return x * x
  },
  easeInQuart: (x: number) => {
    return x * x * x * x
  },
  easeInQuint: (x: number) => {
    return x * x * x * x * x
  },
  easeInSine: (x: number) => {
    return 1 - cos((x * PI) / 2)
  },
  easeOutBack: (x: number) => {
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
  },
  easeOutBounce: bounceOut,
  easeOutCirc: (x: number) => {
    return sqrt(1 - pow(x - 1, 2))
  },
  easeOutCubic: (x: number) => {
    return 1 - pow(1 - x, 3)
  },
  easeOutElastic: (x: number) => {
    return (
      x === 0 ? 0
      : x === 1 ? 1
      : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
    )
  },
  easeOutExpo: (x: number) => {
    return x === 1 ? 1 : 1 - pow(2, -10 * x)
  },
  easeOutQuad: (x: number) => {
    return 1 - (1 - x) * (1 - x)
  },
  easeOutQuart: (x: number) => {
    return 1 - pow(1 - x, 4)
  },
  easeOutQuint: (x: number) => {
    return 1 - pow(1 - x, 5)
  },
  easeOutSine: (x: number) => {
    return sin((x * PI) / 2)
  },
  linear: (x: number) => x,
}
