import { Database } from '@models'
import { Button } from '@mui/material'
import React from 'react'

interface DataListProps<P extends keyof Database> {
  isNextPageLoading: boolean
  items: Database[P][string][]
  loadNextPage: () => void,
  renderItem: (item: Database[P][string]) => JSX.Element
  path: P
}

const DataList = <P extends keyof Database>({
  isNextPageLoading,
  items,
  loadNextPage,
  renderItem
}: DataListProps<P>) => {

  // Only load 1 page of items at a time.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage
  const itemCount = items.length
  const isItemLoaded = (index: number) => index < items.length

  return (
    <>
      { items.map((item) => renderItem(item)) }
      <Button 
      >
        Oi
      </Button>
    </>
  )
}

export default DataList
