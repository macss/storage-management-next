import { StyledPaper } from '@components'
import { Warning } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'

interface DataNotFoundProps {
  /**
   * The message to be displayed when data is not found
   * 
   * @default 'Não foram encontrados dados'
   */
  message: string
}

/**
 * Default builder for Data Not Found Message
 */
const DataNotFound = ({ message = 'Não foram encontrados dados' }: DataNotFoundProps) => {
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
