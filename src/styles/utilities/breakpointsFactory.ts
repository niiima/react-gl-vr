import { emSize } from './Converters'
import { breakpoints } from '../themes/defaultTheme'

export type Breakpoints = typeof breakpoints
export type BreakpointKeys = keyof Breakpoints

export type BreakpointSizes = Record<keyof Breakpoints, string>
export type BreakpointSizesWithoutXs = Omit<BreakpointSizes, 'xs'>
export type BreakpointKeysWithoutXs = Exclude<
  keyof BreakpointSizesWithoutXs,
  'xs'
>

export type bp = BreakpointSizesWithoutXs & {
  below: BreakpointSizesWithoutXs
  only: BreakpointSizes
}

type breakpointsFactory = (breakpoints: Breakpoints) => bp

export const breakpointsFactory: breakpointsFactory = breakpoints => ({
  sm: `@media (min-width: ${emSize(breakpoints.sm)})`,
  md: `@media (min-width: ${emSize(breakpoints.md)})`,
  lg: `@media (min-width: ${emSize(breakpoints.lg)})`,
  xl: `@media (min-width: ${emSize(breakpoints.xl)})`,
  xxl: `@media (min-width: ${emSize(breakpoints.xxl)})`,

  below: {
    sm: `@media (max-width: ${emSize(breakpoints.xs)})`,
    md: `@media (max-width: ${emSize(breakpoints.sm)})`,
    lg: `@media (max-width: ${emSize(breakpoints.md)})`,
    xl: `@media (max-width: ${emSize(breakpoints.lg)})`,
    xxl: `@media (max-width: ${emSize(breakpoints.xl)})`
  },

  only: {
    xs: `@media (max-width: ${emSize(breakpoints.sm)})`,
    sm: `@media (min-width: ${emSize(breakpoints.xs)} and max-width: ${emSize(
      breakpoints.md
    )})`,
    md: `@media (min-width: ${emSize(breakpoints.sm)} and max-width: ${emSize(
      breakpoints.lg
    )})`,
    lg: `@media (min-width: ${emSize(breakpoints.md)} and max-width: ${emSize(
      breakpoints.xl
    )})`,
    xl: `@media (min-width: ${emSize(breakpoints.lg)} and max-width: ${emSize(
      breakpoints.xxl
    )})`,
    xxl: `@media (min-width: ${emSize(breakpoints.xl)})`
  }
})

export default breakpointsFactory
