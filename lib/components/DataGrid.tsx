import { Database } from '@models'
import { Loop } from '@mui/icons-material'
import { LoadingButton as Button } from '@mui/lab'
import { Grid, Fade, Collapse } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface DatGridProps<P extends keyof Database> {
  isNextPageLoading: boolean
  items: Database[P][string][]
  loadNextPage: () => void,
  renderItem: (item: Database[P][string]) => JSX.Element
  haveNextPage: boolean
  path: P
}

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
