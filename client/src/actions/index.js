import axios from 'axios';
import recipes from '../utils/spoonacularAPI';
import { toast } from 'react-toastify';

// import { toastOptions, errorToastStyle } from "../components/styles/toastify";
import {
  SEARCH_RECIPES,
  SAVE_SEARCH_TERM,
  FETCH_SEARCH_TERM,
  FETCH_RECIPES,
  IS_LOADING_RECIPES,
  IS_LOADING_RECIPE,
  FETCH_RECIPE,
  LIKE_RECIPE,
  RECIPES_SEARCH_ERROR,
  RECIPE_ERROR,
  ADD_TO_SHOPPING_LIST,
  EMPTY_SHOPPING_LIST,
  UPDATE_SHOPPING_LIST_ITEM,
  CREATE_SHOPPING_LIST,
  SHOPPING_LIST_ERROR,
  FETCH_SHOPPING_LIST,
  IS_LOADING_SHOPPING_LIST,
  CHANGE_SERVINGS,
  AUTH_ERROR,
  SIGN_UP,
  FETCH_USER,
  FETCH_FAV_RECIPES,
  FETCH_TOTAL_FAV_RECIPES,
  // REMOVE_FAVORITE
} from './types';
import { favRecipesPerPage } from '../utils/utilVars';

