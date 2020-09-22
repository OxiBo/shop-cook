import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SearchStyles from "./styles/SearchStyles";
import Button from "./styles/Button";
import { searchRecipes, isLoadingRecipes } from "../actions";
const SearchBtn = styled.button``;

const SearchRecipesForm = ({ searchRecipes, isLoadingRecipes }) => {
  const [searchValue, setInput] = useState("");
  return (
    <div>
      <SearchStyles
        data-test="recipes-search-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(searchValue);
          isLoadingRecipes();
          searchRecipes(searchValue);
          setInput("");
        }}
      >
        <input
          type="text"
          className="search__field"
          placeholder="Search recipe..."
          value={searchValue}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">
          {" "}
          <i className="fas fa-search"></i> <span> Search</span>
        </Button>
      </SearchStyles>
    </div>
  );
};

// const mapStateToProps = ({ recipes }) => {
//   return {
//     recipes,
//   };
// };

export default connect(null, { searchRecipes, isLoadingRecipes })(
  SearchRecipesForm
);
