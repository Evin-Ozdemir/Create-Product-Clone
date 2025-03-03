import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  keyword: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createDataFunc: (state, action) => {
      state.data.push({ ...action.payload, id: Date.now() });
    },
    sortingDataFunc: (state, action) => {
      state.data = [
        ...state.data.sort((a, b) =>
          action.payload === "asc"
            ? a.price - b.price
            : action.payload === "desc"
            ? b.price - a.price
            : null
        ),
      ];
    },
    searchDataFunc: (state, action) => {
      state.keyword = action.payload;
    },
    deleteDataFunc: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateDataFunc: (state, action) => {
      const updatedData = state.data.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      state.data = updatedData;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createDataFunc,
  deleteDataFunc,
  updateDataFunc,
  sortingDataFunc,
  searchDataFunc,
} = dataSlice.actions;

export default dataSlice.reducer;
