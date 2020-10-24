import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchRecipes, isLoadingRecipes, fetchSearchTerm } from "../actions";
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
    setPage(1);
  }, [searchTerm, fetchSearchTerm]);

  const [offset, setOffset] = useState(0);

  // reason why useEffect calls are needed here https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
  useEffect(() => {
    setOffset(page * recipesPerPage - recipesPerPage);
  }, [page, setOffset]);

  // to skip call on initial render - https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render/55409573
  useEffect(() => {
    searchRecipes(searchTerm, recipesPerPage, offset);
  }, [offset, searchTerm, searchRecipes]);

  const handleClick = (e, n) => {
    e.preventDefault();
    setPage(page + n);
  };
  return (
    <PaginationStyles>
      {/* https://stackoverflow.com/questions/52801051/react-site-warning-the-href-attribute-requires-a-valid-address-provide-a-valid */}
      <a
        href={`?page=${page}&${offset}`}
        onClick={(e) => handleClick(e, -1)}
        aria-disabled={page <= 1}
      >
        ← Prev
      </a>
      <p>
        {page} of {pages || 1}
      </p>

      <a
        href={`/?page=${page}&${offset}`}
        onClick={(e) => handleClick(e, 1)}
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
