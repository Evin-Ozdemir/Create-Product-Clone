import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    data: dataSlice,
  },
});

export default store; // default export yap
