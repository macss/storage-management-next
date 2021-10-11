import React from 'react'
import { Box, Container } from '@mui/material'
import { Copyright } from '@components'

const MainLayoutFooter = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pb: 4 }}>
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </Box>
  )
}

export default MainLayoutFooter
