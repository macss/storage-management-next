import MainLayout from '@theme/layouts/MainLayout'
import React from 'react'

const Index = () => {
  return (
    <div>
      Listar depósitos
    </div>
  )
}

Index.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
Index.displayName = 'Deposits List'

export default Index
