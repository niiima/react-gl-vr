import Color from 'color'
import { NormalizedNumber } from '../../types'

const color = {
  darken: (color: string, percent: NormalizedNumber | number) =>
    Color(color).darken(percent).hex(),
  lighten: (color: string, percent: NormalizedNumber | number) =>
    Color(color).lighten(percent).hex(),
  rotate: (color: string, degree: NormalizedNumber | number) =>
    Color(color).rotate(degree).hex(),
  rgba: (color: string, alpha: NormalizedNumber | number) =>
    Color(color).alpha(alpha).string(),
  hsla: (color: string, alpha: NormalizedNumber | number) =>
    Color(color).alpha(alpha).hsl().string(),
  isDark: (color: string) => Color(color).isDark(),
  isLight: (color: string) => Color(color).isLight(),
}

// export const createTints = (startColor, steps = 10) => {
//   const increment = 100 / steps
//   const convertedColor = Color(startColor).hsl()
//   return [...new Array(steps)].map((step, i) => {
//     convertedColor.color[2] = increment * (i + 1)
//     return convertedColor.hex()
//   })
// }

export const createMixColorSteps = (startColor, endColor, steps = 10) => {
  const increment = 1 / steps
  const color = Color(startColor)
  return [...new Array(steps)].map((step, i) => {
    return color.mix(Color(endColor), increment * (i + 1))
  })
}

export default color
