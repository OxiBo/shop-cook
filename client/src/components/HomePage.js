import React from "react";
import styled from "styled-components";
import { device } from "./styles/breakpoints";

import DisplayRecipeList from "./DisplayRecipeList";
import Recipe from "./Recipe";
import ShoppingList from "./ShoppingList";
import User from "./RenderProp/User";

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: grid;
  grid-gap: 2px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "search-recipes-result"
    "recipe"
    "shopping-list";

  @media only screen and (min-width: 768px) {
    grid-gap: 5px;
    grid-template-columns: 1.2fr 2fr 1.2fr;
    grid-template-rows: auto;
    grid-template-areas: "search-recipes-result  recipe shopping-list";
  }
`;

const HomePage = (props) => {
  // console.log(props)
  const recipeId = props.location.hash.replace("#", "");
  // console.log(recipeId)
  return (
    <User>
      {(data, error) => {
        console.log(data);

        return (
          <MainContent>
            <DisplayRecipeList />
            <Recipe recipeId={recipeId} user={data} userError={error}/>
            <ShoppingList user={data} userError={error} />
          </MainContent>
        );
      }}
    </User>
  );
};
export default HomePage;
