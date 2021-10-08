import React from 'react'
import Head from 'next/head'
import { auth } from '@config/firebaseConfig'
import { shortenName } from '@utils'
import { StyledPaper } from '@components'

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

export default Home
