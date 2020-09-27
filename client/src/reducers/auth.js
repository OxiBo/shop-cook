import { SIGN_UP, AUTH_ERROR, FETCH_USER } from "../actions/types";

const defaultAuthState = {
  user: null,
  authError: "",
};

export default (state = defaultAuthState, action) => {
  // console.log(state.recipe);
  // console.log(action)
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        authError: "",
        user: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
    case FETCH_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
