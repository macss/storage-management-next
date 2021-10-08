import { Item } from "@models";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchDataById, fetchDataById } from "@services";
import { RootState } from "@store";

/** Creating Items Adapter */
const itemsAdapter = createEntityAdapter<Item>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const initialState = itemsAdapter.getInitialState()

/** Creating Thunks */
export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (id: string) => {
    const data = await fetchDataById(id, 'items')
    if (data.code === FetchDataById.success) {
      return data.data
    } else {
      return undefined
    }
  }
)

/** The Slice */
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      const item = action.payload
      if (item && state.ids.indexOf(item.id) === -1)
        itemsAdapter.addOne(state, item)
    })
  }
})

/** Exports */
export default itemsSlice.reducer

export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemsIds
} = itemsAdapter.getSelectors<RootState>(state => state.items)