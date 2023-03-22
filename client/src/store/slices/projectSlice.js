import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProject } from "../../utils/FetchOperations";

export const fetchProject = createAsyncThunk(
  "project/post",
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
    children: [],
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
        children: action.payload.children,
        publicUser: action.payload.publicUser,
        isPublic: action.payload.isPublic,
      };
    },

    setChildren: (state, action) => {
      //projet non mis à jour
      const project = { ...action.payload.project };
      //nouvel élement à insérer dans la data
      const tile = { ...action.payload.tile };

      function updateObjectById(obj, idToUpdate, updatedValue) {
        // Si l'objet actuel a l'ID donné, retournez une copie mise à jour
        if (obj.id === idToUpdate) {
          return {
            ...obj,
            title: updatedValue.title,
            tag: updatedValue.tag,
            description: updatedValue.description,
          };
        }
        // Si l'objet actuel a des enfants, récursivement mettez à jour chaque enfant et retournez une copie de l'objet mise à jour avec l'arborescence mise à jour
        if (obj.children && obj.children.length > 0) {
          return {
            ...obj,
            children: obj.children.map((child) =>
              updateObjectById(child, idToUpdate, updatedValue)
            ),
          };
        }

        return obj;
      }

      const updatedProject = updateObjectById(project, tile.id, tile);
      updateProject(updatedProject);

      return updatedProject;

      /*
     
      const childrens = action.payload.children;
      let data;
      const update = (childrens) => {
        console.log(action.payload.tile);
        console.log(childrens);
        childrens.forEach((children, i) => {
          if (children.id === action.payload.tile.id) {
            data = action.payload.tile;
            typeof action.payload.path === "string" &&
              (data = { ...data, image: action.payload.path });
          } else {
            update(children.children);
          }
        });
      };
      update(childrens);
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
      */
    },

    unsetChildren: (state, action) => {
      const childrens = action.payload.children;
      let data;
      const update = (childrens) => {
        childrens.forEach((children, i) => {
          if (children.id === action.payload.tile.id) {
            childrens.splice(i, 1);
          } else {
            update(children.children);
          }
        });
      };
      update(childrens);
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
