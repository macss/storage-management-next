import { withData, WithDataProps } from '@hocs'
import React from 'react'

const ViewDeposit = ({ data: deposit }: WithDataProps<'deposits'>) => {
  return (
    <div>
      {JSON.stringify(deposit)}
    </div>
  )
}

ViewDeposit.displayName = 'Single Deposit View'

export default withData(ViewDeposit,'deposits')