/** @format */

import { loginUser, loginGoogle, logOut } from './auth.js';

export const loginUserEvent = (user, password, errorContainer) => {
  loginUser(user, password)
    .then(() => {
      window.location.assign('#/feed');
    })
    .catch((error) => {
      const templateError = `<div class ="modal-error"><p>Hubo un problema:${error.message}</p></div>`;
      errorContainer.innerHTML = templateError;
    });
};

export const loginGoogleEvent = () => {
  loginGoogle()
    .then(() => {
      window.location.hash = '#/feed';
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logOutEvent = () => {
  logOut().then(() => {
    window.location.assign('#/');
    console.log('¡Se cerro!');
  });
};
