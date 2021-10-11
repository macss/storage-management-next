import { DataNotFound, StyledPaper } from '@components';
import { fetchCompartment, selectCompartmentById } from '@features/compartments/compartmentsSlice';
import { fetchDeposit, selectDepositById } from '@features/deposits/depositsSlice';
import { fetchHistory, selectHistoryById } from '@features/histories/historiesSlice';
import { fetchItem, selectItemById } from '@features/items/itemsSlice';
import { fetchUser, selectUserById } from '@features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '@hooks';
import { CircularProgress } from '@mui/material';
import { Database } from '@models';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type PropsAreEqual<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>
) => boolean;

const withData = <K extends keyof Database, P extends {  
  data?: Database[K][string]
}>(
  component: {
    (props: P): Exclude<React.ReactNode, undefined>;
    displayName?: string;
  },
  path: K,
  propsAreEqual?: PropsAreEqual<P> | false,
  componentName = component.displayName ?? component.name
): {
  (props: P): JSX.Element;
  displayName: string;
} => {

  type K2 = keyof Database
  type RT = Database[K2][string] | undefined

  const selectors: Record<K2, (state: RootState, id: string) => RT> = {
    users: selectUserById,
    compartments: selectCompartmentById,
    histories: selectHistoryById,
    deposits: selectDepositById,
    items: selectItemById
  }

  const actions: Record<K2, (id: string) => AsyncThunkAction<RT, string, {}>> = {
    users: fetchUser,
    compartments: fetchCompartment,
    histories: fetchHistory,
    deposits: fetchDeposit,
    items: fetchItem
  }

  const messages: Record<K2, string> = {
    users: 'Usuário não encontrado',
    compartments: 'Compartimento não encontrado',
    histories: 'Histórico não encontrado',
    deposits: 'Depósito não encontrado',
    items: 'Item não encontrado'
  }

  function WithData(props: P) {
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { id } = router.query
    
    const selector = selectors[path]
    const action = actions[path]
    const message = messages[path]

    const data = useAppSelector(state => selector(state, id as string))

    useEffect(() => {
      if (!data) {
        dispatch(action(id as string))
        setTimeout(() => {
          if (!data)
            setLoading(false)
        }, 3000)
      }
    }, [])

    useEffect(() => {
      if (data) {
        setLoading(false)
      }
    }, [data])

    if (data) 
      return component({...props, data: data as Database[K][string]}) as JSX.Element;
    
    if (loading) {
        return (
          <StyledPaper sx={{
            position: 'relative'
          }}>
            <CircularProgress sx={{
              position: 'absolute',
              top: '45%',
              left: '45%'
            }}/>
          </StyledPaper>
        )
    }

    return <DataNotFound message={message} />
  }

  WithData.displayName = `withData(${componentName})`;

  let wrappedComponent = propsAreEqual === false ? WithData : React.memo(WithData, propsAreEqual);

  //copyStaticProperties(component, wrappedComponent);

  return wrappedComponent as typeof WithData
};

export default withData