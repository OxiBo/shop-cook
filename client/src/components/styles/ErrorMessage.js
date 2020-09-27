import styled from "styled-components";

const ErrorMessage = styled.div`
  margin: 4rem;
  p {
    margin: 0 auto;
    border-left: 4px solid ${(props) => props.theme.themeColor};
    padding: 2rem;
    font-size: 2rem;
    font-style: italic;
    color: ${(props) => props.theme.themeColor};
  }
`;

export default ErrorMessage;
