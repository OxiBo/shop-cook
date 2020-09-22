import styled from "styled-components";

const SearchStyles = styled.form`
  flex: 1;
  height: 4rem;
  background-color: #fff;
  border-radius: 10rem;
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  transition: all 0.3s;
  focus-within {
    transform: translateY(-2px);
    box-shadow: 0 0.7rem 3rem rgba(101, 90, 86, 0.08);
  }
  input.search__field {
    border: none;
    background: none;
    font-family: inherit;
    color: inherit;
    font-size: ${(props) => props.theme.fontSize};
    width: 20rem;
  }
  input.search__field:focus {
    outline: none;
  }
  input.search__field::placeholder {
    color: #dad0cc;
  }
`;
export default SearchStyles;
