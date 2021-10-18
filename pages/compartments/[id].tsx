import { withData, WithDataProps } from '@hocs'
import React from 'react'

const ViewCompartment = ({ data: compartment }: WithDataProps<'compartments'>) => {
  return (
    <div>
      {JSON.stringify(compartment)}
    </div>
  )
}

export default withData(ViewCompartment, 'compartments')
