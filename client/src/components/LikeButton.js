import React from "react";
import { connect } from "react-redux";
import ButtonRound from "./styles/ButtonRound";
import { likeRecipe } from "../actions";
const LikeButton = ({ isLiked, recipe, recipeId, likeRecipe }) => {
  return (
    <ButtonRound
      onClick={() => {
        const { title, image, sourceName, sourceUrl } = recipe;
        likeRecipe({
          recipeId,
          title,
          image,
          sourceName,
          sourceUrl,
        });
      }}
    >
      {isLiked ? (
        <i className="fas fa-heart"></i>
      ) : (
        <i className="far fa-heart"></i>
      )}
    </ButtonRound>
  );
};

export default connect(null, {
  likeRecipe,
})(LikeButton);
