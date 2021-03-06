import { auth } from '@config/firebaseConfig'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import React, { useState, useEffect } from 'react'

/**
 * Component used as a blocker for non authenticated users
 */
const RouteGuard = ({ children }: React.PropsWithChildren<never>) => {
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

RouteGuard.displayName = 'Route Protector Component'

export default RouteGuard
