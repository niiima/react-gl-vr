import { css, DefaultTheme } from 'styled-components'
import fontFactory, { ResponsiveFonts } from '../utilities/fontFactory'
import defaultTheme from '../themes/defaultTheme'

export const responsiveFonts: ResponsiveFonts = {
  small: '14px/1.2',
  body: {
    xs: '200px/1,2',
    lg: '18px/1.2',
  },
  title: '50px/1.2',
  h1: {
    xs: {
      size: '80px/50px',
      css: css`
        text-transform: uppercase;
      `,
    },
    lg: '160px/1.2',
  },
  h2: {
    xs: '24px/1.2',
    lg: '40px/1.2',
  },
  h3: {
    xs: '50px/1.2',
    lg: '24px/1.2',
  },
}

const theme: DefaultTheme = {
  ...defaultTheme,
  colors: {
    primary: 'green',
    secondary: 'orange',
    text: 'white',
    border: 'red',
    background: 'rgba(0,0,0,.8)',
  },
  fonts: fontFactory({ responsiveFonts, bp: defaultTheme.bp }),
  defaultStyle: ({ theme }) => css`
    body {
      background: ${theme?.colors?.background};
    }
  `,
}

export default theme
