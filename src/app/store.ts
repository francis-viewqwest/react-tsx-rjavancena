import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../common/appSlice";
import userReducer from "@/app/slice/userSlice"
import inventoryReducer from "@/app/slice/inventorySlice"
import menuReducer from "@/app/slice/menuSlice"
import usersManagementReducer from "@/app/slice/usersManagementSlice"
import dashboardReducer from "@/app/slice/dashboardSlice"

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    menu: menuReducer,
    inventory: inventoryReducer,
    usersManagement: usersManagementReducer,
    dashboard: dashboardReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
