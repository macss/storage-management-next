import { fetchUser, selectUserById } from '@features/users/usersSlice'
import { useAppDispatch, useAppSelector } from '@hooks'
import MainLayout from '@theme/layouts/MainLayout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ViewDeposit = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { id } = router.query
  const user = useAppSelector(state => selectUserById(state, id as string))

  useEffect(() => {
    if (user) {
      console.log(user.fullname)
    } else {
      console.log('fetching data')
      dispatch(fetchUser(id as string))
    }
  }, [user])

  return (
    <div>
      {user?.fullname}
    </div>
  )
}

export default ViewDeposit

ViewDeposit.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>