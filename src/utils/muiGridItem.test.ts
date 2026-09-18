import {
  autoDistributeGridItemProps,
  readChildGridBreakpoints,
  toMuiGridItemProps,
} from './muiGridItem'

describe('muiGridItem helpers', () => {
  it('reads xs from props, data-grid-*, and nested gridProps', () => {
    expect(readChildGridBreakpoints({ xs: 12, sm: 6 })).toMatchObject({ xs: 12, sm: 6 })
    expect(readChildGridBreakpoints({ 'data-grid-lg': 3 })).toMatchObject({ lg: 3 })
    expect(
      readChildGridBreakpoints({ gridProps: { xs: 12, sm: 6, md: 6, lg: 3 } }),
    ).toMatchObject({ xs: 12, sm: 6, md: 6, lg: 3 })
  })

  it('emits Grid2 size when MUI Grid uses the size API', () => {
    const props = toMuiGridItemProps({ xs: 12, sm: 6, md: 6, lg: 3 })
    expect(props).toEqual(
      expect.objectContaining({
        size: { xs: 12, sm: 6, md: 6, lg: 3 },
      }),
    )
    // MUI v7 Grid.propTypes.size is set — do not also send removed `item`/`xs`.
    if (props && 'item' in props) {
      expect(props).toMatchObject({ item: true, xs: 12, sm: 6, md: 6, lg: 3 })
    }
  })

  it('caps columns={4} auto-distribute at md=3 (12/3) so callers must not use it for 2×2', () => {
    const props = autoDistributeGridItemProps(4)
    expect(props).toMatchObject({
      size: {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
      },
    })
  })
})
