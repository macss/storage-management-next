import { configureStore } from '@reduxjs/toolkit'

import usersReducer from '@features/users/usersSlice'
import depositsReducer from '@features/deposits/depositsSlice'
import compartmentsReducer from '@features/compartments/compartmentsSlice'
import historiesReducer from '@features/histories/historiesSlice'
import itemsReducer from '@features/items/itemsSlice'

/**
 * The app `store` used with redux
 */
const store = configureStore({
  reducer: {
    users: usersReducer,
    deposits: depositsReducer,
    compartments: compartmentsReducer,
    histories: historiesReducer,
    items: itemsReducer
  }
})

/**
 * The RootState type
 */
export type RootState = ReturnType<typeof store.getState>

/**
 * The AppDispatch type
 */
export type AppDispatch = typeof store.dispatch

export default store