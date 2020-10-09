import {
  SEARCH_RECIPES,
  FETCH_SEARCH_TERM,
  SAVE_SEARCH_TERM,
  FETCH_RECIPES,
  FETCH_RECIPE,
  FETCH_FAV_RECIPES,
  IS_LOADING_RECIPES,
  IS_LOADING_RECIPE,
  RECIPES_SEARCH_ERROR,
  RECIPE_ERROR,
  CHANGE_SERVINGS,
} from "../actions/types";

const defaultRecipesState = {
  isLoadingRecipes: false,
  recipes: [],
  isLoadingRecipe: false,
  recipe: {},
  searchRecipesError: "",
  recipeError: "",
  favRecipes: [],
  searchTerm: "",
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
    case SAVE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case FETCH_SEARCH_TERM:
      return {
        ...state,
        searchTerm: state.searchTerm,
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
        recipeError: "",
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
          servings: action.payload.servings,
        },
      };
    case FETCH_FAV_RECIPES:
      // console.log(action.payload);
      return {
        ...state,
        isLoadingRecipes: false,
        recipeError: "",
        favRecipes: action.payload,
      };
    default:
      return state;
  }
};
