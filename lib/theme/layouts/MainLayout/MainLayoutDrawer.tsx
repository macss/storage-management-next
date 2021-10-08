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
import { Add, Folder, Home, People, Storage } from '@material-ui/icons'
import { Database } from '@models'
import { useRouter } from 'next/router'
import React from 'react'

interface NavSectionProps {
  mainRoute: keyof Database
  title: string
  listAllText: string
  addOneText: string
  icon: React.ReactNode
}

const NavSection = ({ title, icon, listAllText, addOneText, mainRoute }: NavSectionProps) => {
  const router = useRouter()
  return (
    <>
      <List 
        component="nav"
        aria-labelledby={`${listAllText}-subheader`}
        subheader={
          <ListSubheader component="div" id={`${listAllText}-subheader`}>
            {title}
          </ListSubheader>
        }
      >
        <ListItem button onClick={() => router.push(`/${mainRoute}`)}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={listAllText} />
        </ListItem>
        <ListItem button onClick={() => router.push(`/${mainRoute}/new`)}>
            <ListItemIcon>
              <Badge badgeContent={<Add />}>
                {icon}
              </Badge>
            </ListItemIcon>
          <ListItemText primary={addOneText} />
        </ListItem>
      </List>
      <Divider />
    </>
  )
}

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
      <NavSection 
        title="Depósitos" 
        icon={<Storage />} 
        listAllText="Todos os depósitos" 
        addOneText="Cadastrar depósito"
        mainRoute="deposits"
      />
      {/** Items navigation */}
      <NavSection 
        title="Itens" 
        icon={<Folder />} 
        listAllText="Todos os itens" 
        addOneText="Cadastrar item"
        mainRoute="items"
      />
      {/** Users navigation */}
      <NavSection 
        title="Usuários" 
        icon={<People />} 
        listAllText="Todos os usuários" 
        addOneText="Cadastrar usuário"
        mainRoute="users"
      />
    </Drawer>
  )
}

export default MainLayoutDrawer
