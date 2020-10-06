import { ADD_TO_SHOPPING_LIST, CREATE_SHOPPING_LIST, FETCH_SHOPPING_LIST, IS_LOADING_SHOPPING_LIST, SHOPPING_LIST_ERROR } from "../actions/types";

const defaultShoppingListState = {
  isLoading: false,
  shoppingList: [],
  message: "",
  createListError: "",
  error: "",
};

export default (state = defaultShoppingListState, action) => {
    // console.log(action)
  switch (action.type) {
    case ADD_TO_SHOPPING_LIST:
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
      case CREATE_SHOPPING_LIST:
        return {
          ...state,
          message: action.payload
        }
        case SHOPPING_LIST_ERROR:
          return {
            ...state,
            createListError: action.payload
          }
    default:
      return state;
  }
};
