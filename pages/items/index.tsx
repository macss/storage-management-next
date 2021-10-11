import { DataList, StyledPaper } from '@components'
import { Item } from '@models'
import { FetchDataAt, fetchDataAt } from '@services'
import React, { useState, useEffect } from 'react'

const ItemsList = () => {
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchDataAt('items')
      if (result.code === FetchDataAt.success)
        setItems(result?.data ?? [])
    }
    loadData()
  }, [])

  const renderItem = (item: Item) => {
    return (
      <div>{item?.name}</div>
    )
  }

  const loadNextPage = async () => {
    setIsNextPageLoading(true)
    await fetchDataAt('items', {
      startAt: items.slice(-1)[0]
    }).then(result => {
      if (result.code === FetchDataAt.success)
        setItems(v => ([...v, ...(result?.data ?? [])]))
      setIsNextPageLoading(false)
    })
  }

  return (
    <StyledPaper>
      <DataList 
        path="items"
        {...{isNextPageLoading, items, renderItem, loadNextPage}}
      />
    </StyledPaper>
  )
}

export default ItemsList
