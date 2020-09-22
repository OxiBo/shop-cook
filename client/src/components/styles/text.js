import styled from "styled-components";

export const Heading2 = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #f59a83;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  text-align: center;
  transform: skewY(-3deg);
`;

export const ErrorText = styled.p`
  /* color: ${(props) => props.theme.themeColor}; */
  font-size: 1.5rem;
  /* font-style: italic; */
  background-color: #fff;
  padding: 2rem;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  border-left:  3px solid ${(props) => props.theme.themeColor};
`;
