import styled from "styled-components";


const Container = styled.div`
  background-color: ${(props) => props.theme.mainContainerColor};
  max-width: 100rem;
  /* width: fit-content; */
  margin: 3vw auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: 0 2rem 6rem 0.5rem rgba(101, 90, 86, 0.2);
  border-radius: 5px;

  @media only screen and (max-width: 68.75em) {
    margin: 0 auto;
  }
`;

export default Container
