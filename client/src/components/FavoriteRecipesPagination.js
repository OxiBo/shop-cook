// custom hook example - https://gist.github.com/chaddjohnson/9e91b8e50043989583ab49e4b2096950

import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchFavRecipes, isLoadingRecipes } from "../actions";
import PaginationStyles from "./styles/PaginationStyles";
import { favRecipesPerPage } from "../utils/utilVars";

const FavoriteRecipesPagination = ({ fetchFavRecipes, pages }) => {
  const [page, setPage] = useState(1);

  // reason why useEffect calls are needed here https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately

  // to skip call on initial render (it did not work for me) - https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render/55409573

  const handleClick = (e, n) => {
    e.preventDefault();
    // setPage(page => page + n);
    setTimeout(function delay() {
      setPage(page => page + n);
    }, 1000);
    console.log(page);
    // fetchFavRecipes((page + n) * favRecipesPerPage - favRecipesPerPage);
  };

  return (
    <PaginationStyles>
      {/* https://stackoverflow.com/questions/52801051/react-site-warning-the-href-attribute-requires-a-valid-address-provide-a-valid */}
      <a
        href={`/recipes/page=${page}`}
        onClick={async (e) => handleClick(e, -1)}
        aria-disabled={page <= 1}
      >
        ← Prev
      </a>
      <p>
        {page} of {pages}
      </p>

      <a
        href={`/recipes/page=${page}`}
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
