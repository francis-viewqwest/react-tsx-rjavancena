import useAxiosClient from "@/axios-client";
import { ApiConfig, logsState, } from "@/interface/InterfaceType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const axiosClient = useAxiosClient();

const initialState: logsState = {
    logsData: {},
    status: "",
    loading: false,
    logsMessage: "",
    error: false,
}

const logsSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getLogsData.pending, (state) => {
                state.status = "logs/loading";
                state.loading = true;
                state.error = null;
            })
            .addCase(getLogsData.fulfilled, (state, action) => {
                state.status = "logs/success";
                state.loading = false;
                state.logsData = action.payload
            })
            .addCase(getLogsData.rejected, (state, action) => {
                state.status = "logs/failed";
                state.loading = false;
                state.error = action.payload
            })

    }

})

export const getLogsData = createAsyncThunk("logs/getCustomerData", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axiosClient({
            url: ApiConfig.url,
            method: ApiConfig.method
        })
        console.log(res)
        return res.data
    } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})

export const logsData = (state: any) => state?.logs?.logsData

export default logsSlice.reducer