/** @format */
import { createUserAccount } from '../firebase/auth.js';
import { loginUserEvent } from '../firebase/firebase-controller.js';

export default () => {
  const viewRegistro = /*html*/ `
  <section id='Registro'>
    <section class='pantalla1'>
    <section class='logotipo'><img src='img/logo.png' ></section>
    </section>
  <section class='form' id='form-register'>
    <h2 class='styleH2'>¡Se parte de esta comunidad!</h2></br></br>
    <input type='text' placeholder='Nombre' id='displayName' class='input-register'></br>
    <input type='text' placeholder='Correo electrónico' id='usuarioSignUp' class='input-register'></br>
    <input type='text' placeholder='Contraseña' id='contraseñaSignUp' class='input-register'></br></br>
    <button type='submit' id='buttonSignUp'>Registrate</button></br></br>
    <section id='errorMessage'></section></br>
    <section class='iniciaSesion'><p>¿Ya tienes una cuenta?</p><a href='#/'>Inicia Sesión</a></section>
  </section>
  </section>`;

  const divElem = document.createElement('div');
  divElem.innerHTML = '';
  divElem.innerHTML = viewRegistro;

  const buttonSignUp = divElem.querySelector('#buttonSignUp');
  buttonSignUp.addEventListener('click', () => {
    const userNameSignUp = divElem.querySelector('#displayName').value;
    const usuarioSignUp = divElem.querySelector('#usuarioSignUp').value;
    const passwordSignUp = divElem.querySelector('#contraseñaSignUp').value;

    createUserAccount(usuarioSignUp, passwordSignUp)
      .then((userCredential) =>
        userCredential.user.updateProfile({
          displayName: userNameSignUp,
          photoURL: 'img/user.png',
        })
      )
      .then(() => {
        loginUserEvent(usuarioSignUp, passwordSignUp);
        return 5;
      })
      .catch((error) => {
        const errorContainer = divElem.querySelector('#errorMessage');
        const templateError = `<section class ='modal-error'><p>Hubo un problema:${error}</p></section>`;
        errorContainer.innerHTML = templateError;
      });
  });
  return divElem;
};
