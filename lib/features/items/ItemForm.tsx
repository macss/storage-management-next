import { Common, Item, ItemTypes } from '@models'
import { Box, Fade, MenuItem, TextField, Typography } from '@mui/material'
import { capitalize } from '@utils'
import React from 'react'

interface ItemFormProps {
  formId: string
  item?: Item
  title?: string
  onSubmit: (formData: { item: Omit<Item, keyof Common> }) => void
}

const ItemForm = ({ formId, item, title = "Cadastrar Item", onSubmit }: ItemFormProps) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    
    const data = {
      name: form.get('name') as string,
      type: item ? item.type : form.get('type') as ItemTypes,
      sap_code: form.get('sap_code') as string,
      supplier_code: form.get('supplier_code') as string,
      details: form.get('details') as string,
    }

    onSubmit({ item: data})
  }

  return (
    <Fade in>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{
          '& .MuiTextField-root': { 
            width: '100%',
            my: 1
          },
        }}
        id={formId}
      >
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <TextField 
          label="Nome"
          id="name"
          name="name"
          defaultValue={item?.name ?? ''}
          variant="standard"
          placeholder="Nome do item"
          required
        />
        <TextField 
          id="type"
          name="type"
          label="Tipo de item"
          defaultValue={item?.type ?? ''}
          select
          required
          disabled={Boolean(item)}
          variant="standard"
        >
          {
            Object.values(ItemTypes).map((type) => (
              <MenuItem key={type} value={type}>
                {capitalize(type)}
              </MenuItem>
            ))
          }
        </TextField>
        <TextField 
          label="Código SAP"
          id="sap_code"
          name="sap_code"
          defaultValue={item?.sap_code ?? ''}
          variant="standard"
          placeholder="0000000"
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
              max: 9999999
            }
          }}
        />
        <TextField 
          label="Código do Fornecedor"
          id="supplier_code"
          name="supplier_code"
          defaultValue={item?.supplier_code ?? ''}
          variant="standard"
        />
        <TextField 
          label="Detalhes / Descrição"
          id="details"
          name="details"
          defaultValue={item?.details ?? ''}
          variant="standard"
          multiline
        />
      </Box>
    </Fade>
  )
}

export default ItemForm
