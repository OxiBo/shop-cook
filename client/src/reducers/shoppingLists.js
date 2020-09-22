import { CREATE_SHOPPING_LIST, FETCH_SHOPPING_LIST, IS_LOADING_SHOPPING_LIST } from "../actions/types";

const defaultShoppingListState = {
  isLoading: false,
  shoppingList: [],
  error: "",
};

export default (state = defaultShoppingListState, action) => {
    // console.log(action)
  switch (action.type) {
    case CREATE_SHOPPING_LIST:
        console.log(state)
        console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        shoppingList: action.payload,
      };
      case IS_LOADING_SHOPPING_LIST:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_SHOPPING_LIST:
      return {
        ...state,
        isLoading: false,
        shoppingList: state.shoppingList, //???
      };
    default:
      return state;
  }
};
