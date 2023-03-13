import { combineReducers } from "redux";
import userSlice from "./slices/userSlice.js";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
