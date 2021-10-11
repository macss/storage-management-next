import React, { useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { Brightness2, Brightness7, ExitToApp } from '@mui/icons-material'
import { ThemeContext } from '@contexts'
import { auth } from '@config/firebaseConfig'

const MainLayoutAppBar = ({ drawerWidth }: { drawerWidth: number }) => {
  const {
    theme: {
      palette: { mode }
    },
    toggleTheme
  } = useContext(ThemeContext)

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: theme => theme.zIndex.drawer + 1}}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Storage Management
        </Typography>
        <IconButton onClick={toggleTheme} >
          {mode === 'dark' ? <Brightness7 /> : <Brightness2 />}
        </IconButton>
        <IconButton onClick={() => auth.signOut()} >
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default MainLayoutAppBar
