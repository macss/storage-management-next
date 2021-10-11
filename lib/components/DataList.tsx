import { Database } from '@models'
import { LoadingButton as Button } from '@mui/lab'
import { Grid, Fade, Collapse } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface DataListProps<P extends keyof Database> {
  isNextPageLoading: boolean
  items: Database[P][string][]
  loadNextPage: () => void,
  renderItem: (item: Database[P][string]) => JSX.Element
  haveNextPage: boolean
  path: P
}

const DataList = <P extends keyof Database>({
  haveNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  renderItem
}: DataListProps<P>) => {

  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Grid container spacing={3}>
        { items.map((item) => <Grid item lg={3} xs={12} key={item.id}> { renderItem(item) } </Grid>) }
      </Grid>
      <Collapse in={haveNextPage}>
        <Fade in={haveNextPage}>
          <Button
            loading={isNextPageLoading || !haveNextPage}
            onClick={loadNextPage}
          >
            Carregar Mais
          </Button>
        </Fade>      
      </Collapse>
    </Box>
  )
}

export default DataList
