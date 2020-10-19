import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  searchRecipes,
  isLoadingRecipes,
  fetchSearchTerm,
} from "../actions";
import PaginationStyles from "./styles/PaginationStyles";
import { recipesPerPage } from "../utils/utilVars";

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

  const offset = page * recipesPerPage + recipesPerPage;
//   const offsetForward = page * recipesPerPage - recipesPerPage;
  return (
    <PaginationStyles>
      {/* https://stackoverflow.com/questions/52801051/react-site-warning-the-href-attribute-requires-a-valid-address-provide-a-valid */}
      <a href="/#"
        onClick={() => {
          getPage(-1);
          searchRecipes(searchTerm, recipesPerPage, offset);
        }}
        aria-disabled={page <= 1}
      >
        ← Prev
      </a>
      <p>
        {page} of {pages || 1}
      </p>

      <a href="/#"
        onClick={() => {
          getPage(1);
          searchRecipes(searchTerm, recipesPerPage, offset);
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
