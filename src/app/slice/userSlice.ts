import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  sidebar: any[];
}

const initialState: UserState = {
  sidebar: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNavbar: (state, action) => {
      return {
        ...state,
        sidebar: action.payload
      }
    },
  },
});

export const { setNavbar } = userSlice.actions;

export default userSlice.reducer