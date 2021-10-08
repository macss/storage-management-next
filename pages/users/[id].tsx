import { fetchUser, selectUserById } from '@features/users/usersSlice'
import { useAppDispatch, useAppSelector } from '@hooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ViewUser = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { id } = router.query

  const user = useAppSelector(state => selectUserById(state, id as string))

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(id as string))
    }
  }, [])

  return (
    <div>
      {JSON.stringify({ ...user})}
    </div>
  )
}

export default ViewUser
