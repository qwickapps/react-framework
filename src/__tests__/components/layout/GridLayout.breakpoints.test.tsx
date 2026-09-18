import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { GridLayout } from '../../../components/layout/GridLayout'
import { GridCell } from '../../../components/layout/GridCell'
import GridCellWrapper from '../../../components/layout/GridCellWrapper'

function isSized(html: string): boolean {
  return (
    html.includes('MuiGrid-grid-xs-12') &&
    html.includes('MuiGrid-grid-sm-6') &&
    html.includes('MuiGrid-grid-md-6') &&
    html.includes('MuiGrid-grid-lg-3')
  )
}

describe('GridLayout breakpoint wiring', () => {
  it('maps GridCell xs/sm/md/lg onto MUI Grid item size (legacy Grid and Grid2)', () => {
    const { container } = render(
      <GridLayout spacing="large" equalHeight width="100%">
        <GridCell xs={12} sm={6} md={6} lg={3}>
          <div>one</div>
        </GridCell>
        <GridCell xs={12} sm={6} md={6} lg={3}>
          <div>two</div>
        </GridCell>
        <GridCell xs={12} sm={6} md={6} lg={3}>
          <div>three</div>
        </GridCell>
        <GridCell xs={12} sm={6} md={6} lg={3}>
          <div>four</div>
        </GridCell>
      </GridLayout>,
    )

    const html = container.innerHTML
    expect(html).toContain('one')
    expect(isSized(html)).toBe(true)
  })

  it('reads nested gridProps when createSerializableView strips top-level xs', () => {
    const Nested = (props: { gridProps?: unknown; children?: React.ReactNode }) => (
      <div>{props.children}</div>
    )
    const { container } = render(
      <GridLayout spacing="large" equalHeight width="100%">
        <Nested gridProps={{ xs: 12, sm: 6, md: 6, lg: 3 }}>nested</Nested>
      </GridLayout>,
    )

    const html = container.innerHTML
    expect(html).toContain('nested')
    expect(isSized(html)).toBe(true)
  })

  it('GridCellWrapper applies xs/sm/md/lg onto MUI Grid item size', () => {
    const { container } = render(
      <GridCellWrapper xs={12} sm={6} md={6} lg={3}>
        wrapped
      </GridCellWrapper>,
    )
    expect(container.innerHTML).toContain('wrapped')
    expect(isSized(container.innerHTML)).toBe(true)
  })

  it('does not use columns={4} auto-distribute for explicit cell breakpoints', () => {
    const { container } = render(
      <GridLayout spacing="large" equalHeight width="100%">
        <GridCell xs={12} sm={6} md={6} lg={3}>
          <div>card</div>
        </GridCell>
      </GridLayout>,
    )
    const html = container.innerHTML
    expect(html).toContain('MuiGrid-grid-md-6')
    expect(html).not.toContain('MuiGrid-grid-md-4')
  })
})
