import { withData } from '@hocs'
import { Compartment } from '@models'
import React from 'react'

const ViewCompartment = ({ data: compartment }: { data?: Compartment}) => {
  return (
    <div>
      {JSON.stringify(compartment)}
    </div>
  )
}

export default withData(ViewCompartment, 'compartments')
