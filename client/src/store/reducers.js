import { combineReducers } from "redux";
import userSlice from "./slices/userSlice.js";
import publicsSlice from "./slices/publicsSlice.js";
import projectSlice from "./slices/projectSlice.js";

const rootReducer = combineReducers({
  user: userSlice,
  publics: publicsSlice,
  project: projectSlice,
});

export default rootReducer;
