import React, { useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Brightness2, Brightness7, ExitToApp } from '@material-ui/icons'
import ThemeContext from '@contexts/ThemeContext'
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
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Storage Management
        </Typography>
        <IconButton onClick={toggleTheme} sx={{ color: 'white' }}>
          {mode === 'dark' ? <Brightness7 /> : <Brightness2 />}
        </IconButton>
        <IconButton onClick={() => auth.signOut()} sx={{ color: 'white' }}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default MainLayoutAppBar
