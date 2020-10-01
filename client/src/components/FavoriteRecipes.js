import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFavRecipes } from "../actions";
// import User from "./RenderProp/User";
import { Heading2, ErrorText } from "./styles/text";
import Spinner from "./Spinner";
const FavoriteRecipes = ({ fetchFavRecipes, favRecipes, isLoading, error }) => {
  useEffect(() => {
    fetchFavRecipes();
  }, [fetchFavRecipes]);
  return (
    <div>
      <Heading2>My Recipes</Heading2>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <div>
          <ul>
            {favRecipes.map(
              ({ recipeId, title, image, sourceName, sourceUrl }) => (
                <li key={recipeId}>
                  <p>{title}</p>
                  <p>
                    {" "}
                    <a href={`/#${recipeId}`}>see details</a>
                  </p>
                  <img width="100px" src={image} alt={title} />
                  <p>by {sourceName}</p>
                  <a href={sourceUrl}>Check out directions</a>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ recipes }) => {
  return {
    favRecipes: recipes.favRecipes,
    isLoading: recipes.isLoadingRecipes,
    error: recipes.recipeError,
  };
};

export default connect(mapStateToProps, { fetchFavRecipes })(FavoriteRecipes);

/*
<User>
      {(user, error) => {
        console.error(error);
        console.log(user);
        return <div>Favorite recipes</div>;
      }}
    </User>

*/
