import useAxiosClient from "@/axios-client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserState, ApiConfig } from "@/interface/InterfaceType";
import Cookies from "js-cookie";


const axiosClient = useAxiosClient();


const initialState: UserState = {
  sidebar: [],
  data: {},
  user: {},
  status: "",
  loading: false,
  loadingEudevice: false,
  loadingSignIn: false,
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
      .addCase(setEudevice.pending, (state) => {
        state.status = "setEudevice/loading";
        state.loadingEudevice = true;
        state.error = null
      })
      .addCase(setEudevice.fulfilled, (state, action) => {
        state.status = "setEudevice/success";
        state.loadingEudevice = false;
        state.data = action.payload;
      })
      .addCase(setEudevice.rejected, (state, action) => {
        state.status = "setEudevice/failed";
        state.loadingEudevice = false;
        state.error = action.payload;
      })

    builder
      .addCase(signIn.pending, (state) => {
        state.status = "signIn/loading";
        state.loadingSignIn = true;
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "signIn/success";
        state.loadingSignIn = false;
        state.data = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "signIn/failed";
        state.loadingSignIn = false;
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

export const setEudevice = createAsyncThunk("user/setEudevice", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
  try {
    const res = await axiosClient({
      url: ApiConfig.url,
      method: ApiConfig.method,
    })
    console.log(res);

    Cookies.set("eu", res.data.eu);
    return res.data
  } catch (error: any) {
    console.log(error)
    return rejectWithValue(error.response.data)
  }
})

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

export const signIn = createAsyncThunk("user/setSignin", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
  try {

    const res = await axiosClient({
      url: ApiConfig.url,
      method: ApiConfig.method,
      data: ApiConfig.data
    })
    Cookies.set("token", res.data.token);
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
    return res.data
  } catch (error: any) {
    console.log(error)
    return rejectWithValue(error.response.data)
  }
})


export const navbarData = (state: any) => state.user.data;

export const loading = (state: any) => state.user.loading;

export default userSlice.reducer