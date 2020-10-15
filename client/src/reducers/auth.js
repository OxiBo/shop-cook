import { SIGN_UP, AUTH_ERROR, FETCH_USER } from "../actions/types";

const defaultAuthState = {
  user: null,
  authError: "",
  email: ""
};

export default (state = defaultAuthState, action) => {
  // console.log(state.recipe);
  // console.log(action)
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        authError: "",
        user: action.payload || null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload || null,
      };
    case FETCH_USER: {
      return {
        ...state,
        authError: "",
        user: action.payload || null,
      };
    }
    default:
      return state;
  }
};
