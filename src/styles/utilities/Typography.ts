import { css } from 'styled-components'
export const globalTypeStyle = ({ theme }) => css`
  html {
    font-size: 62.5%;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: normal;
  }

  body {
    overflow-x: hidden;
    font-family: ${theme.fontFamily.serif};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.colors.text};
    ${theme.fonts.body()};
  }

  ::selection {
    background: ${theme.colors.primary};
    color: white;
  }

  strong {
    font-weight: bold;
  }

  *:focus {
    outline-color: ${theme.colors.primary};
  }

  a {
    font-family: ${theme.fontFamily.serif};
    cursor: pointer;
    position: relative;
    text-decoration: none;
    color: blue;
    &:hover {
      color: deeppink;
    }
  }

  .link {
    display: inline-block;
    border-bottom: ${theme.colors.secondary};
    transition: border-color ${theme.trans.fast};

    &:hover {
      border-color: transparent;
    }
  }

  .sans {
    font-family: ${theme.fontFamily.sans};
  }

  .serif {
    font-family: ${theme.fontFamily.serif};
  }
`
