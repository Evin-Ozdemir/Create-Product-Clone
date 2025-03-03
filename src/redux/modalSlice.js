import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalFunc: (state, action) => {
      state.modal = !state.modal;
      /*action.payload */
    },
  },
});

export const { modalFunc } = modalSlice.actions; // Burada doğru export yapılıyor
export default modalSlice.reducer;
