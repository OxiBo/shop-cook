import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  searchRecipes,
  isLoadingRecipes,
  fetchSearchTerm,
} from "../../actions";
import PaginationStyles from "../styles/PaginationStyles";
import { recipesPerPage } from "../../utils/utilVars";

const Pagination = ({
  totalResults,
  fetchSearchTerm,
  searchTerm,
  searchRecipes,
  pages,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSearchTerm();
    setPage(1)
  }, [searchTerm, fetchSearchTerm]);

  const getPage = (n) => {
    setPage(page + n);
  };
  // console.log(totalResults)
  // console.log(totalResults/recipesPerPage)
  //   const pages = Math.ceil(totalResults / recipesPerPage);
  const offsetBack = page * recipesPerPage + recipesPerPage;
//   const offsetForward = page * recipesPerPage - recipesPerPage;
  return (
    <PaginationStyles>
      <a
        onClick={() => {
          getPage(-1);
          searchRecipes(searchTerm, recipesPerPage, offsetBack);
        }}
        aria-disabled={page <= 1}
      >
        ← Prev
      </a>
      <p>
        {page} of {pages || 1}
      </p>

      <a
        onClick={() => {
          getPage(1);
          searchRecipes(searchTerm, recipesPerPage, offsetBack);
        }}
        aria-disabled={page >= pages}
      >
        Next →
      </a>
    </PaginationStyles>
  );
};

const mapStateToProps = ({ recipes }) => {
  return {
    searchTerm: recipes.searchTerm,
    totalResults: recipes.recipes.totalResults,
    pages: Math.ceil(recipes.recipes.totalResults / recipesPerPage),
  };
};
export default connect(mapStateToProps, {
  searchRecipes,
  isLoadingRecipes,
  fetchSearchTerm,
})(Pagination);
