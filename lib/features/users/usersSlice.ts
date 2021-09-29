import { createSlice } from "@reduxjs/toolkit";

const initialState = {name: 'Marco'}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer