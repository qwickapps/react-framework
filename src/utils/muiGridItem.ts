import { Grid } from '@mui/material'

/**
 * Map QwickApps grid breakpoints onto both MUI Grid APIs:
 * - MUI v5/v6 legacy Grid: `item` + `xs`/`sm`/`md`/`lg`/`xl`
 * - MUI v6 Grid2 / MUI v7 Grid: `size` object or number
 *
 * Detection uses Grid.propTypes when present (dev). Production builds
 * emit both shapes: v7 deletes legacy props; v6 ignores `size`.
 */

export type GridBreakpointKey = 'span' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type GridBreakpointProps = Partial<Record<GridBreakpointKey, unknown>>

function pickBreakpoint(
  childProps: Record<string, unknown>,
  nested: Record<string, unknown>,
  key: GridBreakpointKey,
): unknown {
  return childProps[`data-grid-${key}`] ?? childProps[key] ?? nested[key]
}

export function readChildGridBreakpoints(
  childProps: Record<string, unknown>,
): GridBreakpointProps {
  const nested =
    childProps.gridProps && typeof childProps.gridProps === 'object'
      ? (childProps.gridProps as Record<string, unknown>)
      : {}
  return {
    span: pickBreakpoint(childProps, nested, 'span'),
    xs: pickBreakpoint(childProps, nested, 'xs'),
    sm: pickBreakpoint(childProps, nested, 'sm'),
    md: pickBreakpoint(childProps, nested, 'md'),
    lg: pickBreakpoint(childProps, nested, 'lg'),
    xl: pickBreakpoint(childProps, nested, 'xl'),
  }
}

function coerceSize(value: unknown): unknown {
  if (typeof value === 'string' && value !== 'auto' && value !== '') {
    const numeric = Number(value)
    return Number.isFinite(numeric) ? numeric : value
  }
  return value
}

function gridApi(): 'size' | 'legacy' | 'both' {
  const pt = (Grid as { propTypes?: { size?: unknown; item?: unknown } }).propTypes
  if (pt?.size && !pt?.item) return 'size'
  if (pt?.item && !pt?.size) return 'legacy'
  return 'both'
}

/**
 * Props to spread onto `@mui/material` Grid when wrapping a cell.
 * Returns null when the child has no breakpoint / span hints.
 */
export function toMuiGridItemProps(
  bp: GridBreakpointProps,
): Record<string, unknown> | null {
  if (bp.span != null && bp.span !== false) {
    const span = coerceSize(bp.span)
    const api = gridApi()
    if (api === 'size') return { size: span }
    if (api === 'legacy') return { item: true, xs: span }
    return { item: true, xs: span, size: span }
  }

  const sizeConfig: Record<string, unknown> = {}
  ;(['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((key) => {
    if (bp[key] != null && bp[key] !== false) {
      sizeConfig[key] = coerceSize(bp[key])
    }
  })

  if (Object.keys(sizeConfig).length === 0) {
    return null
  }

  const api = gridApi()
  if (api === 'size') return { size: sizeConfig }
  if (api === 'legacy') return { item: true, ...sizeConfig }
  return { item: true, ...sizeConfig, size: sizeConfig }
}

export function autoDistributeGridItemProps(
  columns: 1 | 2 | 3 | 4 | 5 | 6,
): Record<string, unknown> {
  const size = {
    xs: 12,
    sm: columns >= 3 ? 6 : 12 / Math.min(columns, 2),
    md: 12 / Math.min(columns, 3),
    lg: 12 / columns,
  }
  return toMuiGridItemProps(size) ?? { size }
}
