import { DataGrid } from '@components'
import ItemCard from '@features/items/ItemCard'
import { fetchItems, resetHaveNextItemsPage, selectAllItems, selectHaveNextItemsPage } from '@features/items/itemsSlice'
import { useAppDispatch, useAppSelector } from '@hooks'
import { Item } from '@models'
import { unwrapResult } from '@reduxjs/toolkit'
import { getDocFromPathAndId } from '@utils'
import React, { useState, useEffect } from 'react'

const ItemsList = () => {
  const dispatch = useAppDispatch()
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const [lastItem, setLastItem] = useState<Item>()
  const items = useAppSelector(selectAllItems)
  const haveNextPage = useAppSelector(selectHaveNextItemsPage)

  const minItems = 15

  useEffect(() => {
    if (items.length < minItems)
      dispatch(fetchItems({limit: minItems - items.length}))
        .then(unwrapResult)
        .then(result => {
          setLastItem(result.slice(-1)[0])
        })
    dispatch(resetHaveNextItemsPage())
  }, [dispatch, items.length])

  const renderItem = (item: Item) => {
    return (
      <ItemCard {...{ item }}/>
    )
  }

  const loadNextPage = async () => {
    setIsNextPageLoading(true)
    const lastItemDoc = await getDocFromPathAndId('items', lastItem?.id as string)
    dispatch(fetchItems({limit: 10, startAt: lastItemDoc}))
      .then(unwrapResult)
      .then(result => {
        setIsNextPageLoading(false)
        setLastItem(result.slice(-1)[0])
      })
  }

  return (
    <DataGrid
      {...{isNextPageLoading, renderItem, loadNextPage, items, haveNextPage }}
    />
  )
}

export default ItemsList
