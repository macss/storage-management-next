import { DataGrid } from '@components'
import ItemCard from '@features/items/ItemCard'
import { fetchItems, resetHaveNextItemsPage, selectAllItems, selectHaveNextItemsPage } from '@features/items/itemsSlice'
import { useAppDispatch, useAppSelector } from '@hooks'
import { Item } from '@models'
import { getDocFromPathAndId } from '@utils'
import React, { useState, useEffect } from 'react'

const ItemsList = () => {
  const dispatch = useAppDispatch()
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const items = useAppSelector(selectAllItems)
  const haveNextPage = useAppSelector(selectHaveNextItemsPage)

  useEffect(() => {
    if (items.length === 0)
      dispatch(fetchItems({limit: 10}))
    dispatch(resetHaveNextItemsPage())
  }, [])

  const renderItem = (item: Item) => {
    return (
      <ItemCard {...{ item }}/>
    )
  }

  const loadNextPage = async () => {
    setIsNextPageLoading(true)
    const lastItem = items.slice(-1)[0]
    const lastItemDoc = await getDocFromPathAndId('items', lastItem?.id)
    dispatch(fetchItems({limit: 10, startAt: lastItemDoc}))
      .then(() => setIsNextPageLoading(false))
  }

  return (
    <DataGrid
      path="items"
      {...{isNextPageLoading, renderItem, loadNextPage, items, haveNextPage }}
    />
  )
}

export default ItemsList
