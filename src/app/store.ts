import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../common/appSlice";
import userReducer from "@/app/slice/UserSlice"
import inventoryReducer from "@/app/slice/inventorySlice"
import menuReducer from "@/app/slice/menuSlice"
import usersManagementReducer from "@/app/slice/usersManagementSlice"

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    menu: menuReducer,
    inventory: inventoryReducer,
    usersManagement: usersManagementReducer,
  },
});

export default store;
