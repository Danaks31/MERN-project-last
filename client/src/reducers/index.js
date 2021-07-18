// cette index.js permet de regrouper tout les reducer
import { combineReducers } from "redux";
import userReducer from "../reducers/user.reducer";

export default combineReducers({
  userReducer,
});
