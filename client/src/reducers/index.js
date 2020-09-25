import { combineReducers } from "redux";
import auth from "./auth";
import recipes from "./recipes";
import shoppingLists from "./shoppingLists";


const reducers = combineReducers({
  recipes,
  shoppingLists,
  auth
});
export default reducers;
