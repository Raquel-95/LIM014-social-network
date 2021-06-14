/** @format */
import { logOutEvent } from '../firebase/firebasecontroller.js';

export default () => {
  const viewFeed = `
  <div id='main-feed'>
    <img id='imageProfile' src='img/user.png'/>
    <img class='logo-feed' src='img/logo.png' alt="logo">
    <button type='submit' id='buttonLogOut'>Cerrar sesión</button>
  </div>`;

const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;

  // cerrar sesion
  const buttonLogOut = divElemt.querySelector('#buttonLogOut');
  buttonLogOut.addEventListener('click', logOutEvent);

  return divElemt;
}