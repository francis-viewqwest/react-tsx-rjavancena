import useAxiosClient from "@/axios-client";
import { ApiConfig, customerState, } from "@/interface/InterfaceType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const axiosClient = useAxiosClient();

const initialState: customerState = {
    customerCashierData: {},
    status: "",
    voidMessage: "",
    loading: false,
    voidLoading: false,
    error: false,
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerCashierData.pending, (state) => {
                state.status = "customerCashier/loading";
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerCashierData.fulfilled, (state, action) => {
                state.status = "customerCashier/success";
                state.loading = false;
                state.customerCashierData = action.payload
            })
            .addCase(getCustomerCashierData.rejected, (state, action) => {
                state.status = "customerCashier/failed";
                state.loading = false;
                state.error = action.payload
            })

        //* VOID 
        builder
            .addCase(voidPaidCustomer.pending, (state) => {
                state.status = "voidPaidCustomer/loading";
                state.voidLoading = true;
                state.error = null;
            })
            .addCase(voidPaidCustomer.fulfilled, (state, action) => {
                state.status = "voidPaidCustomer/success";
                state.voidLoading = false;
                state.voidMessage = action.payload;
                state.customerCashierData = action.payload
            })
            .addCase(voidPaidCustomer.rejected, (state, action) => {
                state.status = "voidPaidCustomer/failed";
                state.voidLoading = false;
                state.error = action.payload
            })

    }

})

export const getCustomerCashierData = createAsyncThunk("customer/getCustomerData", async (ApiConfig: ApiConfig, { rejectWithValue }) => {
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

//* VOICE PAID
export const voidPaidCustomer = createAsyncThunk("customer/voidPaidCustomer", async (apiconfig: ApiConfig, { rejectWithValue }) => {

    try {
        const res = await axiosClient({
            url: apiconfig.url,
            method: apiconfig.method,
            data: apiconfig.data
        })

        return res.data
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})



// export const menuData = (state: any) => state.menu.data
// export const loadingStatus = (state: any) => state.menu.status;
// export const loading = (state: any) => state.menu.loading;
// export const menuError = (state: any) => state.menu.error;
// export const { setCustomerDisplay } = customerSlice.actions;

export default customerSlice.reducer