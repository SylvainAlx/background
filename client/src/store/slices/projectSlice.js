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

    createChildren: (state, action) => {
      //projet non mis à jour
      const project = { ...action.payload.project };
      //nouvel élement à insérer dans la data
      const tile = { ...action.payload.tile };
      function createNewChildren(children, newChild) {
        return children.map((child, i) => {
          if (child.id === newChild.parentId) {
            const update = [...child.children];
            update.push(newChild);
            return update;
          }
          if (child.children.length > 0) {
            createNewChildren(child.children);
          }
        });
      }

      console.log(createNewChildren(project.children, tile));
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
    },

    unsetChildren: (state, action) => {
      //projet non mis à jour
      const project = { ...action.payload.project };
      //nouvel élement à insérer dans la data
      const tile = { ...action.payload.tile };

      function removeObjectById(obj, id) {
        // Vérifier si l'objet courant contient un tableau
        if (Array.isArray(obj)) {
          // Parcourir tous les éléments du tableau
          for (let i = 0; i < obj.length; i++) {
            // Si l'élément courant est un objet, appeler récursivement la fonction sur cet objet
            if (typeof obj[i] === "object") {
              removeObjectById(obj[i], id);
            }
          }
        } else {
          // Si l'objet courant n'est pas un tableau
          // Parcourir toutes les propriétés de l'objet
          for (let prop in obj) {
            // Si la propriété courante est un objet, appeler récursivement la fonction sur cet objet
            if (typeof obj[prop] === "object") {
              removeObjectById(obj[prop], id);
            }
            // Si la propriété courante est l'id recherché, supprimer l'objet du tableau parent
            else if (
              prop === "id" &&
              obj[prop] === id &&
              Array.isArray(obj.parent)
            ) {
              return obj.parent.splice(obj.index, 1);
            }
          }
        }
      }

      const updatedProject = removeObjectById(project, tile.id);
      console.log(updatedProject);
      //updateProject(updatedProject);

      //return updatedProject;
    },
  },
});

export const { setProject, createChildren, setChildren, unsetChildren } =
  projectSlice.actions;

export default projectSlice.reducer;
