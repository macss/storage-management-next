import {
  Badge,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar
} from '@material-ui/core'
import { Add, Home, Storage } from '@material-ui/icons'
import { useRouter } from 'next/router'
import React from 'react'

const MainLayoutDrawer = ({ drawerWidth }: { drawerWidth: number }) => {
  const router = useRouter()
  
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      {/** Main Page */}
      <Divider />
      <List component="nav">
        <ListItem button onClick={() => router.push('/')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Página Inicial" />
        </ListItem>
      </List>
      <Divider />
      {/** Deposits navigation */}
      <List 
        component="nav"
        aria-labelledby="deposits-subheader"
        subheader={
          <ListSubheader component="div" id="deposits-subheader">
            Depósitos
          </ListSubheader>
        }
      >
        <ListItem button onClick={() => router.push('/deposits')}>
          <ListItemIcon>
            <Storage />
          </ListItemIcon>
          <ListItemText primary="Todos os depósitos" />
        </ListItem>
        <ListItem button onClick={() => router.push('/deposits/new')}>
            <ListItemIcon>
              <Badge badgeContent={<Add />}>
                <Storage />
              </Badge>
            </ListItemIcon>
          <ListItemText primary="Cadastrar depósito" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default MainLayoutDrawer
