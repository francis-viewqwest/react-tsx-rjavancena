import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiConfig, InventoryState } from "@/interface/InterfaceType"
import useAxiosClient from "@/axios-client";

const axiosClient = useAxiosClient();

const initialState: InventoryState = {
    data: {},
    status: "",
    error: false,
    updateParentErrorMessage: false,
    updateChildMessage: false,
    loadingTable: false,
    loadingCreate: false,
    loadingUpdate: false,
    loadingCreateChild: false,
}

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        resetLoading: (state) => {
            state.status = "idle";
        }
    },
    extraReducers: (builder) => {

        //* GET INVENTORY 
        builder
            .addCase(getInventoryData.pending, (state) => {
                state.status = "getInventoryData/loading";
                state.error = null
            })
            .addCase(getInventoryData.fulfilled, (state, action) => {
                state.status = "getInventoryData/success";
                state.data = action.payload
            })
            .addCase(getInventoryData.rejected, (state, action) => {
                state.status = "getInventoryData/failed";
                state.error = action.payload
            })

        //* GET INVENTORY CHILD
        builder
            .addCase(getInventoryDataChild.pending, (state) => {
                state.status = "getInventoryDataChild/loading";
                state.loadingTable = true;
                state.error = null;
            })
            .addCase(getInventoryDataChild.fulfilled, (state, action) => {
                state.status = "getInventoryDataChild/success";
                state.loadingTable = false;
                state.data = action.payload;
            })
            .addCase(getInventoryDataChild.rejected, (state, action) => {
                state.status = "getInventoryDataChild/failed";
                state.loadingTable = false;
                state.error = action.payload
            })

        //* UPDATE INVENTORY 
        builder
            .addCase(updateInventoryParent.pending, (state) => {
                state.status = "updateInventoryParent/loading";
                state.loadingUpdate = true;
                state.error = null;
            })
            .addCase(updateInventoryParent.fulfilled, (state, action) => {
                state.status = "updateInventoryParent/success";
                state.loadingUpdate = false;
                state.data = action.payload;
            })
            .addCase(updateInventoryParent.rejected, (state, action) => {
                state.status = "updateInventoryParent/failed";
                state.loadingUpdate = false;
                state.updateParentErrorMessage = action.payload;
            })

        //* CREATE INVENTORY 
        builder
            .addCase(createInventoryData.pending, (state) => {
                state.status = "createInventoryParent/loading";
                state.loadingCreate = true;
                state.error = null;
            })
            .addCase(createInventoryData.fulfilled, (state, action) => {
                state.status = "createInventoryParent/success";
                state.loadingCreate = false;
                state.data = action.payload;
            })
            .addCase(createInventoryData.rejected, (state, action) => {
                state.status = "createInventoryParent/failed";
                state.loadingCreate = false;
                state.error = action.payload;
            })

        //* CREATE INVENTORY CHILD
        builder
            .addCase(createInventoryChildData.pending, (state) => {
                state.status = "createInventoryChild/loading";
                state.loadingCreateChild = true;
                state.error = null;
            })
            .addCase(createInventoryChildData.fulfilled, (state, action) => {
                state.status = "createInventoryChild/success";
                state.loadingCreateChild = false;
                state.data = action.payload;
            })
            .addCase(createInventoryChildData.rejected, (state, action) => {
                state.status = "createInventoryChild/failed";
                state.loadingCreateChild = false;
                state.error = action.payload;
            })

        //* UPDATE INVENTORY CHILD
        builder
            .addCase(updateInventoryChild.pending, (state) => {
                state.status = "updateInventoryChild/loading";
                state.error = null;
            })
            .addCase(updateInventoryChild.fulfilled, (state, action) => {
                state.status = "updateInventoryChild/success";
                state.data = action.payload;
                state.updateChildMessage = action.payload;
            })
            .addCase(updateInventoryChild.rejected, (state, action) => {
                state.status = "updateInventoryChild/failed";
                state.error = action.payload;
            })

        //* DELETE INVENTORY 
        builder
            .addCase(deleteInventoryData.pending, (state) => {
                state.status = "deleteInventoryData/loading";
                state.error = null;
            })
            .addCase(deleteInventoryData.fulfilled, (state, action) => {
                state.status = "deleteInventoryData/success";
                state.data = action.payload;
            })
            .addCase(deleteInventoryData.rejected, (state, action) => {
                state.status = "deleteInventoryData/failed";
                state.error = action.payload
            })

        //* DELETE INVENTORY CHILD
        builder
            .addCase(deleteInventoryChildData.pending, (state) => {
                state.status = "deleteInventoryChildData/loading";
                state.error = null;
            })
            .addCase(deleteInventoryChildData.fulfilled, (state, action) => {
                state.status = "deleteInventoryChildData/success";
                state.data = action.payload;
            })
            .addCase(deleteInventoryChildData.rejected, (state, action) => {
                state.status = "deleteInventoryChildData/failed";
                state.error = action.payload
            })
    }
})


