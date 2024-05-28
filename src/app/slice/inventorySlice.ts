import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiConfig } from "@/interface/InterfaceType"
import axiosClient from "@/axios-client";
import Cookies from "js-cookie";


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

interface ApiConfig {
    url: string;
    method: string;
    data?: any;
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

        builder
            .addCase(updateInventoryParent.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(updateInventoryParent.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
            })
            .addCase(updateInventoryParent.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })

        builder
            .addCase(createInventoryData.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(createInventoryData.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.data = action.payload;
            })
            .addCase(createInventoryData.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
    }
})


//* GET INVENTORY
export const getInventoryData = createAsyncThunk("inventory/getInventoryData", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}${apiconfig.url}`, { headers: { Authorization: `Bearer ${Cookies.get("token")}` } })

        return res.data
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

//* CREATE INVENTORY
export const createInventoryData = createAsyncThunk("inventory/createInventoryData", async (apiconfig: ApiConfig, { rejectWithValue }) => {

    console.log(apiconfig)
    try {

        const res = await axiosClient({
            url: apiconfig.url,
            method: apiconfig.method,
            data: apiconfig.data
        })

        return res.data;
    } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response.data);
    }
})


//* UPDATE EDIT INVENTORY DATA
export const updateInventoryParent = createAsyncThunk("inventory/updateInventoryParent", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        console.log("apiconfig: ", apiconfig)
        const res = await axios({
            method: apiconfig?.method,
            url: `${import.meta.env.VITE_BASE_URL}${apiconfig.url}`,
            data: apiconfig?.data
        });

        return res.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const inventoryData = (state: any) => state.inventory?.data
export const inventoryStatus = (state: any) => state.inventory?.status;



export default inventorySlice.reducer