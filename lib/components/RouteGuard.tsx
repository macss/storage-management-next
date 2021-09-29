import { auth } from '@config/firebaseConfig'
import { CircularProgress } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import React, { useState, useEffect } from 'react'

const RouteGuard = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthorized(true)
      } else {
        setAuthorized(false)
      }
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (loading) {
    return (<CircularProgress sx={{
      position: 'absolute',
      top: '50%',
      left: '50%'
    }}/>)
  }

  if (router.pathname === '/login') {
    if (!authorized)
      return <>{children}</>
    else {
      router.push({pathname: '/'})
      return null
    }
  }

  if (!authorized) {
    router.push({pathname: '/login'})
    return null
  }

  return <>{children}</>
}

export default RouteGuard
