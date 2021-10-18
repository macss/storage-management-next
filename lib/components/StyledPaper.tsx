import { Paper } from '@mui/material'
import { SxProps } from '@mui/system'
import React from 'react'

/**
 * Basic paper to use as background throughout the APP
 */

const StyledPaper = ({ children, sx }: React.PropsWithChildren<{sx?: SxProps}>) => {
  return (
    <Paper sx={{flexGrow: 1, p: 2, minHeight: '50vh', ...sx}}>
      {children}
    </Paper>
  )
}

StyledPaper.displayName = 'Custom Paper Container'

export default StyledPaper
