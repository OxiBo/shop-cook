import styled from "styled-components";

const PaginationStyles = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* max-width: 80%; */
  margin: 0.2rem  0.2rem;
  /* display: grid; */
  /* grid-template-columns: repeat(4, auto); */
  /* align-items: stretch; */
  /* justify-content: center; */
  /* align-content: center; */
  /* margin: 1rem auto;
  max-width: 80%;
  border: 1px solid lightgrey;
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid lightgrey;
    &:last-child {
      border-right: 0;
    }
  } */
  a,
  a:visited {
    text-decoration: none;
    color: ${(props) => props.theme.themeColor};
    font-size: 1.2rem;
    border: none;
    margin: 1rem;
    background-color: ${(props) => props.theme.headerColor};
    padding: 0.8rem 1.2rem;
    border-radius: 10rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s;
  }
  a:hover {
    color: #f48982;
    background-color: #f2efee;
  }

  a[aria-disabled="true"] {
    color: grey;
    pointer-events: none;
  }
  @media only screen and (max-width: 768px) {
    max-width: 95%;
    & > * {
      margin: 0;
      padding: 10px 15px;
    }
  }
`;

export default PaginationStyles;
