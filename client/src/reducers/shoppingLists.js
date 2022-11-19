import {
  ADD_TO_SHOPPING_LIST,
  EMPTY_SHOPPING_LIST,
  CREATE_SHOPPING_LIST, // email the list
  UPDATE_SHOPPING_LIST_ITEM,
  FETCH_SHOPPING_LIST,
  IS_LOADING_SHOPPING_LIST,
  SHOPPING_LIST_ERROR,
} from '../actions/types';

const defaultShoppingListState = {
  isLoading: false,
  shoppingList: [],
  message: '',
  createListError: '',
  error: '',
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
      case UPDATE_SHOPPING_LIST_ITEM:
        return {
          ...state,
          isLoading: false,
          shoppingList: action.payload,
        };
    case EMPTY_SHOPPING_LIST:
      return {
        ...state,
        isLoading: false,
        shoppingList: [],
      };
    case IS_LOADING_SHOPPING_LIST:
      return {
        ...state,
        isLoading: true,
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
        createListError: '',
        message: action.payload,
      };
    case SHOPPING_LIST_ERROR:
      return {
        ...state,
        createListError: action.payload,
      };
    default:
      return state;
  }
};