//* GET INVENTORY
export const getInventoryData = createAsyncThunk("inventory/getInventoryData", async (apiconfig: ApiConfig, { rejectWithValue }) => {
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

//* GET INVENTORY CHILD
export const getInventoryDataChild = createAsyncThunk("inventory/getInventoryDataChild", async (apiconfig: ApiConfig, { rejectWithValue }) => {

    console.log(apiconfig)
    try {
        const res = await axiosClient({
            url: `inventory/parent/product/show/${apiconfig.url}`,
            method: "GET"
        })

        return res.data
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

//* CREATE INVENTORY
export const createInventoryData = createAsyncThunk("inventory/createInventoryData", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {

        const res = await axiosClient({
            headers: { "Content-Type": "multipart/form-data", },
            url: apiconfig.url,
            method: apiconfig.method,
            data: apiconfig.data
        })

        return res.data;
    } catch (error: any) {
        console.log(error)
        return rejectWithValue(error.response?.data?.message || error.response.data.message);
    }
})

//* CREATE INVENTORY CHILD
export const createInventoryChildData = createAsyncThunk("inventory/createInventoryChildData", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    console.log(apiconfig.data)
    try {
        const res = await axiosClient({
            headers: { "Content-Type": "multipart/form-data", },
            url: apiconfig.url,
            method: apiconfig.method,
            data: apiconfig.data
        })

        return res.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.response.data.message);
    }
})


//* UPDATE EDIT INVENTORY DATA
export const updateInventoryParent = createAsyncThunk("inventory/updateInventoryParent", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        console.log("apiconfig: ", apiconfig)
        const res = await axiosClient({
            headers: { "Content-Type": "multipart/form-data", },
            method: apiconfig.method,
            url: apiconfig.url,
            data: apiconfig.data
        });

        return res.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const updateInventoryChild = createAsyncThunk("inventory/updateInventoryChildData", async (apiconfig: ApiConfig, { rejectWithValue }) => {
    try {
        const res = await axiosClient({
            headers: { "Content-Type": "multipart/form-data", },
            method: apiconfig?.method,
            url: apiconfig?.url,
            data: apiconfig?.data
        })

        return res.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

//* DELETE INVENTORY DATA
export const deleteInventoryData = createAsyncThunk("inventory/deleteInventoryData", async (apiconfig: ApiConfig, { rejectWithValue }) => {

    try {
        const res = await axiosClient({
            method: apiconfig.method,
            url: apiconfig.url,
            data: apiconfig?.data
        })

        return res.data
    } catch (error: any) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response?.data?.message || error.message);
    }

})

//* DELETE INVENTORY CHILD DATA
export const deleteInventoryChildData = createAsyncThunk("inventory/deleteInventoryChildData", async (apiconfig: ApiConfig, { rejectWithValue }) => {

    try {
        const res = await axiosClient({
            method: apiconfig.method,
            url: apiconfig.url,
            data: apiconfig?.data
        })

        return res.data
    } catch (error: any) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response?.data?.message || error.message);
    }

})


export const inventoryData = (state: any) => state.inventory.data
export const loadingStatus = (state: any) => state.inventory.status;
export const inventoryError = (state: any) => state.inventory.error



export default inventorySlice.reducer