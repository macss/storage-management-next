import { StyledPaper } from '@components'
import { withData } from '@hocs'
import { Item } from '@models'
import { Fab, Typography } from '@mui/material'
import { Edit, Save } from '@mui/icons-material'
import React, { useState } from 'react'

const EditForm = ({ item }: { item: Item}) => {
  return (
    <div>form</div>
  )
}

const InfoDisplay = ({ item }: { item: Item }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {item?.name}
      </Typography>
    </>
  )
}

const ViewItem = ({ data: item }: { data: Item}) => {
  const [editting, setEditting] = useState(false)
  const toggleEditting = () => setEditting(v => !v)

  return (
    <StyledPaper sx={{position: 'relative'}}>
      { editting ? <EditForm {...{item}} /> : <InfoDisplay {...{item}} /> }
      <Fab 
        color="secondary" 
        aria-label="edit" 
        onClick={toggleEditting}
        sx={{
          position: 'absolute', 
          bottom: 16, 
          right: 16,
          transform: editting ? 'rotate(45deg)' : 'rotate(0deg)',
          opacity: editting ? 0 : 100,
          transition: theme => theme.transitions.create(['opacity', 'transform'], {
            duration: theme.transitions.duration.standard
          })
        }}
      >
        <Edit />
      </Fab>
      
      <Fab 
        color="secondary" 
        aria-label="save" 
        onClick={toggleEditting} 
        sx={{
          position: 'absolute', 
          bottom: 16, 
          right: 16,
          transform: editting ? 'rotate(0deg)' : 'rotate(45deg)',
          opacity: editting ? 100 : 0,
          transition: theme => theme.transitions.create(['opacity', 'transform'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut
          })
        }}
      >
        <Save />
      </Fab>
    </StyledPaper>
  )
}

export default withData(ViewItem, 'items')