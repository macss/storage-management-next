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
} from '@mui/material'
import { Add, Folder, Home, People, Storage } from '@mui/icons-material'
import { Database } from '@models'
import { useRouter } from 'next/router'
import React from 'react'

interface NavSectionProps {
  /**
   * The main route of the section
   */
  mainRoute: keyof Database
  /**
   * The title of the section
   */
  title: string
  /**
   * The text of the `list all` button
   */
  listAllText: string
  /**
   * The text of the `add one` button
   */
  addOneText: string
  /**
   * The icon of the buttons
   */
  icon: React.ReactNode
}

/**
 * Creates a NavSection consisting of a View All button and a Create New button
 */
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
          <ListItemText primary="P??gina Inicial" />
        </ListItem>
      </List>
      <Divider />
      {/** Deposits navigation */}
      <NavSection 
        title="Dep??sitos" 
        icon={<Storage />} 
        listAllText="Todos os dep??sitos" 
        addOneText="Cadastrar dep??sito"
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
        title="Usu??rios" 
        icon={<People />} 
        listAllText="Todos os usu??rios" 
        addOneText="Cadastrar usu??rio"
        mainRoute="users"
      />
    </Drawer>
  )
}

export default MainLayoutDrawer
