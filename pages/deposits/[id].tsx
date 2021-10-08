import { fetchDeposit, selectDepositById } from '@features/deposits/depositsSlice'
import { useAppDispatch, useAppSelector } from '@hooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ViewDeposit = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { id } = router.query

  const deposit = useAppSelector(state => selectDepositById(state, id as string))

  useEffect(() => {
    if (!deposit) {
      dispatch(fetchDeposit(id as string))
    }
  }, [])


  return (
    <div>
      {deposit?.code}
    </div>
  )
}

ViewDeposit.displayName = 'Single Deposit View'

export default ViewDeposit