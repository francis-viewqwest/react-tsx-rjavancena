import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiConfig } from "@/interface/InterfaceType"
import useAxiosClient from "@/axios-client";

const axiosClient = useAxiosClient();

interface InventoryState {
    data: object;
    status: string;
    error: string | null | any;
}

const initialState: InventoryState = {
    data: {},
    status: "",
    error: false,
}

interface ApiConfig {
    url: string;
    method: string;
    data?: any;
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        resetLoading: (state) => {
            state.status = "idle";
        }
    },
    extraReducers: (builder) => {

        //* GET INVENTORY 
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.status = "getDashboardData/loading";
                state.error = null
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.status = "getDashboardData/success";
                state.data = action.payload
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.status = "getDashboardData/failed";
                state.error = action.payload
            })

    }
})

//* GET INVENTORY CHILD
export const getDashboardData = createAsyncThunk("dashboard/getDashboardData", async (apiconfig: ApiConfig, { rejectWithValue }) => {

    console.log(apiconfig)
    try {
        const res = await axiosClient({
            url: apiconfig.url,
            method: "GET"
        })

        return res.data
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})



export const dashboardData = (state: any) => state.dashboard.data
export const dashboardStatus = (state: any) => state.dashboard.status;
export const dashboardError = (state: any) => state.dashboard.error



export default dashboardSlice.reducer