import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SearchStyles from "./styles/SearchStyles";
import Button from "./styles/Button";
import { searchRecipes, isLoadingRecipes, saveSearchTerm } from "../actions";
import { recipesPerPage } from "../utils/utilVars";

const SearchSpan = styled.span`
  display: ${(props) => (props.hide ? "none" : "inline")};
  @media only screen and (min-width: 768px) {
    display: inline;
  }
`;

const SearchRecipesForm = ({
  searchRecipes,
  isLoadingRecipes,
  saveSearchTerm,
  ...props
}) => {
  const [searchValue, setInput] = useState("");
  // https://reactrouter.com/web/api/Hooks/usehistory
  const history = useHistory();

  return (
    <div>
      <SearchStyles
        data-test="recipes-search-form"
        onSubmit={(e) => {
          e.preventDefault();
          isLoadingRecipes();
          saveSearchTerm(searchValue);
          searchRecipes(searchValue, recipesPerPage);
          setInput("");
          history.push("/");
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
          <i className="fas fa-search"></i>{" "}
          <SearchSpan hide={true}> Search</SearchSpan>
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

export default connect(null, {
  searchRecipes,
  isLoadingRecipes,
  saveSearchTerm,
})(SearchRecipesForm);
