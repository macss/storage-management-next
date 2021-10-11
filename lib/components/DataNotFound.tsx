import { StyledPaper } from '@components'
import { Warning } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

const DataNotFound = ({ message }: {message: string}) => {
  return (
    <StyledPaper sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Warning sx={{color: 'yellow', fontSize: 48}}/>
      <Typography variant="h6">
        {message}
      </Typography>
    </StyledPaper>
  )
}

export default DataNotFound
