// import {} from 'styled-components'
// import theme from '../themes/DefaultTheme'
// declare module 'styled-components' {
//   type Theme = typeof theme
//   export interface DefaultTheme extends Theme {}
// }

// import original module declarations
import 'styled-components'
// https://styled-components.com/docs/api#usage-with-typescript
import {} from 'styled-components/cssprop'
import { FlattenSimpleInterpolation } from 'styled-components'
import {
  SpacingFuncs,
  spacingFuncs,
  SpacingFuncsWithFunc,
  SpacingSizes,
} from './utilities/spacingFactory'
import { fontFuncs } from './utilities/fontFactory'
import {
  responsiveFonts,
  breakpoints,
  contentWidth,
  colors,
  aspect,
  fontFamily,
  icons,
  trans,
  borderWidth,
} from './themes/defaultTheme'
import { bp, BreakpointSizes } from './utilities/breakpointsFactory'
import color from './utilities/Colors'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors
    color: typeof color
    breakpoints: typeof breakpoints
    bp: bp
    spacingUnit?: {
      [size in spacing]: string
    }
    spacing: SpacingFuncsWithFunc
    responsiveSpacing: {
      [size in SpacingSizes]: {
        [bp in BreakpointSizes]?: spacing | string
      }
    }
    responsiveFonts?: ResponsiveFonts
    grid?: {
      columns: number
    }
    fontFamily: typeof fontFamily
    fonts: fontFuncs
    aspect: typeof aspect
    contentWidth: typeof contentWidth
    icons: typeof icons
    trans: typeof trans
    borderWidth: typeof borderWidth
    border: {
      small?: () => ({ theme: DefaultTheme }) => string
      large?: () => ({ theme: DefaultTheme }) => string
    }
    defaultStyle?: ({ theme }: { theme: DefaultTheme | undefined }) => void
  }
}
