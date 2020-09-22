import { combineReducers } from "redux";
import recipes from "./recipes";
import shoppingLists from "./shoppingLists";

const reducers = combineReducers({
  recipes,
  shoppingLists
});
export default reducers;
