import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./styles/theme";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* font-size: 15px; */

}
*, *:before, *:after{
  box-sizing: inherit;
}
html{
  font-size: 60%;
  @media only screen and (max-width: 68.75em) {
    html {
      font-size: 50%; } }
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

const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          {this.props.children}
        </Container>
      </ThemeProvider>
    );
  }
}
export default App;
