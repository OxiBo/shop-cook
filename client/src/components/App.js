import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./styles/theme";
import Header from "./Header";
import Container from "./styles/Container";
const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* font-family: "Arial"; */

}
*, *:before, *:after{
  box-sizing: inherit;
}
html{
  font-size: 50%;
  @media only screen and (min-width: 68.75em) {
    html {
      font-size: 60%; } }
}
body {
  box-sizing: border-box;
  background-image: linear-gradient(to right bottom, ${(props) =>
    props.theme.mainGradientFrom}, ${(props) => props.theme.mainGradientTo});
    background-size: cover;
    background-repeat: no-repeat;
  /* font-size: 12px; */
  min-height: calc(100vh - 2 * 4vw);
}`;

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 120rem;
`;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  height: 6rem;
  background-color: ${(props) => props.theme.headerColor};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  border-radius: 5px;
  font-weight: 700;
`;
const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Container>
          <Header />
          <GlobalStyle />
          <Content>{props.children}</Content>
          <Footer>written and coded by OxiBo, 2020</Footer>
        </Container>
      </AppContainer>
    </ThemeProvider>
  );
};
export default App;
