import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addOne: (state) => {
      state.value = state.value + 1;
    },
    reduceOne: (state) => {
      state.value = state.value - 1;
    },
  },
});

export const { addOne, reduceOne } = counterSlice.actions;

export default counterSlice.reducer;
