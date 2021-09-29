import React, { useContext } from 'react'
import type { NextPage } from 'next'
import { auth } from '@config/firebaseConfig'
import ThemeContext from '@contexts/ThemeContext'
import styles from '../styles/Home.module.css'
import MainLayout from '@theme/layouts/mainLayout'

const Home = () => {
  const { toggleTheme } = useContext(ThemeContext)
  return (
    <div className={styles.container}>
      Index
      <button onClick={() => auth.signOut()}>Sair</button>
      <button onClick={toggleTheme}>Trocar tema</button>
    </div>
  )
}

Home.displayName = 'Home Page'
Home.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    {page}
  </MainLayout>
)

export default Home
