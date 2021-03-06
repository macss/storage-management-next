import { fetchCompartment, selectCompartmentById } from '@features/compartments/compartmentsSlice';
import { fetchDeposit, selectDepositById } from '@features/deposits/depositsSlice';
import { fetchHistory, selectHistoryById } from '@features/histories/historiesSlice';
import { fetchItem, selectItemById } from '@features/items/itemsSlice';
import { fetchUser, selectUserById } from '@features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Database } from '@models';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

type PropsAreEqual<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>
) => boolean;

/**
 * The props that the HOC injects on it's childs
 */
export interface WithDataProps<K extends keyof Database> {
  /**
   * The data that the HOC has found, if it has
   */
  data?: Database[K][string]
  /**
   * Wheter or not the HOC has finished loading
   */
  loading: boolean
}

/**
 * Function that constructs a component with fetched data from the database
 * 
 * @param component The component having props injected into
 * @param path The path from the database that the data should be fetch'd
 * @returns JSX.Component
 */
const withData = <K extends keyof Database, P extends WithDataProps<K>>(
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

  function WithData(props: P) {
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const { id } = router.query
    
    const selector = selectors[path]
    const action = actions[path]

    const data = useAppSelector(state => selector(state, id as string))

    useEffect(() => {
      let timeout: NodeJS.Timeout

      if (!data) {
        dispatch(action(id as string))
        timeout = setTimeout(() => {
          if (!data)
            setLoading(false)
        }, 5000)
      }

      return () => {
        clearTimeout(timeout)
      }
    }, [action, data, dispatch, id])

    useEffect(() => {
      if (data) {
        setLoading(false)
      }
    }, [data])

    return component({ ...props, data: data as Database[K][string], loading }) as JSX.Element;
  }

  WithData.displayName = `withData(${componentName})`;

  let wrappedComponent = propsAreEqual === false ? WithData : React.memo(WithData, propsAreEqual);

  //copyStaticProperties(component, wrappedComponent);

  return wrappedComponent as typeof WithData
};

export default withData