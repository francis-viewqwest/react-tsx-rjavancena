import useAxiosClient from "@/axios-client";
import { ApiConfig, voucherState, } from "@/interface/InterfaceType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const axiosClient = useAxiosClient();

const initialState: voucherState = {
    voucherData: {},
    status: "",
    message: "",
    loading: false,
    error: false,
    addVoucherLoading: false,
    addVoucherMessage: "",
    addVoucherError: false,
}

const voucherSlice = createSlice({
    name: "voucher",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder
            .addCase(getVoucherData.pending, (state) => {
                state.status = "getVoucherData/loading";
                state.loading = true;
                state.error = false;
            })
            .addCase(getVoucherData.fulfilled, (state, action) => {
                state.status = "getVoucherData/success";
                state.loading = false;
                state.message = action.payload;
                state.voucherData = action.payload
            })
            .addCase(getVoucherData.rejected, (state, action) => {
                state.status = "getVoucherData/failed";
                state.loading = false;
                state.error = action.payload
            })

        builder
            .addCase(addVoucherData.pending, (state) => {
                state.status = "addVoucherData/loading";
                state.loading = true;
                state.error = false;
            })
            .addCase(addVoucherData.fulfilled, (state, action) => {
                state.status = "addVoucherData/success";
                state.loading = false;
                state.message = action.payload;
                state.voucherData = action.payload
            })
            .addCase(addVoucherData.rejected, (state, action) => {
                state.status = "addVoucherData/failed";
                state.loading = false;
                state.error = action.payload
            })

    }

})

export const getVoucherData = createAsyncThunk("voucher/getVoucherData", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axiosClient({
            url: ApiConfig.url,
            method: ApiConfig.method
        })

        return res.data
    } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})

export const addVoucherData = createAsyncThunk("voucher/addVoucherData", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
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



export default voucherSlice.reducer