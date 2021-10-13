import React, { useContext } from 'react'
import { AppBar, IconButton, PaletteMode,  Toolbar, Typography } from '@mui/material'
import { Brightness2, Brightness7, ExitToApp } from '@mui/icons-material'
import { ThemeContext } from '@contexts'
import { auth } from '@config/firebaseConfig'
import { SxProps } from '@mui/system'

interface ToggleThemeProps {
  onClick: () => void,
  mode: PaletteMode,
  sx: SxProps
}

const ToggleTheme = (props: ToggleThemeProps) => {
  const { onClick, mode, sx } = props 
  return (
    <IconButton onClick={onClick} sx={{
      transform: mode === 'dark' ? 'rotate(-45deg)' : 'rotate(45deg)',
      transition: theme => theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard
      }),
      ...sx
    }}>
      {mode === 'dark' ? <Brightness7 /> : <Brightness2 />}
    </IconButton>
  )
}

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
      sx={{ 
        zIndex: theme => theme.zIndex.drawer + 1,
        transition: theme => theme.transitions.create('background-color', {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard
        })
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Storage Management
        </Typography>
        <ToggleTheme onClick={toggleTheme} mode={mode} sx={{
          color: 'primary.contrastText'
        }}/>
        <IconButton onClick={() => auth.signOut()} sx={{
          color: 'primary.contrastText'
        }}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default MainLayoutAppBar
