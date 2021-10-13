import { Item } from "@models";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchDataAt, fetchDataAt, FetchDataById, fetchDataById, Options } from "@services";
import { RootState } from "@store";

/** Creating Items Adapter */
const itemsAdapter = createEntityAdapter<Item>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const initialState = itemsAdapter.getInitialState({
  haveNextPage: true
})

/** Creating Thunks */
export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (id: string) => {
    const data = await fetchDataById(id, 'items')
    if (data.code === FetchDataById.success) {
      return data.doc?.data()
    } else {
      return undefined
    }
  }
)

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (options?: Omit<Options<'items'>, 'orderBy'>) => {
    const data = await fetchDataAt('items', { orderBy: 'name', ...options })
    if (data.code === FetchDataAt.success) {
      return data.docs.map(doc => doc.data())
    } else {
      return []
    }
  }
)

/** The Slice */
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    resetHaveNextPage(state) {
      state.haveNextPage = true
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      const item = action.payload
      if (item && state.ids.indexOf(item.id) === -1)
        itemsAdapter.addOne(state, item)
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const items = action.payload
      if (items.length === 0) {
        state.haveNextPage = false
      }
      itemsAdapter.upsertMany(state, items?.map(item => item))      
    })
  }
})

/** Exports */
export default itemsSlice.reducer

export const {
  resetHaveNextPage: resetHaveNextItemsPage
} = itemsSlice.actions

export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemsIds
} = itemsAdapter.getSelectors<RootState>(state => state.items)

export const selectHaveNextItemsPage = (state: RootState) => state.items.haveNextPage