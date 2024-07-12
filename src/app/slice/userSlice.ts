import useAxiosClient from "@/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const axiosClient = useAxiosClient();

interface UserState {
  sidebar: any[];
  data: object | any;
  status: string;
  loading: boolean;
  user: object,
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
  user: {},
  status: "",
  loading: false,
  error: false,
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers(builder) {

    builder
      .addCase(setNavbar.pending, (state) => {
        state.status = "setNavbar/loading";
        state.loading = true;
        state.error = null
      })
      .addCase(setNavbar.fulfilled, (state, action) => {
        state.status = "setNavbar/success";
        state.loading = false;
        state.data = action.payload;
        state.sidebar = action.payload;
      })
      .addCase(setNavbar.rejected, (state, action) => {
        state.status = "setNavbar/failed";
        state.loading = false;
        state.error = action.payload;

      })

    builder
      .addCase(logout.pending, (state) => {
        state.status = "logout/loading";
        state.loading = true;
        state.error = null
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "logout/success";
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "logout/failed";
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const setNavbar = createAsyncThunk("user/getNavbar", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
  try {
    const res = await axiosClient({
      url: ApiConfig.url,
      method: ApiConfig.method,
      data: ApiConfig.data
    })
    return res.data
  } catch (error: any) {
    console.log(error)
    return rejectWithValue(error.response.data)
  }
})

export const logout = createAsyncThunk("user/getLogout", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
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


export const navbarData = (state: any) => state.user.data;

export const loading = (state: any) => state.user.loading;

export default userSlice.reducer