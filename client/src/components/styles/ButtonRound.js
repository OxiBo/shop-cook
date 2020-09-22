import styled from "styled-components";

const ButtonRound = styled.button`
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.mainGradientFrom},
    ${(props) => props.theme.mainGradientTo}
  );
  border-radius: 50%;
  border: none;
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  margin-left: auto;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    transform: scale(1.07);
  }
  :focus {
    outline: none;
  }
  i {
    font-size: 2.1rem;
    color: white;
    /* height: 2.5rem;
  width: 2.5rem; */
    fill: #fff;
  }
`;

export default  ButtonRound