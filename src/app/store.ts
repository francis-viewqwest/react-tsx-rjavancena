import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../common/appSlice";
import userReducer from "@/app/slice/UserSlice"
import inventoryReducer from "@/app/slice/inventorySlice"
import menuReducer from "@/app/slice/menuSlice"

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    menu: menuReducer,
    inventory: inventoryReducer,
  },
});

export default store;
