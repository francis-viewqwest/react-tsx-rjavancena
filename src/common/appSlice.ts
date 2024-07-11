import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    title: null,
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = appSlice.actions;
export const selectTitle = (state) => state.app.title;

export default appSlice.reducer;
