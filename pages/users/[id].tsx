import { StyledPaper } from '@components'
import { withData } from '@hocs'
import { User } from '@models'
import React from 'react'

const ViewUser = ({ data: user }: { data?: User }) => {
  return (
    <StyledPaper>
      {JSON.stringify({ ...user})}
    </StyledPaper>
  )
}

export default withData(ViewUser, 'users')
