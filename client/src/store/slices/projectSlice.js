import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProject } from "../../utils/FetchOperations";

export const fetchProject = createAsyncThunk(
  "products/get",
  async (payload) => {
    return await updateProject(payload);
  }
);

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
    extraReducers: (builder) => {
      builder.addCase(fetchProject.fulfilled, (state, action) => {
        return state;
      });
      builder.addCase(fetchProject.rejected, (state, action) => {
        return {
          ...state,
          error: { message: "an error occured", status: 500 },
        };
      });
    },

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

    setChildren: (state, action) => {
      const childrens = action.payload.children;
      let data;
      const update = () => {
        childrens.forEach((children, i) => {
          if (children.id === action.payload.tile.id) {
            data = action.payload.tile;
            typeof action.payload.path === "string" &&
              (data.image = action.payload.path);
          } else {
            update(children.children);
          }
        });
      };
      update(action.children);
      const newData = state.data.map((e) => {
        if (e.id === action.payload.tile.id) {
          return data;
        } else {
          return e;
        }
      });
      updateProject({
        ...state,
        data: newData,
      });
      return {
        ...state,
        data: newData,
      };
    },

    unsetChildren: (state, action) => {
      const childrens = action.payload.children;
      let data;
      const update = () => {
        childrens.forEach((children, i) => {
          if (children.id === action.payload.tile.id) {
            childrens.splice(i, 1);
          } else {
            update(children.children);
          }
        });
      };
      update(action.children);
      const newData = state.data.map((e) => {
        if (e.id === action.payload.tile.id) {
          return data;
        } else {
          return e;
        }
      });
      updateProject({
        ...state,
        data: newData,
      });
      return {
        ...state,
        data: newData,
      };
    },
  },
});

export const { setProject, setChildren, unsetChildren } = projectSlice.actions;

export default projectSlice.reducer;
