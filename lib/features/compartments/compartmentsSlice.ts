import { Compartment } from "@models";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { FetchDataById, fetchDataById } from "@services";
import { RootState } from "@store";

/** Creating Histories Adapter */
const compartmentsAdapter = createEntityAdapter<Compartment>({
  sortComparer: (a, b) => a.created_at - b.created_at
})

const initialState = compartmentsAdapter.getInitialState()

/** Creating Thunks */
export const fetchCompartment = createAsyncThunk(
  'compartment/fetchCompartment',
  async (id: string) => {
    const response = await fetchDataById(id, 'compartments')
    if (response.code === FetchDataById.success) {
      return response.doc?.data()
    } else {
      return undefined
    }
  }
)

/** The Slice */
const compartmentsSlice = createSlice({
  name: 'compartments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCompartment.fulfilled, (state, action) => {
      const compartment = action.payload
      if (compartment && state.ids.indexOf(compartment.id) === -1)
      compartmentsAdapter.addOne(state, compartment)
    })
  }
})

/** Exports */
export default compartmentsSlice.reducer

export const {
  selectAll: selectAllCompartments,
  selectById: selectCompartmentById,
  selectIds: selectCompartmentsIds
} = compartmentsAdapter.getSelectors<RootState>(state => state.compartments)