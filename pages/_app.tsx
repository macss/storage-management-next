import React, { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import { Provider } from 'react-redux'

import { RouteGuard } from '@components'
import { ThemeContext } from '@contexts'

import store from '@store'
import appTheme from '@theme/theme'
import MainLayout from '@theme/layouts/MainLayout'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [localDarkMode, setLocalDarkMode] = useState<string | null>()

  useEffect(() => {
    if (window) {
      setLocalDarkMode(window.localStorage.getItem('prefers-color-scheme-dark'))
    }
  }, [])

  const theme = useMemo(() => 
    (localDarkMode === 'true') ? appTheme('dark') : appTheme()
  , [localDarkMode])

  const toggleTheme = () => {
    if (theme.palette.mode === 'dark') {
      window.localStorage.setItem('prefers-color-scheme-dark', 'false')
      setLocalDarkMode('false')
    } else {
      window.localStorage.setItem('prefers-color-scheme-dark', 'true')
      setLocalDarkMode('true')
    }
  }

  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>)

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Storage Management</title>
            <meta name="description" content="App to manage item storage" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <CssBaseline />
          <RouteGuard>
            {getLayout(<Component {...pageProps} />)}
          </RouteGuard>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  )
}
export default MyApp
