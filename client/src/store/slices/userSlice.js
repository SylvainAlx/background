import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    pseudo: "",
    email: "",
    password: "",
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      return {
        id: action.payload._id,
        pseudo: action.payload.pseudo,
        email: action.payload.email,
        password: action.payload.password,
        isAdmin: action.payload.isAdmin,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
