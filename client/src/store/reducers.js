import { combineReducers } from "redux";
import userSlice from "./slices/userSlice.js";
import publicsSlice from "./slices/publicsSlice.js";

const rootReducer = combineReducers({
  user: userSlice,
  publics: publicsSlice,
});

export default rootReducer;
