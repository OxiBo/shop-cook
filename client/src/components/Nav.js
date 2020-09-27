import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import ButtonRound from "./styles/ButtonRound";
import User from "./RenderProp/User";
import { fetchUser } from "../actions";

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

const NavStyles = styled.nav`
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
const Nav = () => {
  //   console.log(user);
  // TODO - fetchUser when component mounts???

  return (
    <User>
      {(user) => (
        <NavStyles>
          <ul>
            {" "}
            {user ? (
              <>
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
                  <a href="/api/logout">
                    <RoundSpan>
                      <i class="fas fa-sign-out-alt"></i>
                    </RoundSpan>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link>Login with G</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In/Up</Link>
                </li>
              </>
            )}
          </ul>
        </NavStyles>
      )}
    </User>
  );
};
// const mapStateToProps = ({ auth }) => {
//   return {
//     user: auth.user,
//   };
// };

// export default connect(mapStateToProps, { fetchUser })(Nav);
export default Nav;
