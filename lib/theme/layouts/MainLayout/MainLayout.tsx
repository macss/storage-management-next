import React from 'react'
import { Box, Toolbar } from '@mui/material'
import MainLayoutAppBar from './MainLayoutAppBar'
import MainLayoutDrawer from './MainLayoutDrawer'
import MainLayoutFooter from './MainLayoutFooter'

/**
 * Drawer fixed width
 */
const drawerWidth = 240

/**
 * The main layout of the application
 */
const MainLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MainLayoutAppBar />
      <MainLayoutDrawer {...{ drawerWidth }} />
      <Box
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexGrow: 1
        }}
      >
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, minHeight: '90vh' }}
        >
          <Toolbar />
          {children}
        </Box>
        <MainLayoutFooter />
      </Box>
    </Box>
  )
}

export default MainLayout
