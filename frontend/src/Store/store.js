import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slices/userSlice";
import noteSlice from "../Slices/noteSlice";
const Store = configureStore({
  reducer: {
    user: userSlice,
    note: noteSlice,
  },
});

export default Store;
