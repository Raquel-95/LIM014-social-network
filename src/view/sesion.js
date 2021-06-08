/** @format */
import {
  loginUserEvent,
  loginGoogleEvent,
} from "../firebase/firebasecontroller.js";

export default () => {
  const viewSesion = `
  <div id="inicio-sesion">
  <div class="pantalla1">
  <div class="logotipo"><img src="img/logo.png" ></div>
  </div>
  </div>
  <div class="form">
  <h2>¡Bienvenido!</h2>
  <input type="text" placeholder="correo electrónico" id="usuarioSignIn">
  <input type="password" placeholder="contraseña" id="contraseñaSignIn">
  <button type="submit" id="buttonSignIn">Iniciar sesión</button>
  <div id="errorMessage"></div>
  <p class="textoSignIn">Iniciar sesión con Google</p>
  <div class="google"><img src="img/google.png" id="signGoogle">
  </div>
  <div class="registrate"><p>¿No tienes una cuenta?</p><a href="#/registro">Regístrate</a></div>
  </div>`;
  const divElem = document.createElement("div");
  divElem.innerHTML = viewSesion;

  const buttonSignIn = divElem.querySelector("#buttonSignIn");
  const errorContainer = divElem.querySelector("#errorMessage");
  const buttonGoogle = divElem.querySelector("#signGoogle");

  buttonSignIn.addEventListener("click", () => {
    const usuarioSignIn = divElem.querySelector("#usuarioSignIn").value;
    const passwordSignIn = divElem.querySelector("#contraseñaSignIn").value;
    loginUserEvent(usuarioSignIn, passwordSignIn, errorContainer);
    console.log("aqui");
  });
  buttonGoogle.addEventListener("click", (e) => {
    e.preventDefault();
    loginGoogleEvent();
  });

  return divElem;
};
