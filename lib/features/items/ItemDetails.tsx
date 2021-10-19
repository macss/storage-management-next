import { DataGrid } from '@components'
import { firestore } from '@config/firebaseConfig'
import { addCompartments } from '@features/compartments/compartmentsSlice'
import { addDeposits, selectAllDeposits } from '@features/deposits/depositsSlice'
import { collection, getDocs, query, QueryDocumentSnapshot, where } from '@firebase/firestore'
import { useAppDispatch, useAppSelector } from '@hooks'
import { Compartment, Item } from '@models'
import { Box, Button, Collapse, Divider, Fade, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { fetchDataById } from '@services'
import { checkDefined, getDateFromMilis } from '@utils'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface ItemDetailsProps {
  /**
   * The item you want to display
   */
  item: Item
}

/**
 * Component that displays the details of the given item
 */
const ItemDetails = ({ item }: ItemDetailsProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const deposits = useAppSelector(selectAllDeposits)
  const [compartments, setCompartments] = useState<Compartment[]>([])

  /**
   * Effect to get all compartments that has one or more of the given item
   */
  useEffect(() => {
    const fetchCompartments = async () => {
      const compartmentsRef = collection(firestore, 'compartments')
      const qry = query(
        compartmentsRef, 
        where(`items.${item.id}`, '>', 0)
      )
      
      const compartmentsDocs = (await getDocs(qry)).docs as QueryDocumentSnapshot<Compartment>[]
      const compartmentsData = compartmentsDocs.map(c => c.data())

      setCompartments(compartmentsData)
      
      dispatch(addCompartments(compartmentsData))
    }
    fetchCompartments()
  }, [item, dispatch])

  /**
   * Effect to get the deposits of each compartment
   */
  useEffect(() => {
    const fetchDeposits = async () => {
      compartments.forEach(async (c) => {
        if (deposits.findIndex(dp => dp.id === c.deposit_id) === -1) {
          const response = await fetchDataById(c.deposit_id, 'deposits')
          const deposit = response.doc?.data()
          if (deposit) 
            dispatch(addDeposits([deposit]))
        }
      })
    }

    fetchDeposits()
  }, [compartments, deposits, dispatch])

  return (
    <Fade in>
      <Box>
        <Typography variant="h5" gutterBottom>
          {item.name}
        </Typography>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Código SAP" secondary={checkDefined(item.sap_code)} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Código Fornecedor" secondary={checkDefined(item.supplier_code)} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Descrição" secondary={checkDefined(item.details)} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Data de criação" secondary={getDateFromMilis(item.created_at)} />
          </ListItem>
        </List>
        <Collapse in={compartments.length > 0} unmountOnExit>
          <>
            <Divider sx={{ mb: 1 }}/>
            <Typography variant="h6" gutterBottom>
              Disponível em
            </Typography>
            <DataGrid 
              items={compartments}
              renderItem={compartment => {
                const compartmentDeposit = deposits.find(deposit => deposit.id === compartment.deposit_id)

                return (
                  <Paper sx={{
                    bgcolor: theme => theme.palette.mode === 'dark' ? `${theme.palette.background.paper}80` : theme.palette.grey[100],
                    px: 3,
                    pb: 3
                  }}>
                    <List>
                      <ListItem disablePadding>
                        <ListItemText primary="Depósito" secondary={checkDefined(compartmentDeposit?.name)} />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText primary="Compartimento" secondary={compartment.location.toUpperCase()} />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemText primary="Quantidade" secondary={compartment?.items && compartment?.items[item.id]} />
                      </ListItem>
                    </List>
                    <Button 
                      onClick={() => router.push(`/deposits/${compartmentDeposit?.id}`)}
                      variant="contained"
                    >
                      Ver Depósito
                    </Button>
                  </Paper>
                )
              }}
              breakpoints={{
                xs: 6,
                md: 4,
                lg: 3
              }}
            />
          </>
        </Collapse>
      </Box>
    </Fade>
  )
}

export default ItemDetails