export const fetchUser = () => async (dispatch) => {
  try {
    console.log('fetching user');
    const res = await axios.get('/api/user');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
};

export const getUserFromStore = () => async (dispatch, getState) => {
  const storedInState = getState();
  console.log(storedInState);
  console.log('????');
  dispatch({ type: 'GET_STORED_USER' });
};

export const signUp = (userInfo, history) => async (dispatch) => {
  //   console.log("????")
  //   const res = await axios.post(
  //   `/api/${userInfo.name ? "signup" : "login"}`,
  //   userInfo
  // );

  // console.log(res)
  try {
    const res = await axios.post(
      `/api/${userInfo.name !== '' ? 'signup' : 'login'}`,
      userInfo
    );
    // console.log(res);
    dispatch({ type: SIGN_UP, payload: res.data });
    history.push('/');
  } catch (err) {
    console.error(err);
    dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
  }
};

export const clearAuthError = () => {
  return {
    type: AUTH_ERROR,
    payload: '',
  };
};

export const resetPassword = (resetToken, password, history) => async (
  dispatch
) => {
  try {
    const res = await axios.patch('/api/reset', { resetToken, password });

    await dispatch({ type: FETCH_USER, payload: res.data });

    toast('Your password has been reset successfully!');
    history.push('/');
  } catch (err) {
    console.error(err);
    dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
  }
};

export const searchRecipes = (name, recipesPerPage, offset = 0) => async (
  dispatch
) => {
  try {
    // console.log("dispatch search recipes");
    const res = await recipes.get(
      `/complexSearch?query=${name}&number=${recipesPerPage}&offset=${offset}`
    );
    // console.log(res);
    dispatch({ type: SEARCH_RECIPES, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: RECIPES_SEARCH_ERROR, payload: 'Failed to load recipes' });
  }
};

export const saveSearchTerm = (term) => {
  return {
    type: SAVE_SEARCH_TERM,
    payload: term,
  };
};

export const fetchSearchTerm = () => {
  return {
    type: FETCH_SEARCH_TERM,
  };
};
// ???? why
export const fetchRecipes = () => {
  return {
    type: FETCH_RECIPES,
  };
};

export const isLoadingRecipes = () => {
  return {
    type: IS_LOADING_RECIPES,
  };
};

export const isLoadingRecipe = () => {
  return {
    type: IS_LOADING_RECIPE,
  };
};

export const likeRecipe = (details) => async (dispatch) => {
  console.log(details);

  try {
    const res = await axios.post('/api/recipes/add', details);
    // console.log(res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.error(err);
    //TODO ?? Toast with warning that the recipe was not added
    dispatch({
      type: AUTH_ERROR,
      payload: 'Failed to add the recipe to favorites',
    });
  }

  // return {
  //   type: LIKE_RECIPE,
  // };
};

// TODO - how to add recipeId to hash when it is a random recipe on page load
export const fetchRecipe = (recipeFromResultsId, random = false) => async (
  dispatch
) => {
  try {
    let res;
    // console.log(random)
    if (random) {
      res = await recipes.get('/random?number=1');
      res.data = res.data.recipes[0];
      // console.log(res.data);
    } else {
      // https://api.spoonacular.com/recipes/511728/information?apiKey=${spoonacularAPI_KEY}
      res = await recipes.get(`/${recipeFromResultsId}/information?`);
      // console.log(res);
    }
    // console.log(res.data);
    const {
      id,
      extendedIngredients,
      image,
      readyInMinutes,
      servings,
      sourceName,
      sourceUrl,
      title,
    } = res.data;
    // console.log(id);
    const ingredients = extendedIngredients.reduce(
      (acc, { amount, name, measures, original }) => {
        const parsedIngredient = {
          amount: Math.round(amount * 100) / 100,
          name: name === 'seasoning' ? original : name,
          unit: measures.us.unitShort,
          original,
        };
        acc.push(parsedIngredient);
        return acc;
      },
      []
    );
    const recipe = {
      recipeId: id.toString(),
      ingredients,
      image,
      readyInMinutes,
      servings,
      sourceName,
      sourceUrl,
      title,
    };
    // console.log(recipe);
    dispatch({ type: FETCH_RECIPE, payload: recipe });
  } catch (error) {
    console.error(error);
    dispatch({ type: RECIPE_ERROR, payload: 'Failed to load recipe details' });
  }
};

export const fetchFavRecipes = (
  offset = 0,
  recipesPerPage = favRecipesPerPage
) => async (dispatch) => {
  try {
    // const res = await axios.get("/api/recipes");

    const res = await axios.get(
      `/api/recipes?limit=${recipesPerPage}&offset=${offset}`
    );
    // console.log(res.data);
    dispatch({
      type: FETCH_FAV_RECIPES,
      payload: res.data.paginatedRecipesList,
    });
    dispatch({ type: FETCH_TOTAL_FAV_RECIPES, payload: res.data.total });
  } catch (err) {
    console.error(err);
  }
};

export const addToShoppingList = (ingredients) => async (
  dispatch,
  getState
) => {
  console.log(ingredients);
  // need to create a deep copy of the current shopping list. https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
  const currentShoppingList = getState().shoppingLists.shoppingList;

  if (currentShoppingList.length) {
    const joinedLists = [...currentShoppingList, ...ingredients];
    // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
    const deepCopy = JSON.parse(JSON.stringify(joinedLists));

    const updatedList = deepCopy.reduce((acc, item) => {
      const isExists = acc.findIndex(
        (old) => old.name === item.name && old.unit === item.unit
      );

      if (isExists >= 0) {
        acc[isExists].amount = acc[isExists].amount + item.amount;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    // console.log(updatedList)

    dispatch({
      type: ADD_TO_SHOPPING_LIST,
      payload: updatedList,
    });
  } else {
    dispatch({
      type: ADD_TO_SHOPPING_LIST,
      payload: ingredients,
    });
  }
};

export const updateShoppingListItem = (ingredient) => async (
  dispatch,
  getState
) => {
  // get current shopping list from state
  const currentShoppingList = getState().shoppingLists.shoppingList;

  // create a deep copy of the state
  // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
  const ingredientsListCopy = JSON.parse(JSON.stringify(currentShoppingList));
  //find index of the item to update
  const indexOfItem = ingredientsListCopy.findIndex(
    (item) => item.name === ingredient.name
  );

  // check if the ingredient is already in the list, if it is  - update, if not - add
  if (indexOfItem >= 0) {
    ingredientsListCopy[indexOfItem] = ingredient;
  } else {
    ingredientsListCopy.push(ingredient);
  }
  // update the ingredient
  dispatch({
    type: UPDATE_SHOPPING_LIST_ITEM,
    payload: ingredientsListCopy,
  });
};

export const createShoppingList = (list) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SHOPPING_LIST,
      payload: 'Success!The list has been emailed to the email provided!',
    });

    toast(
      'Success! Your shopping list has been sent to provided email address!'
    );
    // toast(
    //   "Success! Your shopping list has been sent to provided email address!",
    //   toastOptions
    // );
  } catch (err) {
    console.error(err);
    dispatch({ type: SHOPPING_LIST_ERROR, payload: err });
  }
};

export const emptyShoppingList = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPTY_SHOPPING_LIST,
    });

    toast('Success! Your shopping list has been deleted!');
  } catch (err) {
    console.error(err);
  }
};

export const fetchShoppingList = () => {
  return {
    type: FETCH_SHOPPING_LIST,
  };
};

export const isLoadingShoppingList = () => {
  return {
    type: IS_LOADING_SHOPPING_LIST,
  };
};

export const changeServings = (currentServings, newServing, ingredients) => {
  const updatesIngredients = ingredients.map((ingredient) => {
    const newAmount =
      newServing === 1
        ? ingredient.amount + ingredient.amount / currentServings
        : ingredient.amount - ingredient.amount / currentServings;

    return { ...ingredient, amount: Math.ceil(newAmount * 100) / 100 };
  });
  return {
    type: CHANGE_SERVINGS,
    payload: {
      ingredients: updatesIngredients,
      servings: currentServings + newServing,
    },
  };
};
