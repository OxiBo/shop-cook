import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchRecipesForm from "./SearchRecipesForm";
import ButtonRound from "./styles/ButtonRound";

const RoundSpan = styled(ButtonRound).attrs({
  as: "span",
})`
  display: inline-flex;
  margin: 0.2rem;
  margin-left: 0;
  /* width: 3rem; */
  /* height: 3rem; */
  i {
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
  }
  :hover {
    transform: none;
  }
`;

const Nav = styled.nav`
  ul {
    text-decoration: none;
    display: flex;
    height: 4rem;
    /* flex-wrap: wrap; */
    li {
      /* width: 12rem; */
      min-width: 6rem;
      padding: 0.5rem;
      font-size: 1.3rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      text-transform: uppercase;
      justify-content: center;
      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

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
      <Nav>
        <ul>
          {" "}
          <li>
            <Link to="/recipes">
              My{" "}
              <RoundSpan>
                <i className="far fa-heart"></i>
              </RoundSpan>
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/lists">
              My{" "}
              <RoundSpan>
                <i className="fas fa-shopping-cart"></i>
              </RoundSpan>
              Lists
            </Link>
          </li>
          <li>
            <a href="/api/logout">Logout</a>
          </li>
          {/* <li><Link>Login with G</Link></li>*/}
          <li>
            <Link to="/signin">Sign In/Up</Link>
          </li>
        </ul>
      </Nav>
    </HeaderStyles>
  );
};

export default Header;
