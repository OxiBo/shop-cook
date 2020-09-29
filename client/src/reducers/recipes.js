import {
  SEARCH_RECIPES,
  FETCH_RECIPES,
  FETCH_RECIPE,
  LIKE_RECIPE,
  IS_LOADING_RECIPES,
  IS_LOADING_RECIPE,
  RECIPES_SEARCH_ERROR,
  RECIPE_ERROR,
  CHANGE_SERVINGS
} from "../actions/types";

const defaultRecipesState = {
  isLoadingRecipes: false,
  recipes: [],
  isLoadingRecipe: false,
  recipe: {},
  searchRecipesError: "",
  recipeError: "",
};

export default (state = defaultRecipesState, action) => {
  // console.log(state.recipe);
  // console.log(action)
  switch (action.type) {
    case SEARCH_RECIPES:
      return {
        ...state,
        isLoadingRecipes: false,
        searchRecipesError: "",
        recipes: action.payload,
      };
    case RECIPES_SEARCH_ERROR:
      return {
        ...state,
        isLoadingRecipes: false,
        searchRecipesError: action.payload,
      };
    case IS_LOADING_RECIPES:
      return {
        ...state,
        isLoadingRecipes: true,
      };
    case FETCH_RECIPES:
      return {
        ...state,
        recipes: state.recipes,
        isLoadingRecipes: false,
      };
    case IS_LOADING_RECIPE:
      return {
        ...state,
        isLoadingRecipe: true,
      };
    case FETCH_RECIPE:
      // console.log(action.payload);
      return {
        ...state,
        isLoadingRecipe: false,
        recipe: action.payload,
      
      };
    case RECIPE_ERROR:
      return {
        ...state,
        recipeError: action.payload,
        isLoadingRecipe: false,
      };
      case CHANGE_SERVINGS:
        return {
          ...state,
          recipe: {
            ...state.recipe,
            ingredients: action.payload.ingredients,
            servings: action.payload.servings
          }
        }
    default:
      return state;
  }
};
