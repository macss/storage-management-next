import React from 'react'
import { Item } from '@models'
import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import { getDateFromMilis } from '@utils'

interface ItemCardProps {
  item: Item
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name} <br /> {item.type}
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Código SAP" secondary={item.sap_code ?? 'Não especificado'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Código Fornecedor" secondary={item.supplier_code ?? 'Não especificado'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Descrição" secondary={item.details ?? 'Não especificado'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Data de criação" secondary={getDateFromMilis(item.created_at)} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default ItemCard
