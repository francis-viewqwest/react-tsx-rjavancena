import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../common/appSlice";
import userReducer from "@/app/slice/UserSlice"
import inventoryReducer from "@/app/slice/inventorySlice"

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    inventory: inventoryReducer
  },
});

export default store;
