import React, { useContext } from 'react'
import { AppBar, IconButton, PaletteMode, Toolbar, Typography } from '@mui/material'
import { Brightness2, Brightness7, ExitToApp } from '@mui/icons-material'
import { ThemeContext } from '@contexts'
import { auth } from '@config/firebaseConfig'
import { styled } from '@mui/system'

interface ToggleThemeProps {
  onClick: () => void,
  mode: PaletteMode
}

const ToggleTheme = styled((props: ToggleThemeProps) => {
  const { onClick, mode, ...other } = props 
  return (
    <IconButton onClick={onClick} {...other}>
      {mode === 'dark' ? <Brightness7 /> : <Brightness2 />}
    </IconButton>
  )
})(({theme, mode}) => ({
  transform: mode === 'dark' ? 'rotate(-45deg)' : 'rotate(45deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.standard
  })
}))

const MainLayoutAppBar = () => {
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
        <ToggleTheme onClick={toggleTheme} mode={mode}/>
        <IconButton onClick={() => auth.signOut()} >
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default MainLayoutAppBar
