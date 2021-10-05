import React from 'react'
import MainLayout from '@theme/layouts/MainLayout'
import Head from 'next/head'
import { auth } from '@config/firebaseConfig'
import shortenName from '@utils/shortenName'
import StyledPaper from '@components/StyledPaper'

const Home = () => {
  const currentUser = auth.currentUser

  return (
    <>
    <Head>
      <title>Home - Storage Management</title>
      <meta name="description" content="Main page of the app"/>
    </Head>
    <StyledPaper>
      Bem vindo {shortenName(currentUser?.displayName)},
    </StyledPaper>
    </>
  )
}

Home.displayName = 'Home Page'
Home.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>

export default Home
