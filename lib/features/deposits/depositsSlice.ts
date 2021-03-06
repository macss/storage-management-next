import { Deposit } from "@models";
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchDataById, fetchDataById } from "@services";
import { RootState } from "@store";

/** Creating Deposits Adapter */
const depositsAdapter = createEntityAdapter<Deposit>({
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const initialState = depositsAdapter.getInitialState()

/** Creating Thunks */
export const fetchDeposit = createAsyncThunk(
  'deposits/fetchDeposit',
  async (id: string) => {
    const response = await fetchDataById(id, 'deposits')
    if (response.code === FetchDataById.success) {
      return response.doc?.data()
    } else {
      return undefined
    }
  }
)

/** The Slice */
const depositsSlice = createSlice({
  name: 'deposits',
  initialState,
  reducers: {
    addDeposits(state, action: PayloadAction<Deposit[]>) {
      depositsAdapter.upsertMany(state, action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchDeposit.fulfilled, (state, action) => {
      const deposit = action.payload
      if (deposit)
        depositsAdapter.upsertOne(state, deposit)
    })
  }
})

/** Exports */
export default depositsSlice.reducer

export const {
  addDeposits
} = depositsSlice.actions

export const {
  selectAll: selectAllDeposits,
  selectById: selectDepositById,
  selectIds: selectDepositsIds
} = depositsAdapter.getSelectors<RootState>(state => state.deposits)