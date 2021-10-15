import { StyledPaper } from '@components'
import { withData, WithDataProps } from '@hocs'
import React from 'react'

const ViewUser = ({ data: user, loading }: WithDataProps<'users'>) => {
  return (
    <StyledPaper>
      {JSON.stringify({ ...user})}
    </StyledPaper>
  )
}

export default withData(ViewUser, 'users')
