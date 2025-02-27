/** @format */
import { logOutEvent } from '../firebase/firebase-controller.js';

export default () => {
  const viewFeed = /*html*/ `
  <header id='main-feed'>
    <img class='logo-feed' src='img/logo_2.png' alt='logo'>
    <button type='submit' id='buttonLogOut'>Cerrar sesión</button>
  </header> `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;

  

  // cerrar sesion
  const buttonLogOut = divElemt.querySelector('#buttonLogOut');
  buttonLogOut.addEventListener('click', logOutEvent);

  return divElemt;
};
