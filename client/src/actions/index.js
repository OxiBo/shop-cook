import axios from 'axios'
import recipes from "../utils/spoonacularAPI";

import {
  SEARCH_RECIPES,
  FETCH_RECIPES,
  IS_LOADING_RECIPES,
  IS_LOADING_RECIPE,
  FETCH_RECIPE,
  RECIPES_SEARCH_ERROR,
  RECIPE_ERROR,
  CREATE_SHOPPING_LIST,
  FETCH_SHOPPING_LIST,
  IS_LOADING_SHOPPING_LIST,
  CHANGE_SERVINGS,
} from "./types";
import Axios from "axios";

export const signUp = (userInfo) => async (dispatch) => {
  try {
    console.log(userInfo);
    if(userInfo.name){
      const res = await axios.post("/api/signup", userInfo)
      console.log(res)
    }
  } catch (err) {
    console.log(err);
    // dispatch()
  }
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

export const fetchRecipe = (id) => async (dispatch) => {
  try {
    // https://api.spoonacular.com/recipes/511728/information?apiKey=${spoonacularAPI_KEY}
    const res = await recipes.get(`/${id}/information?`);
    // console.log(res);
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
          amount,
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

export const createShoppingList = (ingredients) => async (
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
      type: CREATE_SHOPPING_LIST,
      payload: updatedList,
    });
  } else {
    dispatch({
      type: CREATE_SHOPPING_LIST,
      payload: ingredients,
    });
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
