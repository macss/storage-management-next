import { StyledPaper } from '@components'
import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingIndicator = () => {
  return (
    <StyledPaper sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress />
    </StyledPaper>
  )
}

export default LoadingIndicator
