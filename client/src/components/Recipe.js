import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Spinner from './Spinner';
import {
  fetchRecipe,
  isLoadingRecipe,
  addToShoppingList,
  changeServings,
  likeRecipe,
  fetchUser,
} from '../actions';
import LikeButton from './LikeButton';
import useWindowSize from '../utils/useWindowSize';
// import User from "./RenderProp/User";
import Button from './styles/Button';
// import ErrorMessage from "./styles/ErrorMessage";
import { Heading2, ErrorText } from './styles/text';

const RecipeContainerStyles = styled.div`
  grid-area: recipe;
  background-color: ${(props) => props.theme.recipeBackgroundColor};
`;

const ALikeButton = styled(Button).attrs({
  as: 'a',
})`
  text-decoration: none;
  span {
    margin-right: 0.5rem;
  }
`;

const ButtonTiny = styled(Button)`
  /* color: green; */
  /* height: 4rem; */
  min-width: 4rem !important;
  border: none;
  background: none;
  cursor: pointer;
  /* ??? */
  padding: 1rem;
  transform: scale(0.7);
  transition: all 0.4s;
  justify-content: center;
  font-size: 3rem !important;
  :hover {
    /* visibility: visible;
    opacity: 1; */
    transform: scale(0.9);
  }
  i {
    /* height: inherit; */
    display: flex;
    justify-content: center;
    min-width: inherit;
    font-size: 3rem !important;
  }
`;

const RecipeFigStyles = styled.figure`
  height: 30rem;
  position: relative;
  transform-origin: top;

  @media only screen and (min-width: 768px) {
    transform: scale(1.07) translateY(-1px);
  }
  :before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.mainGradientFrom},
      ${(props) => props.theme.mainGradientTo}
    );
    opacity: 0.6;
  }
  img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
  }
  h1 {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 20%) skewY(-6deg);
    color: #fff;
    font-weight: 700;
    font-size: 2.75rem;
    text-transform: uppercase;
    width: 70%;
    line-height: 1.95;
    text-align: center;
    span {
      box-decoration-break: clone;
      padding: 1.3rem 2rem;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.mainGradientFrom},
        ${(props) => props.theme.mainGradientTo}
      );
    }
  }
`;

const RecipeDetailsStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0rem 1rem 0rem;
  margin: 0 auto;
  div {
    font-size: 1.5rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    padding: 1rem;
    /* :not(:last-child) {
      margin-right: 2rem;
    } */

    i {
      /* height: 2rem; */
      width: 2rem;
      color: #f59a83;
      margin: 0 auto;
      /* margin-right: 0.5rem; */
      font-size: 1.8rem;
      text-align: center;
    }
    div.tiny-buttons {
      margin: 0 1rem;
      display: flex;
      justify-content: space-around;
    }
    .recipe__info-data {
      margin-right: 0.4rem;
      font-weight: 600;
    }
  }

  @media only screen and (min-width: 768px) {
    padding: 8rem 3rem 3rem 3rem;
  }
`;

const IngredientsStyles = styled.div`
  padding: 4rem 5rem;
  font-size: 1.5rem;
  line-height: 1.4;
  background-color: #f2efee;
  display: flex;
  flex-direction: column;
  align-items: center;
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1.5rem;
    grid-row-gap: 2.5rem;
    list-style: none;
    margin-bottom: 3rem;
    li {
      display: flex;
      i {
        font-size: 2rem;
        margin-right: 0.5rem;
        color: ${(props) => props.theme.themeColor};
      }
      div.recipe__count {
        margin-right: 0.5rem;
        flex: 0 0 auto;
      }
    }
  }
  button {
    i {
      margin-right: 0.5rem;
    }
  }
`;

const DirectionsStyles = styled.div`
  padding: 4rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2efee;
  p.directions-text {
    font-size: 1.5rem;
    text-align: center;
    width: 90%;
    margin-bottom: 3rem;
    color: #968b87;
    span {
      font-weight: 700;
    }
  }
