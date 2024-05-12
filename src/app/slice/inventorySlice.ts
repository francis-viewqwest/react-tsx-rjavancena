import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiConfig } from "@/interface/InterfaceType"


interface InventoryState {
    data: object;
    status: "idle" | "pending" | "fulfilled" | "rejected";
    error: string | null | any;
}

const initialState: InventoryState = {
    data: {},
    status: "idle",
    error: null,
}

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getInventoryData.pending, (state) => {
                state.status = "pending";
                state.error = null
            })
            .addCase(getInventoryData.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload
            })
            .addCase(getInventoryData.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message
            })
    }
})

export const getInventoryData = createAsyncThunk("inventory/getInventoryData", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${apiconfig.url}`)

        return res.data
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})



export const inventoryData = (state: any) => state.inventory?.data
export const inventoryStatus = (state: any) => state.inventory?.status;

export default inventorySlice.reducer