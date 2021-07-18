// cette index.js permet de regrouper tout les reducer
import { combineReducers } from "redux";
import userReducer from "../reducers/user.reducer";
import usersReducer from "./users.reducer";

// On ajoute tout nos reducer
export default combineReducers({
  userReducer,
  usersReducer,
});
