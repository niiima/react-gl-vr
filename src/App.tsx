import React from 'react'
import { GlobalStyle } from './styles/utilities/Global'
import styled, { css, ThemeProvider } from 'styled-components'
import theme from './styles/themes/defaultTheme'

import Hydra from './components/Hydra'
import GL from './components/GL'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        {/* <Hydra /> */}
        <GL />
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div(
  ({ theme }) => css`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: black;
  `
)

export default App
