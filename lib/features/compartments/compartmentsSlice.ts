import { Compartment } from "@models";
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchDataById, fetchDataById } from "@services";
import { RootState } from "@store";

/** Creating Compartments Adapter */
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
  reducers: {
    addCompartments(state, action: PayloadAction<Compartment[]>) {
      compartmentsAdapter.upsertMany(state, action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCompartment.fulfilled, (state, action) => {
      const compartment = action.payload
      if (compartment)
        compartmentsAdapter.upsertOne(state, compartment)
    })
  }
})

/** Exports */
export default compartmentsSlice.reducer

export const {
  addCompartments
} = compartmentsSlice.actions

export const {
  selectAll: selectAllCompartments,
  selectById: selectCompartmentById,
  selectIds: selectCompartmentsIds
} = compartmentsAdapter.getSelectors<RootState>(state => state.compartments)