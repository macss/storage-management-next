import { withData } from '@hocs'
import { Item } from '@models'
import React from 'react'

const ViewItem = ({ data: item }: { data?: Item}) => {
  return (
    <div>
      {JSON.stringify(item)}
    </div>
  )
}

export default withData(ViewItem, 'items')