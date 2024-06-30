import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiConfig } from "@/interface/InterfaceType"
import useAxiosClient from "@/axios-client";

const axiosClient = useAxiosClient();


interface UsersManagementState {
    data: object;
    status: string;
    loading: boolean;
    error: string | null | any;
}

const initialState: UsersManagementState = {
    data: {},
    status: "",
    loading: true,
    error: false,
}

interface ApiConfig {
    url: string;
    method: string;
    data?: any;
}

const usersManagementSlice = createSlice({
    name: 'usersManagement',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersData.pending, (state) => {
                state.status = "getInventoryData/loading";
                state.loading = true
                state.error = null
            })
            .addCase(getUsersData.fulfilled, (state, action) => {
                state.status = "getInventoryData/success";
                state.loading = false
                state.error = action.payload
            })
            .addCase(getUsersData.rejected, (state, action) => {
                state.status = "getInventoryData/failed";
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(addUser.pending, (state) => {
                state.status = "addUser/loading";
                state.loading = true
                state.error = null
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = "addUser/success";
                state.loading = false
                state.error = action.payload
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = "addUser/failed";
                state.loading = false
                state.error = action.payload
            })
    }
})

export const getUsersData = createAsyncThunk("usersManagement/getUsersData", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axiosClient({
            url: apiconfig.url,
            method: apiconfig.method,
        })

        return res.data

    } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data);
    }
})

export const addUser = createAsyncThunk("usersManagement/addUser", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axiosClient({
            url: apiconfig.url,
            method: apiconfig.method,
            data: apiconfig.data
        })

        return res.data

    } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data);
    }
})

export const usersData = (state: any) => state.usersManagement.data
export const loadingStatus = (state: any) => state.usersManagement.status;
export const usersError = (state: any) => state.usersManagement.error


export default usersManagementSlice.reducer