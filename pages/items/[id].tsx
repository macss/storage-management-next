import { StyledPaper, DataNotFound, LoadingIndicator } from '@components'
import { withData, WithDataProps } from '@hocs'
import { Common, Item } from '@models'
import { Fade, Fab, Typography } from '@mui/material'
import { Edit, Save } from '@mui/icons-material'
import React, { useState } from 'react'
import ItemForm from '@features/items/ItemForm'
import { fetchItem } from '@features/items/itemsSlice'
import { useAppDispatch } from '@hooks'
import { setData, SetData } from '@services'

const InfoDisplay = ({ item }: { item: Item }) => {
  return (
    <Fade in>
      <Typography variant="h5" gutterBottom>
        {item?.name}
      </Typography>
    </Fade>
  )
}

const ViewItem = ({ data: item, loading }: WithDataProps<'items'>) => {
  const dispatch = useAppDispatch()
  const [editting, setEditting] = useState(false)
  const toggleEditting = () => setEditting(v => !v)
  const formId = 'edit-item-form'

  const handleEdit = ({ item: newData }: { item: Omit<Item, keyof Common> }) => {
    const newItem = { ...item, ...newData }

    setData('items', newItem)
      .then(result => {
        if (result.code === SetData.success)
          dispatch(fetchItem(item?.id as string))
      })

    toggleEditting()
  }

  if (loading) {
    return <LoadingIndicator />
  }

  if (!item) {
    return <DataNotFound message="Item não encontrado" />
  }

  return (
    <StyledPaper 
      sx={{
        position: 'relative', 
        width: {
          xs: '100%',
          lg: '50%'
        }
      }}>
      { 
        editting ? 
        <ItemForm 
          {
            ...{
              formId, 
              item, 
              title: 'Modificar Item',
              onSubmit: handleEdit
            }
          } 
        /> : <InfoDisplay {...{item}} /> }
      <Fab 
        color="secondary" 
        aria-label="edit" 
        onClick={toggleEditting}
        sx={{
          position: 'absolute', 
          bottom: 16, 
          right: 16,
          visibility: !editting ? 'visible' : 'hidden',
          transform: editting ? 'rotate(45deg)' : 'rotate(0deg)',
          opacity: editting ? 0 : 100,
          transition: theme => theme.transitions.create(['visibility', 'opacity', 'transform'], {
            duration: theme.transitions.duration.standard
          })
        }}
      >
        <Edit />
      </Fab>
      
      <Fab 
        color="secondary" 
        aria-label="save" 
        sx={{
          position: 'absolute', 
          bottom: 16, 
          right: 16,
          visibility: editting ? 'visible' : 'hidden',
          transform: editting ? 'rotate(0deg)' : 'rotate(45deg)',
          opacity: editting ? 100 : 0,
          transition: theme => theme.transitions.create(['visibility', 'opacity', 'transform'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut
          })
        }}
        form={formId}
        type="submit"
      >
        <Save />
      </Fab>
    </StyledPaper>
  )
}

export default withData(ViewItem, 'items')