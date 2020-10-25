import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { recipesPerPage } from "../utils/utilVars";
import PaginationStyles from "./styles/PaginationStyles";

const PaginationTest = ({ totalPages, searchTerm, pageChange, ...props }) => {
  const [page, setPage] = useState(2);
  
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);


  const handleClick = (e, n) => {
    e.preventDefault();
    setPage(page + n);
    pageChange(page + n);
  };

  return (
    <>
      <PaginationStyles>
        <a
          href={`/?page=${page}`}
          onClick={(e) => handleClick(e, -1)}
          aria-disabled={page <= 1}
        >
          ← Prev
        </a>
        <p>
          {page} of {totalPages || 1}
        </p>

        <a
          href={`/?page=${page}`}
          onClick={(e) => handleClick(e, 1)}
          aria-disabled={page >= totalPages}
        >
          Next →
        </a>
      </PaginationStyles>
    </>
  );
};

const mapStateToProps = ({ recipes }) => {
  return {
    totalPages: Math.ceil(recipes.recipes.totalResults / recipesPerPage),
    searchTerm: recipes.searchTerm,
  };
};

export default connect(mapStateToProps)(PaginationTest);
