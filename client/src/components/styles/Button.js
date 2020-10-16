import styled from "styled-components";

const Button = styled.button`
  /* height: 35%; */
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.mainGradientFrom},
    ${(props) => props.theme.mainGradientTo}
  );
  border-radius: 10rem;
  border: none;
  text-transform: uppercase;
  color: #fff;
  outline: none;
  /* adjust SEARCH button for min screen
   */
  min-width: 14rem; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.6rem;
  font-size: 1.3rem;
  transition: all 0.2s;
  height: 4rem;
  /* text-align: center; */
  :hover {
    transform: scale(1.05);
  }
  :focus {
    outline: none;
  }
  span {
    padding: 0 0.5rem;
  }
`;

export const LinkButton = styled(Button)`
  a {
    text-decoration: none;
    color: inherit;
    font-family: inherit;
    text-align: center;
  }
`;

export default Button;
