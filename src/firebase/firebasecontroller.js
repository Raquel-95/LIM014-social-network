/** @format */

import { loginUser, loginGoogle } from "../firebase/auth.js";

export const loginUserEvent = (user, password, errorContainer) => {
  loginUser(user, password)
    .then(() => {
      window.location.assign("#/feed");
    })
    .catch((error) => {
      const templateError = `<div class ="modal-error"><p>Hubo un problema:${error.message}</p></div>`;
      errorContainer.innerHTML = templateError;
    });
};

export const loginGoogleEvent = () => {
  loginGoogle()
    .then(() => {
      window.location.hash = "#/feed";
    })
    .catch((error) => {
      console.log(error);
    });
};
