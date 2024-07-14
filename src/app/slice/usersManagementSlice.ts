import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiConfig, UsersManagementState } from "@/interface/InterfaceType"
import useAxiosClient from "@/axios-client";

const axiosClient = useAxiosClient();

const initialState: UsersManagementState = {
    data: {},
    status: "",
    loading: true,
    loadingCreateUser: false,
    error: false,
}

const usersManagementSlice = createSlice({
    name: 'usersManagement',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersData.pending, (state) => {
                state.status = "getUsersData/loading";
                state.loading = true
                state.error = null
            })
            .addCase(getUsersData.fulfilled, (state, action) => {
                state.status = "getUsersData/success";
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(getUsersData.rejected, (state, action) => {
                state.status = "getUsersData/failed";
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(addUser.pending, (state) => {
                state.status = "addUser/loading";
                state.loading = true;
                state.loadingCreateUser = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = "addUser/success";
                state.loading = false;
                state.loadingCreateUser = false;
                state.data = action.payload
                state.error = null
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = "addUser/failed";
                state.loading = false;
                state.loadingCreateUser = false;
                state.error = action.payload;
            })

        builder
            .addCase(editUser.pending, (state) => {
                state.status = "editUser/loading";
                state.loading = true;
                state.error = null
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = "editUser/success";
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = "editUser/failed";
                state.loading = false
                state.error = action.payload
            })

        builder
            .addCase(deleteUser.pending, (state) => {
                state.status = "deleteUser/loading";
                state.loading = true;
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.status = "deleteUser/success";
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "deleteUser/failed";
                state.loading = false
                state.error = action.payload
            })
    }
})

export const getUsersData = createAsyncThunk("usersManagement/getUsersData", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    console.log(apiconfig)
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

export const editUser = createAsyncThunk("usersManagement/editUser", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axiosClient({
            url: apiconfig.url,
            method: apiconfig.method,
            data: apiconfig.data
        })

        return res.data

    } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})

export const deleteUser = createAsyncThunk("usersManagement/deleteUser", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axiosClient({
            url: apiconfig.url,
            method: apiconfig.method,
            data: apiconfig.data
        })

        return res.data

    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

export const usersData = (state: any) => state.usersManagement.data
export const loadingStatus = (state: any) => state.usersManagement.status;
export const usersError = (state: any) => state.usersManagement.error


export default usersManagementSlice.reducer