import { History } from "@models";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchDataById, fetchDataById } from "@services";
import { RootState } from "@store";

/** Creating Histories Adapter */
const historiesAdapter = createEntityAdapter<History>({
  sortComparer: (a, b) => a.created_at - b.created_at
})

const initialState = historiesAdapter.getInitialState()

/** Creating Thunks */
export const fetchHistory = createAsyncThunk(
  'items/fetchItem',
  async (id: string) => {
    const response = await fetchDataById(id, 'histories')
    if (response.code === FetchDataById.success) {
      return response.doc?.data()
    } else {
      return undefined
    }
  }
)

/** The Slice */
const historiesSlice = createSlice({
  name: 'histories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      const history = action.payload
      if (history && state.ids.indexOf(history.id) === -1)
        historiesAdapter.addOne(state, history)
    })
  }
})

/** Exports */
export default historiesSlice.reducer

export const {
  selectAll: selectAllHistories,
  selectById: selectHistoryById,
  selectIds: selectHistoriesIds
} = historiesAdapter.getSelectors<RootState>(state => state.histories)