import { css, FlattenSimpleInterpolation } from 'styled-components'
import { responsiveSpacing } from '../themes/defaultTheme'
import { bp } from './breakpointsFactory'
import { parseCssUnit } from './helpers'

const shorthandDefs = {
  // Margins
  m: ['margin'],
  ml: ['margin-left'],
  mt: ['margin-top'],
  mr: ['margin-right'],
  mb: ['margin-bottom'],
  my: ['margin-top', 'margin-bottom'],
  mx: ['margin-left', 'margin-right'],
  // Padding
  p: ['padding'],
  pl: ['padding-left'],
  pt: ['padding-top'],
  pr: ['padding-right'],
  pb: ['padding-bottom'],
  py: ['padding-top', 'padding-bottom'],
  px: ['padding-left', 'padding-right'],
  // Grid
  gap: ['grid-gap'],
} as const

/**
 * Testing
 * https://www.typescriptlang.org/docs/handbook/utility-types.html
 */

const shorthandValues = Object.keys(shorthandDefs).reduce((res, key) => {
  shorthandDefs[key].map((val) => res.push(val))
  return res
}, [] as string[])

export type spacingShorthands2 = Record<keyof typeof shorthandDefs, string>
export type hello = typeof shorthandDefs
export type hello2 = Omit<typeof shorthandValues, 'description'>
export type hello3 = {
  [K in keyof typeof shorthandDefs]: typeof shorthandDefs[K]
}

const shorthands = Object.keys(shorthandDefs).reduce((acc, key) => {
  acc[key] = (value: string) => () => {
    return css`
      ${shorthandDefs[key].map(
        (prop: string) => css`
          ${prop}: ${value};
        `
      )}
    `
  }
  return acc
}, {})

export type spacingShorthands = keyof typeof shorthandDefs

export type spacingFunctionArgs = {
  val: string
  cssProps: spacingShorthands | spacingShorthands[]
  options?: {
    multiplier?: number
    negative?: boolean
  }
}

type addSpacingProps = (
  props: spacingShorthands | spacingShorthands[],
  value: any
) => FlattenSimpleInterpolation

const addSpacingProps: addSpacingProps = (props = 'mb', value) => {
  if (typeof props === 'string') {
    return shorthands[props](value)
  } else if (Array.isArray(props)) {
    return css`
      ${props.map((prop) => {
        if (!shorthands[prop]) {
          console.warn(
            `addSpacingProp: the method ${prop} does not exist on spacing`
          )
          return null
        }
        return shorthands[prop](value)
      })}
    `
  }
}

const applyPropValueOptions = (value, options) => {
  // Leave early if we don't have a value
  if (!value) {
    return value
  }
  // Apply multiplier if its a number
  if (!isNaN(options?.multiplier)) {
    const unitParsed = parseCssUnit(value)
    if (unitParsed.number) {
      return `${unitParsed.number * options.multiplier}${unitParsed.unit}`
    }
  }
  // Apply negative number
  if (options?.negative) {
    const { number, unit } = parseCssUnit(value)
    return `-${number}${unit}`
  }
  return value
}

export type SpacingSizes = keyof typeof responsiveSpacing

export type SpacingFuncs = {
  [size in SpacingSizes]: (
    props: spacingShorthands | spacingShorthands[]
  ) => FlattenSimpleInterpolation
}

export type SpacingFuncsWithFunc = SpacingFuncs & {
  func: (args: spacingFunctionArgs) => FlattenSimpleInterpolation
}

export type spacingFactory = (args: {
  responsiveSpacing: typeof responsiveSpacing
  bp: Omit<bp, 'below' | 'only'>
}) => SpacingFuncsWithFunc

const spacingFactory: spacingFactory = ({ responsiveSpacing, bp }) => {
  // Generate spacing functions
  const spacingFunctions = Object.keys(responsiveSpacing).reduce((acc, key) => {
    // Make spacing key accessible as object (ie: spacing.gutter)
    acc[key] = (props, options = {}) => ({ theme }) => {
      // Map through all breakpoints for current spacing setting
      return Object.keys(responsiveSpacing[key]).map((bpKey) => {
        // value can either be a theme.spacingUnit.key or a regular unit (like 10px)
        const value = responsiveSpacing[key][bpKey]
        const unit = theme?.spacingUnit?.[value] || value
        if (bp?.[bpKey]) {
          return css`
            ${bp[bpKey]} {
              ${addSpacingProps(props, applyPropValueOptions(unit, options))};
            }
          `
        } else {
          if (bpKey === 'xs') {
            return css`
              ${addSpacingProps(props, applyPropValueOptions(unit, options))}
            `
          } else {
            console.warn(`Breakpoint key: ${bpKey} does not exist.`)
            return null
          }
        }
      })
    }
    return acc
  }, {} as SpacingFuncs)

  // Make generic spacing function
  const spacingFunction = ({ val, cssProps, options }: spacingFunctionArgs) => {
    return css`
      ${addSpacingProps(cssProps, applyPropValueOptions(val, options))};
    `
  }

  // Export function object
  return {
    ...spacingFunctions,
    func: spacingFunction,
  }
}

export default spacingFactory
