import React, { useState, useRef, useEffect } from "react";
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
    /* width: 2rem; */
    height: 2rem;
    font-size: 2rem;
  }
  :hover {
    transform: none;
  }
`;

const NavStyles = styled.nav`
  margin-left: auto;
  margin-right: 1rem;
  position: relative;
  ul {
    text-decoration: none;
    background-color: ${(props) => props.theme.headerColor};
    display: ${(props) => (props.menuOpen ? "flex" : "none")};
    flex-direction: column;
    /* height: 4rem; */
    width: 350px;
    z-index: 4;
    position: absolute;
    top: 87px;
    right: -10px;
    border-radius: 1px;
    /* flex-wrap: wrap; */
    li.with-google {
        /* https://stackoverflow.com/questions/52578726/fontawesome-5-multi-color-icon */
      i {
        padding-right: 0.5rem;
        font-size: 3rem;
        background: conic-gradient(
            from -45deg,
            #ea4335 110deg,
            #4285f4 90deg 180deg,
            #34a853 180deg 270deg,
            #fbbc05 270deg
          )
          73% 55%/150% 150% no-repeat;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
      }
    }
    li {
      /* width: 12rem; */
      height: 5rem;
      min-width: 6rem;
      padding: 0.5rem;
      font-size: 1.3rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      text-transform: uppercase;
      justify-content: center;
      border-bottom: 1px solid #fff;
      a {
        width: 100%;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        :visited {
          color: inherit;
        }
      }

      :hover {
        background-color: #f2efee;
      }
    }
  }
  @media only screen and (min-width: 768px) {
    .menu-bar {
      display: none;
    }

    ul {
      display: flex;
      flex-direction: row;
      width: auto;
      z-index: 0;

      border-radius: 0;
      position: static;
      li {
        border: none;
      }
    }
  }
`;
const Nav = () => {
  //   console.log(user);
  const [menuOpen, setToggleMenu] = useState(false);
  // TODO - fetchUser when component mounts???

  // catch click outside of ul with navigation links - https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82
  const node = useRef();
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setToggleMenu(false);
  };

  return (
    <User>
      {(user) => (
        <>
          <NavStyles menuOpen={menuOpen} ref={node}>
            <ul onClick={() => setToggleMenu(false)}>
              {" "}
              {user ? (
                <>
                  <li>
                    <Link to="/recipes">
                      <RoundSpan>
                        <i className="fas fa-heart"></i>
                      </RoundSpan>
                      Recipes
                    </Link>
                  </li>
                  <li>
                    <Link to="/lists">
                      <RoundSpan>
                        <i className="fas fa-shopping-cart"></i>
                      </RoundSpan>
                      Lists
                    </Link>
                  </li>
                  <li>
                    <a href="/api/logout">
                      <RoundSpan>
                        <i className="fas fa-sign-out-alt"></i>
                      </RoundSpan>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="with-google">
                    <a href="/auth/google">
                     <i className="fab fa-google"></i> Sign in
                    </a>
                  </li>
                  <li>
                    <Link to="/signin">
                      <RoundSpan>
                        <i className="fas fa-sign-in-alt"></i>
                      </RoundSpan>
                      Sign In/Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="menu-bar">
              {" "}
              <RoundSpan onClick={() => setToggleMenu(!menuOpen)}>
                {!menuOpen ? (
                  <i className="fas fa-bars"></i>
                ) : (
                  <i className="fas fa-times-circle"></i>
                )}
              </RoundSpan>
            </div>
          </NavStyles>
        </>
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

/*



 ul {
    text-decoration: none;
    display: none;
    height: 4rem;
   // flex-wrap: wrap;
    li {
        // width: 12rem; 
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

*/
