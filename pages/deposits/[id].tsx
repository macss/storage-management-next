import { withData, WithDataProps } from '@hocs'
import React from 'react'

/**
 * Component to show a single deposit details
 */
const ViewDeposit = ({ data: deposit }: WithDataProps<'deposits'>) => {
  return (
    <div>
      {JSON.stringify(deposit)}
    </div>
  )
}

ViewDeposit.displayName = 'Single Deposit View'

export default withData(ViewDeposit,'deposits')