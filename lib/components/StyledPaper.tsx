import { Paper } from '@material-ui/core'
import React from 'react'

const StyledPaper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Paper sx={{flexGrow: 1, p: 2, minHeight: '50vh'}}>
      {children}
    </Paper>
  )
}

export default StyledPaper
