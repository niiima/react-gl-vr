import { css, DefaultTheme } from 'styled-components'

import { remSize } from '../utilities/Converters'
import breakpointsFactory, {
  bp as bpObject,
} from '../utilities/breakpointsFactory'
import spacingFactory from '../utilities/spacingFactory'
import fontFactory, { fontFuncs } from '../utilities/fontFactory'
import color from '../utilities/Colors'

export const colors = {
  primary: 'red',
  secondary: 'green',
  text: 'black',
  border: 'black',
  background: 'white',
}

export const breakpoints = {
  xs: 0,
  sm: 550,
  md: 870,
  lg: 1200,
  xl: 1600,
  xxl: 1800,
}

export const spacingUnit = {
  xs: remSize(5),
  sm: remSize(10),
  md: remSize(15),
  lg: remSize(40),
  section: remSize(160),
  gutter: remSize(40),
  gap: remSize(20),
  container: remSize(1440),
  pixel: '1px',
}

export const responsiveSpacing = {
  xs: {
    xs: remSize(5),
    lg: remSize(10),
  },
  sm: {
    xs: remSize(10),
    lg: remSize(15),
  },
  md: {
    xs: remSize(15),
    lg: 'lg',
  },
  lg: {
    xs: 'lg',
    lg: '12rem',
  },
  section: {
    xs: remSize(100),
  },
  gutter: {
    xs: 'md',
    lg: 'gutter',
  },
  container: {
    xs: '10px',
    md: 'lg',
    lg: '5vw',
  },
  pixel: {
    xs: '1px',
  },
}

export const grid = {
  columns: 12,
}

export const fontFamily = {
  sans: `'SuisseIntl', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`,
  serif: `'Suisse Works', times, serif`,
}

const fontDefs = {
  xs: '16px/1.2',
}

export const responsiveFonts = {
  small: fontDefs.xs,
  body: {
    xs: fontDefs.xs,
    lg: '18px/1.2',
  },
  title: {
    xs: fontDefs.xs,
    lg: '24px/1.2',
  },
  h1: {
    xs: {
      size: '40px/50px',
      css: css`
        text-transform: uppercase;
      `,
    },
    lg: '60px/1.2',
  },
  h2: {
    xs: '24px/1.2',
    lg: '40px/1.2',
  },
  h3: {
    xs: fontDefs.xs,
    lg: '24px/1.2',
  },
}

export const aspect = {
  portrait: 7 / 6,
  landscape: 2 / 3,
  square: 1,
  widescreen: 9 / 16,
  panorama: 11 / 16,
}

export const contentWidth = {
  small: remSize(600),
  large: remSize(1200),
}

export const icons = {
  small: remSize(40),
  medium: remSize(80),
  large: remSize(160),
}

export const trans = {
  fast: `0.1s ease`,
  slow: `1s ease`,
}

export const borderWidth = {
  small: remSize(1),
  large: remSize(3),
}

/**
 * Usage:
 * {
 *  border-left: ${theme.border.large()}
 * }
 */
export const border = {
  large: () => ({ theme }) =>
    `${theme.borderWidth.large} solid ${theme.colors.border};`,
  small: () => ({ theme }) =>
    `${theme.borderWidth.small} solid ${theme.colors.border};`,
}

const bp: bpObject = breakpointsFactory(breakpoints)
console.log('bp', bp)
const spacing = spacingFactory({
  responsiveSpacing,
  bp: {
    sm: bp.sm,
    md: bp.md,
    lg: bp.lg,
    xl: bp.xl,
    xxl: bp.xxl,
  },
})

const fonts: fontFuncs = fontFactory({ responsiveFonts, bp })

/**
 * TODO: Add types properly with
 * const theme: DefaultTheme = {
 *  ...
 * }
 *
 * export default theme
 */

const theme: DefaultTheme = {
  colors,
  breakpoints,
  color,
  bp,
  spacingUnit,
  grid,
  fontFamily,
  aspect,
  fonts,
  responsiveFonts,
  spacing,
  responsiveSpacing,
  contentWidth,
  trans,
  icons,
  borderWidth,
  border,
}

export default theme
