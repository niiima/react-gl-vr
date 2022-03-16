import styled, { css } from 'styled-components'

import { applyModifier } from '../../styles/utilities'

export const P = styled.p(
  ({ theme }) => css`
    ${theme.fonts.body()}

    ${applyModifier(
      'small',
      css`
        font-size: 0.8rem;
      `
    )}
    ${applyModifier(
      'large',
      css`
        font-size: 9rem;
      `
    )}
  `
)

export const H1 = styled.h1(
  ({ theme }) => css`
    ${theme.fonts.h1()}
  `
)

export const H2 = styled.h2(
  ({ theme }) => css`
    ${theme.fonts.h2()}
  `
)

export const H3 = styled.h3(
  ({ theme }) => css`
    ${theme.fonts.title?.()}
  `
)
