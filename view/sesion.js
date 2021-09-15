/** @format */
import {
  loginUserEvent,
  loginGoogleEvent,
} from '../firebase/firebase-controller.js';

export default () => {
  const viewSesion = /*html*/ `
  <section id='main_screen'>
    <section id='inicio-sesion'>
      <section class='pantalla1'>
        <section class='logotipo'><img src='img/logo.png' ></section>
      </section>
    </section>
    <section class='form'>
      <h2>¡Bienvenido!</h2></br></br></br>
        <input type='text' placeholder='correo electrónico' id='usuarioSignIn' class='input_form'></br>
        <input type='password' placeholder='contraseña' id='contraseñaSignIn' class='input_form'></br>
        <button type='submit' id='buttonSignIn'><b>Iniciar sesión</b></button></br>
      <section id='errorMessage'></section>
      <p class='textoSignIn'>Iniciar sesión con Google</p></br>
      <img src='img/google.png' id='signGoogle'></br></br>
      <section class='registrate'><p>¿No tienes una cuenta?</p><a href='#/registro'>Regístrate</a></section>
    </section>
  </section>`;
  const divElem = document.createElement('div');
  divElem.innerHTML = viewSesion;

  const buttonSignIn = divElem.querySelector('#buttonSignIn');
  const errorContainer = divElem.querySelector('#errorMessage');
  const buttonGoogle = divElem.querySelector('#signGoogle');

  buttonSignIn.addEventListener('click', () => {
    const usuarioSignIn = divElem.querySelector('#usuarioSignIn').value;
    const passwordSignIn = divElem.querySelector('#contraseñaSignIn').value;
    loginUserEvent(usuarioSignIn, passwordSignIn, errorContainer);
  });
  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginGoogleEvent();
  });

  return divElem;
};
