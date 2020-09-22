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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.1rem 2rem;
  font-size: ${(props) => props.theme.fontSize};
  transition: all 0.2s;
  /* text-align: center; */
  :hover {
    transform: scale(1.05);
  }
  :focus {
    outline: none;
  }
  span{
    padding: 0 0.5rem;

  }
`;

export default Button;
