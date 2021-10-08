import React from 'react'
import { Box, Container } from '@material-ui/core'
import Copyright from '@components/Copyright'

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