import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User } from '@models'
import { RootState } from "@store"
import { FetchDataById, fetchDataById } from "@services";

/** Creating Users Adapter */
const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.fullname.localeCompare(b.fullname)
})

const initialState = usersAdapter.getInitialState()

/** Creating Thunks */
export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: string) => {
    const response = await fetchDataById(id, 'users')
    if (response.code === FetchDataById.success) {
      return response.doc?.data()
    } else {
      return undefined
    }
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
      if (user) {
        usersAdapter.upsertOne(state, user)
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