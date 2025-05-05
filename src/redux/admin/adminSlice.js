import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      return {
        token,
      };
    },
    clearCredentials: () => initialState,
    updateServices: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, updateServices } =
  adminSlice.actions;
export default adminSlice.reducer;
