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
      const project = {
        _id: action.payload._id,
        id: 0,
        title: action.payload.title,
        support: action.payload.support,
        theme: action.payload.theme,
        description: action.payload.description,
        image: action.payload.image,
        user: action.payload.user,
        children: action.payload.children,
        publicUser: action.payload.publicUser,
        isPublic: action.payload.isPublic,
      };
      updateProject(project);
      return project;
    },

    createChildren: (state, action) => {
      //projet non mis à jour
      const project = { ...action.payload.project };
      //nouvel élement à insérer dans la data
      const tile = { ...action.payload.tile };
      function createNewChildren(obj, newTile, parentId) {
        if (obj.id === parentId) {
          const newArray = [...obj.children];
          newArray.push(newTile);
          return {
            ...obj,
            children: newArray,
          };
        }
        // Si l'objet actuel a des enfants, récursivement mettez à jour chaque enfant et retournez une copie de l'objet mise à jour avec l'arborescence mise à jour
        if (obj.children && obj.children.length > 0) {
          return {
            ...obj,
            children: obj.children.map((child) =>
              createNewChildren(child, newTile, parentId)
            ),
          };
        }
      }
      const updatedProject = createNewChildren(project, tile, tile.parentId);
      console.log(updatedProject);
      //updateProject(updatedProject);
      //return updatedProject;
    },

    setChildren: (state, action) => {
      //projet non mis à jour
      const project = { ...action.payload.project };
      //Élement à mettre à jour dans la data
      const tile = { ...action.payload.tile };
      const path = action.payload.path !== undefined ? action.payload.path : "";
      function updateObjectById(obj, idToUpdate, updatedValue) {
        // Si l'objet actuel a l'ID donné, retournez une copie mise à jour
        if (obj.id === idToUpdate) {
          return {
            ...obj,
            title: updatedValue.title,
            image: path,
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
    },

    unsetChildren: (state, action) => {
      const project = { ...action.payload.project };
      const tile = { ...action.payload.tile };
      function removeObjectById(obj, tileId, parentId) {
        if (obj.id === parentId) {
          return {
            ...obj,
            children: obj.children
              .filter((child) => child.id !== tileId)
              .map((child) => child),
          };
        }
        if (obj.children && obj.children.length > 0) {
          return {
            ...obj,
            children: obj.children.map((child) =>
              removeObjectById(child, tileId, parentId)
            ),
          };
        }
        return obj;
      }
      const updatedProject = removeObjectById(project, tile.id, tile.parentId);
      updateProject(updatedProject);
      return updatedProject;
    },
  },
});

export const { setProject, createChildren, setChildren, unsetChildren } =
  projectSlice.actions;

export default projectSlice.reducer;
