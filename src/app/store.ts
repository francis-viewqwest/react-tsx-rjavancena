import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../common/appSlice";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export default store;
