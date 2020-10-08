import axios from "axios";
import recipes from "../utils/spoonacularAPI";

import {
  SEARCH_RECIPES,
  FETCH_RECIPES,
  IS_LOADING_RECIPES,
  IS_LOADING_RECIPE,
  FETCH_RECIPE,
  LIKE_RECIPE,
  RECIPES_SEARCH_ERROR,
  RECIPE_ERROR,
  ADD_TO_SHOPPING_LIST,
  CREATE_SHOPPING_LIST,
  SHOPPING_LIST_ERROR,
  FETCH_SHOPPING_LIST,
  IS_LOADING_SHOPPING_LIST,
  CHANGE_SERVINGS,
  AUTH_ERROR,
  SIGN_UP,
  FETCH_USER,
  FETCH_FAV_RECIPES,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user");
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: AUTH_ERROR, payload: err.message });
  }
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
      `/api/${userInfo.name !== "" ? "signup" : "login"}`,
      userInfo
    );
    console.log(res);
    dispatch({ type: SIGN_UP, payload: res.data });
    history.push("/");
  } catch (err) {
    console.error(err);
    dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
  }
};

export const clearAuthError = () => {
  return {
    type: AUTH_ERROR,
    payload: "",
  };
};

export const searchRecipes = (name, resultsNumber = 10) => async (dispatch) => {
  try {
    // console.log("dispatch");
    const res = await recipes.get(
      `/complexSearch?query=${name}&number=${resultsNumber}`
    );
    // console.log(res);
    dispatch({ type: SEARCH_RECIPES, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: RECIPES_SEARCH_ERROR, payload: "Failed to load recipes" });
  }
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
  // console.log(details);
  try {
    const res = await axios.post("/api/recipes/add", details);
    // console.log(res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    console.error(err);
    //TODO Toast with warning that the recipe was not added
    dispatch({
      type: AUTH_ERROR,
      payload: "Failed to add the recipe to favorites",
    });
  }

  return {
    type: LIKE_RECIPE,
  };
};

export const fetchRecipe = (id, random = false) => async (dispatch) => {
  try {
    let res;
    if (random) {
      res = await await recipes.get("/random?number=1");
      res.data = res.data.recipes[0];
      // console.log(res.data);
    } else {
      // https://api.spoonacular.com/recipes/511728/information?apiKey=${spoonacularAPI_KEY}
      res = await recipes.get(`/${id}/information?`);
      // console.log(res);
    }

    const {
      extendedIngredients,
      image,
      readyInMinutes,
      servings,
      sourceName,
      sourceUrl,
      title,
    } = res.data;

    const ingredients = extendedIngredients.reduce(
      (acc, { amount, name, measures, original }) => {
        const parsedIngredient = {
          amount: Math.round(amount * 100) / 100,
          name: name === "seasoning" ? original : name,
          unit: measures.us.unitShort,
          original,
        };
        acc.push(parsedIngredient);
        return acc;
      },
      []
    );
    const recipe = {
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
    dispatch({ type: RECIPE_ERROR, payload: "Failed to load recipe details" });
  }
};

export const fetchFavRecipes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/recipes");
    // console.log(res.data);
    dispatch({ type: FETCH_FAV_RECIPES, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addToShoppingList = (ingredients) => async (
  dispatch,
  getState
) => {
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

export const createShoppingList = (list) => async (dispatch) => {
  try {
    console.log(list)
    const res = await axios.patch("./api/shoppingList/new", list);
    console.log(res);
    dispatch({ type: CREATE_SHOPPING_LIST, payload: "Success! The list has been mailed to your email!"})
  } catch (err) {
    console.error(err);
    dispatch({ type: SHOPPING_LIST_ERROR, payload: err });
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
