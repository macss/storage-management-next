import { withData } from '@hocs'
import { Deposit } from '@models'
import React from 'react'

const ViewDeposit = ({ data: deposit }: { data?: Deposit }) => {
  return (
    <div>
      {JSON.stringify(deposit)}
    </div>
  )
}

ViewDeposit.displayName = 'Single Deposit View'

export default withData(ViewDeposit,'deposits')