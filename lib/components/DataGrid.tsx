import { Common } from '@models'
import { Loop } from '@mui/icons-material'
import { LoadingButton as Button } from '@mui/lab'
import { Grid, Fade, Collapse, GridSize } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface DatGridProps<I> {
  /**
   * Boolean variable to control the state of the Load More button
   */
  isNextPageLoading?: boolean
  /**
   * The data that needs to be displayed
   */
  items: I[]
  /**
   * The callback function that should be triggered when requested to load the next page of data
   */
  loadNextPage?: () => void,
  /**
   * Used to determine how the items should be rendered
   */
  renderItem: (item: I) => JSX.Element
  /**
   * Boolean variable to control wheter or not the Load More button should be shown
   */
  haveNextPage?: boolean,
  /**
   * Custom breakpoints grid sizes
   */
  breakpoints?: {
    /**
     * Extra-small: 0px
     */
    xs?: boolean | GridSize
    /**
     * Small: 600px
     */
    sm?: boolean | GridSize
    /**
     * Medium: 900px
     */
    md?: boolean | GridSize
    /**
     * Large: 1200px
     */
    lg?: boolean | GridSize
    /**
     * Extra-large: 1536px
     */
    xl?: boolean | GridSize
  }
}

/**
 * Displays a grid with the provided data, the grid is 4 columns for the LG breakpoint and 1 column for the XS breakpoint
 */

const DataGrid = <I extends Common>({
  haveNextPage = false,
  isNextPageLoading = false,
  items,
  loadNextPage = () => {},
  renderItem,
  breakpoints
}: DatGridProps<I>) => {

  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Grid container spacing={3}>
        { items.map((item) => <Grid item lg={3} xs={12} key={item.id} {...breakpoints}> { renderItem(item) } </Grid>) }
      </Grid>
      <Collapse in={haveNextPage} sx={{mt: 3}}>
        <Fade in={haveNextPage}>
          <Button
            loading={isNextPageLoading || !haveNextPage}
            onClick={loadNextPage}
            variant="contained"
            endIcon={<Loop sx={{ transform: 'scaleX(-1)' }}/>}
          >
            Carregar Mais
          </Button>
        </Fade>      
      </Collapse>
    </Box>
  )
}

export default DataGrid
