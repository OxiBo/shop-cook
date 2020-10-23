import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { fetchFavRecipes, isLoadingRecipes } from "../actions";
import PaginationStyles from "./styles/PaginationStyles";
import { favRecipesPerPage } from "../utils/utilVars";

const FavoriteRecipesPagination = ({ fetchFavRecipes, pages }) => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  // reason why useEffect calls are needed here https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
  useEffect(() => {
    setOffset(page * favRecipesPerPage - favRecipesPerPage);
  }, [page, setOffset]);

  // to skip call on initial render - https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render/55409573
  // useEffect(() => {
  //   fetchFavRecipes(offset);
  //   // return () => {
  //   //   // do something with dependency
  //   //   fetchFavRecipes(offset);
  //   // };
  // }, [offset, fetchFavRecipes]);

  useEffect(() => {
    fetchFavRecipes(offset);
  }, [offset, fetchFavRecipes]);

  const handleClick = (e, n) => {
    e.preventDefault();
    setPage(page + n);
    console.log(offset);
    // fetchFavRecipes(offset);
  };

  return (
    <PaginationStyles>
      {/* https://stackoverflow.com/questions/52801051/react-site-warning-the-href-attribute-requires-a-valid-address-provide-a-valid */}
      <a
        href={`/recipes/page=${page}&${offset}`}
        onClick={async (e) => handleClick(e, -1)}
        aria-disabled={page <= 1}
      >
        ← Prev
      </a>
      <p>
        {page} of {pages}
      </p>

      <a
        href={`/recipes/page=${page}&${offset}`}
        onClick={async (e) => handleClick(e, 1)}
        aria-disabled={page >= pages}
      >
        Next →
      </a>
    </PaginationStyles>
  );
};

const mapStateToProps = ({ recipes }) => {
  return {
    pages: Math.ceil(recipes.totalFavRecipes / favRecipesPerPage),
  };
};
export default connect(mapStateToProps, {
  fetchFavRecipes,
  isLoadingRecipes,
})(FavoriteRecipesPagination);