import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchRecipesForm from "./SearchRecipesForm";
import ButtonRound from "./styles/ButtonRound";
import Nav from './Nav'



const HeaderStyles = styled.header`
  height: 9rem;
  background-color: ${(props) => props.theme.headerColor};
  display: flex;
  justify-content: center;
  align-items: center;
  .brand {
    :visited {
      color: inherit;
    }
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    margin-left: 1rem;
    font-family: Brush Script MT, Brush Script Std, cursive, Bradley Hand,
      cursive, Stencil Std, fantasy, Optima, sans-serif;
    font-size: 3rem;

    img {
      width: 4rem;
    }
  }
  .search {
    flex: 1;
    margin: 0 auto;
    text-align: center;
  }
  .nav {
    margin-right: 0;
  }
`;
const ButtonRoundMedium = styled(ButtonRound)`
  width: 5rem;
  height: 5rem;
`;

const Header = () => {
  return (
    <HeaderStyles>
      <div>
        <Link to="/" className="brand">
          <ButtonRoundMedium>
            {" "}
            <img src="icon.png" alt="brand_icon" />
          </ButtonRoundMedium>
          Cook&Shop
        </Link>
      </div>
      <SearchRecipesForm />
     <Nav />
    </HeaderStyles>
  );
};

export default Header;
