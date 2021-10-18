import { Database } from '@models'
import { Loop } from '@mui/icons-material'
import { LoadingButton as Button } from '@mui/lab'
import { Grid, Fade, Collapse } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface DatGridProps<P extends keyof Database> {
  /**
   * Boolean variable to control the state of the Load More button
   */
  isNextPageLoading: boolean
  /**
   * The data that needs to be displayed
   */
  items: Database[P][string][]
  /**
   * The callback function that should be triggered when requested to load the next page of data
   */
  loadNextPage: () => void,
  /**
   * Used to determine how the items should be rendered
   */
  renderItem: (item: Database[P][string]) => JSX.Element
  /**
   * Boolean variable to control wheter or not the Load More button should be shown
   */
  haveNextPage: boolean
  /**
   * Used as a helper to determine which type of data to expect
   */
  path: P
}

/**
 * Displays a grid with the provided data 
 */

const DataGrid = <P extends keyof Database>({
  haveNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  renderItem
}: DatGridProps<P>) => {

  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Grid container spacing={3}>
        { items.map((item) => <Grid item lg={3} xs={12} key={item.id}> { renderItem(item) } </Grid>) }
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
