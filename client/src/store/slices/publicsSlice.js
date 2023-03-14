import { createSlice } from "@reduxjs/toolkit";

export const publicsSlice = createSlice({
  name: "publics",
  initialState: { projects: [] },
  reducers: {
    setPublics: (state, action) => {
      return {
        projects: action.payload,
      };
    },
  },
});

export const { setPublics } = publicsSlice.actions;

export default publicsSlice.reducer;
