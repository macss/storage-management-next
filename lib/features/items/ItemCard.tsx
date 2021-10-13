import React from 'react'
import { Item } from '@models'
import { Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemText, Tooltip } from '@mui/material'
import { capitalize, getDateFromMilis } from '@utils'
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
