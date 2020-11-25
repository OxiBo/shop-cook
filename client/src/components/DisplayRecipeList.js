import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchRecipes, searchRecipes, fetchSearchTerm } from "../actions";
import { recipesPerPage } from "../utils/utilVars";
import Spinner from "./Spinner";
import ErrorMessage from "./styles/ErrorMessage";
import Pagination from "./Pagination";
const DisplayRecipesStyles = styled.div`
  grid-area: search-recipes-result;
  /* justify-content: center;
  justify-items: center;
  align-items: center; */

  ul {
    list-style: none;
    :nth-child(even) {
      background-color: "#F9F5F3";
    }
  }
`;

const RecipeItemStyles = styled.li`
  :nth-child(even) {
    background-color: #f9f5f3;
  }
  a,
  a:visited {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    transition: all 0.3s;
    border-right: 1px solid #fff;
    text-decoration: none;
  }
  a:hover {
    background-color: #f9f5f3;
    transform: translateY(-2px);
    background-image: linear-gradient(to right bottom, #f48982, #fbdb89);
    opacity: 0.8;
    h5 {
      filter: brightness(80%);
    }
  }
  figure {
    margin: 0.7rem;
    img {
      /* display: block; */
      width: 70px;
      height: 100%;
      border-radius: 5px;
      object-fit: cover;
      transition: all 0.3s;
    }
  }

  div {
    flex: 1;
    h5 {
      font-size: 1.3rem;
      color: #f59a83;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 0.3rem;
    }
  }
`;

const DisplayRecipeList = ({
  isLoading,
  recipes,
  error,
  fetchRecipes,
  searchTerm,
  searchRecipes,
  ...props
}) => {
  const [recipesList, setRecipes] = useState([]);
  // const [offset, setOffset ] = useState(0)

  useEffect(() => {
    fetchRecipes();
    //    console.log(recipes)
  }, [fetchRecipes]); // runs like componentDidMount (to fetch recipes which are already in the redux store)

  useEffect(() => {
    setRecipes(recipes);
    // console.log(recipes);
  }, [recipes]); // fetching search results after user search for recipes (submits the search form)

  useEffect(() => {
    fetchSearchTerm();
  }, [searchTerm]);

  const pageChange = (newPage) => {
    const offset = newPage * recipesPerPage - recipesPerPage;
    // console.log(newPage);
    searchRecipes(searchTerm, recipesPerPage, offset);
  };

  return (
    <DisplayRecipesStyles>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage>
          <p>{error}</p>
        </ErrorMessage>
      ) : recipesList.results && recipesList.results.length === 0 ? (
        <ErrorMessage>
          <p>No recipes found</p>
        </ErrorMessage>
      ) : (
        <ul>
          {recipesList.results &&
            recipesList.results.map(({ id, title, image }) => (
              <RecipeItemStyles key={id}>
                <a href={`#${id}`}>
                  <figure>
                    <img src={image} alt={title} />
                  </figure>
                  <div>
                    <h5>{title}</h5>
                  </div>
                </a>
              </RecipeItemStyles>
            ))}
        </ul>
      )}
      {/* {recipesList.results && recipesList.results.length > 0 && <Pagination pageChange={pageChange}/>} */}
      {recipesList.results && recipesList.results.length > 0 && (
        <Pagination pageChange={pageChange} />
      )}
    </DisplayRecipesStyles>
  );
};

const mapStateToProps = ({ recipes }) => {
  return {
    recipes: recipes.recipes,
    isLoading: recipes.isLoadingRecipes,
    error: recipes.searchRecipesError,
    searchTerm: recipes.searchTerm,
  };
};

export default connect(mapStateToProps, {
  fetchRecipes,
  searchRecipes,
  fetchSearchTerm,
})(DisplayRecipeList);