`;

const Recipe = ({
  isLoading,
  user,
  // userError,
  fetchRecipe,
  recipeId, // prop that comes from HomePage
  error,
  recipe,
  addToShoppingList,
  changeServings,
  likeRecipe,
  ...props
}) => {
  const [newServings, setNewServings] = useState(recipe.servings);

  useEffect(() => {
    isLoadingRecipe();
    fetchUser();
    if (!recipeId) {
      fetchRecipe(null, true);
    } else {
      fetchRecipe(recipeId);
    }
    // console.log(newServings)
    // setRecipe(recipe);
    // setRecipe(recipe);
    // console.log(recipe)
  }, [recipeId, fetchRecipe]);

  useEffect(() => {
    setNewServings(recipe.servings);
  }, [recipe]);

  const size = useWindowSize();
  const isLiked =
    user && user
      ? user.recipesLiked.some((item) => {
          if (recipeId) {
            return item.recipeId === recipeId;
          }
          return item.recipeId === recipe.recipeId;
        })
      : false;

  // return (

  /* <User>
      {(user, error) => {
        if (error)
          return (
            <ErrorMessage>
              <p>{error}</p>
            </ErrorMessage>
          ); */

  return (
    <RecipeContainerStyles id={size < 768 ? recipeId : ''}>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <DirectionsStyles>
          <ErrorText>{error}</ErrorText>
        </DirectionsStyles>
      ) : (
        /* : userError ? (
        <ErrorMessage>
          <p>{userError}</p>
        </ErrorMessage>
      ) */
        recipe && (
          <>
            <RecipeFigStyles>
              <img src={recipe.image} alt={recipe.title} />
              <h1>
                <span>{recipe.title}</span>
              </h1>
            </RecipeFigStyles>
            <RecipeDetailsStyles>
              <div>
                <i className="fas fa-stopwatch"></i>
                <span className="recipe__info-data">
                  {recipe.readyInMinutes}
                </span>
                <span> minutes</span>
              </div>
              <div>
                <i className="fas fa-male"></i>
                <span className="recipe__info-data">{recipe.servings}</span>
                <span> servings</span>

                <div className="tiny-buttons">
                  <ButtonTiny
                    onClick={async () =>
                      changeServings(recipe.servings, 1, recipe.ingredients)
                    }
                  >
                    <i className="fas fa-plus-circle"></i>
                  </ButtonTiny>
                  <ButtonTiny
                    onClick={() => {
                      if (newServings >= 2) {
                        changeServings(recipe.servings, -1, recipe.ingredients);
                      }
                    }}
                  >
                    <i className="fas fa-minus-circle"></i>
                  </ButtonTiny>
                </div>
              </div>
              {user && (
                <LikeButton
                  recipe={recipe}
                  recipeId={recipe.recipeId}
                  isLiked={isLiked}
                />
              )}
            </RecipeDetailsStyles>

            <IngredientsStyles>
              <ul>
                {recipe &&
                  recipe.ingredients &&
                  recipe.ingredients.map(
                    ({ amount, name, unit, original }, index) => (
                      <li key={index}>
                        <i className="far fa-check-circle"></i>
                        <div className="recipe__count">{amount}</div>
                        <div>
                          <span>{unit} </span>
                          {name}
                        </div>
                      </li>
                    )
                  )}
              </ul>

              {recipe && recipe.ingredients && (
                <Button onClick={() => addToShoppingList(recipe.ingredients)}>
                  <i className="fas fa-shopping-cart"></i>
                  <span>Add to shopping list</span>
                </Button>
              )}
            </IngredientsStyles>

            <DirectionsStyles>
              <Heading2>How to cook it</Heading2>
              <p className="directions-text">
                This recipe was carefully designed and tested by{' '}
                <span className="recipe__by">{recipe.sourceName}</span>. Please
                check out directions at their website.
              </p>
              <ALikeButton href={recipe.sourceUrl} target="_blank">
                <span>Directions</span>
                <i className="fas fa-arrow-alt-circle-right"></i>
              </ALikeButton>
            </DirectionsStyles>
          </>
        )
      )}
    </RecipeContainerStyles>
    //     );
    //   }}
    // </User>
  );
};

const mapStateToProps = ({ recipes }) => {
  return {
    recipe: recipes.recipe,
    isLoading: recipes.isLoadingRecipe,
    error: recipes.recipeError,
  };
};

export default connect(mapStateToProps, {
  fetchRecipe,
  isLoadingRecipe,
  addToShoppingList,
  changeServings,
  likeRecipe,
})(Recipe);
