import { SIGNUP } from "../actions/types";

const defaultAuthState = {
  user: null,
  authError: "",
};

export default (state = defaultAuthState, action) => {
  // console.log(state.recipe);
  // console.log(action)
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
