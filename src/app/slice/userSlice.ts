import useAxiosClient from "@/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const axiosClient = useAxiosClient();

interface UserState {
  sidebar: any[];
  data: object;
  status: string;
  loading: boolean;
  error: string | null | any;
}

interface ApiConfig {
  url: string;
  method: string;
  data?: any;
}


const initialState: UserState = {
  sidebar: [],
  data: {},
  status: "",
  loading: true,
  error: false,
}


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
  extraReducers(builder) {
    builder
      .addCase(logout.pending, (state) => {
        state.status = "logout/loading"
        state.error = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "logout/success"
        state.data = action.payload
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "logout/failed",
          state.error = action.payload
      })
  },
});

export const logout = createAsyncThunk("menu/getMenuData", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
  try {
    const res = await axiosClient({
      url: ApiConfig.url,
      method: ApiConfig.method,
      data: ApiConfig.data
    })
    console.log(res)
    return res.data
  } catch (error: any) {
    console.log(error)
    return rejectWithValue(error.response.data)
  }
})


export const { setNavbar } = userSlice.actions;

export default userSlice.reducer