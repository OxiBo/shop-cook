import React from "react";
import styled from "styled-components";
import { device } from "./styles/breakpoints";
import Container from "./styles/Container";
import Header from "./Header";
import DisplayRecipeList from "./DisplayRecipeList";
import Recipe from "./Recipe";
import ShoppingList from "./ShoppingList";

// const Container = styled.div`
//   background-color: ${(props) => props.theme.mainContainerColor};
//   max-width: 100rem;
//   margin: 3vw auto;
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   box-shadow: 0 2rem 6rem 0.5rem rgba(101, 90, 86, 0.2);
//   border-radius: 5px;

//   @media only screen and (max-width: 68.75em) {
//     margin: 0 auto;
//   }
// `;

const MainContent = styled.main`
  flex: 1;
  display: grid;
  grid-gap: 5px;
  /* grid-template-columns: 20% 50% 30%; */
  grid-template-columns: 1.2fr 2fr 1.2fr;
  grid-template-rows: auto;
  grid-template-areas: "search-recipes-result  recipe shopping-list";
  @media only screen and (max-width: 40rem) {
    margin: 0 auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      "search-recipes-result"
      "recipe"
      "shopping-list";

    grid-gap: 2px;
    /* grid-template-columns: 1fr 1fr 1fr; */
  }
`;

const HomePage = (props) => {
  // console.log(props)
  const recipeId = props.location.hash.replace("#", "");
  return (
<>
      <MainContent>
        <DisplayRecipeList />
        <Recipe recipeId={recipeId} />
        <ShoppingList />
      </MainContent>
      <footer>footer</footer>
      </>
  
  );
};
export default HomePage;
