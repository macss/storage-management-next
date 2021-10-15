import { StyledPaper } from '@components'
import ItemForm from '@features/items/ItemForm'
import { Common, Item } from '@models'
import { Save } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { setData } from '@services'
import { useRouter } from 'next/router'
import React from 'react'

const NewItemForm = () => {
  const formId = 'new-item-form'
  const router = useRouter()

  const handleSubmit = async ({ item }: { item: Omit<Item, keyof Common>}) => {
    setData('items', item)
      .then(result => {
        router.push(result.redirectUrl)
      })
  }

  return (
    <StyledPaper sx={{ position: 'relative' }}>
      <ItemForm 
        {
          ...{
            formId,
            onSubmit: handleSubmit
          }
        }
      />
      <Fab 
        color="secondary" 
        aria-label="save" 
        sx={{
          position: 'absolute', 
          bottom: 16, 
          right: 16,
        }}
        form={formId}
        type="submit"
      >
        <Save />
      </Fab>
    </StyledPaper>
  )
}

export default NewItemForm
