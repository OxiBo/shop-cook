import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchFavRecipes } from "../actions";
// import User from "./RenderProp/User";
import { Heading2, ErrorText } from "./styles/text";
import Spinner from "./Spinner";
import Button from "./styles/Button";

const Container = styled.div`
  background-color: #f2efee;
  width: 90%;
  margin: 0 auto;
  /* padding: 2rem; */

  h2 {
    /* transform: translate(-50%, 20%) skewY(-6deg); */
    color: #fff;
    font-weight: 700;
    font-size: 2.75rem;
    text-transform: uppercase;
    width: 70%;
    margin: 2rem auto;
    line-height: 1.95;
    text-align: center;
    box-decoration-break: clone;
    padding: 1.3rem 2rem;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.mainGradientFrom},
      ${(props) => props.theme.mainGradientTo}
    );
  }
  ul {
    list-style: none;
    margin: 2rem 0;
    width: 100%;
    li {
      display: flex;
      :nth-child(odd) {
        background-color: #f9f5f3;
      }
      div.recipeImage {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1rem;
        /* 1rem 2rem */
        img {
          width: 100px;
          border-radius: 2px;
        }
      }
      div.details {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        h5 {
          /* flex: 1; */
          width: 100%;
          font-size: 1.5rem;
          color: #f59a83;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 0.3rem;
          filter: brightness(80%);
          padding: 1rem;
          text-align: center;
        }
        a {
          text-decoration: none;
        }
        a:visited {
          color: inherit;
        }
        p {
          font-size: 1.5rem;
          padding: 1rem;
          color: #968b87;
          span {
            font-weight: 700;
          }
        }
      }
    }
  }
  @media only screen and (min-width: 520px) {
    /* background-color: red; */
    ul {
      li {
        div.details {
          /* background-color: green; */
          flex-wrap: nowrap;
          h5{
            width: auto;
            margin: 0;
          }
        }
        div.recipeImage {
          margin: 1rem 2rem;
        }
      }
    }
  }
`;

const DirectionsButton = styled(Button).attrs({
  as: "a",
})`
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  margin-left: auto;
  margin-right: 2rem;
  font-size: 1.2rem;
  :visited {
    color: #fff !important;
  }
  span {
    margin-right: 0.5rem;
  }
`;

const FavoriteRecipes = ({ fetchFavRecipes, favRecipes, isLoading, error }) => {
  useEffect(() => {
    fetchFavRecipes();
  }, [fetchFavRecipes]);
  return (
    <Container>
      <Heading2>
        My <i className="fas fa-heart"></i> Recipes
      </Heading2>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <ul>
          {favRecipes.map(
            ({ recipeId, title, image, sourceName, sourceUrl }) => (
              <li key={recipeId}>
                <div className="recipeImage ">
                  {" "}
                  <img src={image} alt={title} />
                </div>
                <div className="details">
                  <h5>
                    {" "}
                    <a href={`/#${recipeId}`}>{title}</a>
                  </h5>
                  <p>
                    by <span>{sourceName}</span>
                  </p>

                  <DirectionsButton href={sourceUrl} target="_blank">
                    <span>Directions</span>
                    <i className="fas fa-arrow-alt-circle-right"></i>
                  </DirectionsButton>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </Container>
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
