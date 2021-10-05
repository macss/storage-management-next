import MainLayout from '@theme/layouts/MainLayout'
import React from 'react'

const NewDeposit = () => {
  return (
    <div>
      Novo deposito
    </div>
  )
}

NewDeposit.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
NewDeposit.displayName = 'New Deposit Form'

export default NewDeposit
