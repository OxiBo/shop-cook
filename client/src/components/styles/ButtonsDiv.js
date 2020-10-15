import styled from "styled-components";

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 50%; */
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  button {
    flex: 1 80%;
    margin: 0.5rem;
  }
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    /* width: 50%; */
    align-items: center;
    justify-content: center;
    button {
      flex: 1 33%;
      margin: 1rem;
      min-height: 6rem;
    }
  }
`;

export default ButtonsDiv;
