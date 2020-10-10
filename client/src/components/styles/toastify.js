//this file has not been used because with newer toastify version this styling approach did not work

import { css } from "glamor";
import theme from "./theme";
export const toastOptions = {
  position: "top-center",
  autoClose: 150000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  className: css({
    backgroundImage: `linear-gradient(
        to right bottom,
        ${theme.mainGradientFrom},
        ${theme.mainGradientTo}
      )`,
    color: `white!important`,
    fontSize: "1.5rem",
    fontWeight: "800",
    height: "50px!important",
    borderRadius: "5px!important",
    opacity: 0.9,
  }),
};

export const errorToastStyle = {
  ...toastOptions,
  className: css({
    background: "rgba(255,229,229, 0.9)!important",
    color: "red!important",
    fontWeight: "bold",
    borderRadius: "5px!important",
  }),
};
