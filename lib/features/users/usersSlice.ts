import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from '@models/User'
import { RootState } from "@store/store"
import { fetchDataAt } from "@services";

/** Creating Users Adapter */
const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.fullname.localeCompare(b.fullname)
})

const initialState = usersAdapter.getInitialState()

/** Creating Thunks */
export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: string) => {
    const data = await fetchDataAt(id, 'users')
    return data?.data as unknown as User
  }
)

/** The Slice */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      const user = action.payload
      if (user && state.ids.indexOf(user.id) === -1) {
        usersAdapter.addOne(state, user)
      }
    }) 
  }
})

/** Exports */

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds
} = usersAdapter.getSelectors<RootState>(state => state.users)