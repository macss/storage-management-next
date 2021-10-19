import React, { useState } from 'react'
import { StyledPaper, DataNotFound, LoadingIndicator } from '@components'
import { withData, WithDataProps } from '@hocs'
import { Common, Item } from '@models'
import { Fab, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { Cancel, Check, Edit, Save } from '@mui/icons-material'
import ItemForm from '@features/items/ItemForm'
import { fetchItem } from '@features/items/itemsSlice'
import { useAppDispatch } from '@hooks'
import { setData, SetData } from '@services'
import ItemDetails from '@features/items/ItemDetails'
import Head from 'next/head'

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
          lg: '70%'
        }
      }}>
      { 
        editting ?
        <>
          <Head>
            <title>Editando Item: {item.name}</title>
          </Head>
          <ItemForm 
            {
              ...{
                formId, 
                item, 
                title: 'Modificar Item',
                onSubmit: handleEdit
              }
            } 
          /> 
        </>:
        <>
          <Head>
            <title>Visualizando Item: {item.name}</title>
          </Head>
          <ItemDetails {...{item}} /> 
        </>}
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

      <SpeedDial
        color="se"
        ariaLabel="Save changes speed dial"
        sx={{
          position: 'absolute', 
          bottom: 16, 
          right: 16,
          visibility: editting ? 'visible' : 'hidden',
          opacity: editting ? 100 : 0,
          transition: theme => theme.transitions.create(['visibility', 'opacity', 'transform'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut
          })
        }}
        icon={<SpeedDialIcon icon={<Save />}/>}
      >
        <SpeedDialAction 
          icon={<Check />}
          FabProps={{
            form: formId,
            type: 'submit'
          }}
          tooltipTitle="Salvar mudanças"
        />

        <SpeedDialAction 
          onClick={toggleEditting}
          icon={<Cancel />}
          tooltipTitle="Cancelar edição"
        />
      </SpeedDial>
    </StyledPaper>
  )
}

export default withData(ViewItem, 'items')