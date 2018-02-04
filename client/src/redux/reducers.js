import { combineReducers } from "redux";
import itemsReducer from "./modules/items";
import profileReducer from "./modules/profile";
import authReducer from "./modules/auth"
import filterReducer from "./modules/filter";

export default combineReducers({
  items: itemsReducer,
  profile: profileReducer,
  auth: authReducer,
  filter: filterReducer,
});
