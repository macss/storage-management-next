import React from 'react'
import { Item } from '@models'
import { Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemText, Tooltip } from '@mui/material'
import { capitalize, checkDefined, getDateFromMilis } from '@utils'
import { useRouter } from 'next/router'
import { Visibility } from '@mui/icons-material'

interface ItemCardProps {
  item: Item
}

const ItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter()

  return (
    <Card>
      <CardHeader title={item.name} subheader={`Classificação: ${capitalize(item.type)}`}/>
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary="Código SAP" secondary={checkDefined(item.sap_code)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Código Fornecedor" secondary={checkDefined(item.supplier_code)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Descrição" secondary={checkDefined(item.details)} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Data de criação" secondary={getDateFromMilis(item.created_at)} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Tooltip title="Detalhes">
          <IconButton onClick={() => router.push(`/items/${item.id}`)}>
            <Visibility />
          </IconButton>
        </Tooltip>        
      </CardActions>
    </Card>
  )
}

export default ItemCard
