import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    title: "",
    support: "",
    theme: "",
    image: "",
    user: "",
    data: [],
    publicUser: "",
    isPublic: false,
  },
  reducers: {
    setProject: (state, action) => {
      return {
        _id: action.payload._id,
        title: action.payload.title,
        support: action.payload.support,
        theme: action.payload.theme,
        image: action.payload.image,
        user: action.payload.user,
        data: action.payload.data,
        publicUser: action.payload.publicUser,
        isPublic: action.payload.isPublic,
      };
    },
  },
});

export const { setProject } = projectSlice.actions;

export default projectSlice.reducer;
