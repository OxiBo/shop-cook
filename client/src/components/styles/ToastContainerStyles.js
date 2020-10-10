// https://fkhadra.github.io/react-toastify/how-to-style/

import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import theme from "./theme";

const ToastContainerStyles = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  font-size: 1.5rem;
  font-weight: 800;
  height: 50px !important;
  border-radius: 5px !important;
  opacity: 0.9;
  .toast {
    background-image: linear-gradient(
      to right bottom,
      ${theme.mainGradientFrom},
      ${theme.mainGradientTo}
    );
    color: white !important;
  }
`;

export default ToastContainerStyles;
