/** @format */
import { createUserAccount } from "../firebase/auth.js";
import { loginUserEvent } from "../firebase/firebasecontroller.js";

export default () => {
  const viewRegistro = `
  <div id="Registro">
    <div class="pantalla1">
    <div class="logotipo"><img src="img/logo.png" ></div>
    </div>
  </div>
  <div class="form">
    <h2 class="styleH2">¡Se parte de esta comunidad!</h2>
    <input type="text" placeholder="Nombre" id="displayName">
    <input type="text" placeholder="Correo electrónico" id="usuarioSignUp">
    <input type="text" placeholder="Contraseña" id="contraseñaSignUp">
    <button type="submit" id="buttonSignUp">Registrate</button>
    <div id="errorMessage"></div>
    <div class="iniciaSesion"><p>¿Ya tienes una cuenta?</p><a href="#/">Inicia Sesión</a></div>
  </div>`;

  const divElem = document.createElement("div");
  divElem.innerHTML = viewRegistro;

  const buttonSignUp = divElem.querySelector("#buttonSignUp");
  buttonSignUp.addEventListener("click", () => {
    const userNameSignUp = divElem.querySelector("#displayName").value;
    const usuarioSignUp = divElem.querySelector("#usuarioSignUp").value;
    const passwordSignUp = divElem.querySelector("#contraseñaSignUp").value;

    createUserAccount(usuarioSignUp, passwordSignUp)
      .then((userCredential) =>
        userCredential.user.updateProfile({
          displayName: userNameSignUp,
          photoURL: "images/user.png",
        })
      )
      .then(() => {
        loginUserEvent(usuarioSignUp, passwordSignUp);
      })
      .catch((error) => {
        const errorContainer = divElem.querySelector("#errorMessage");
        const templateError = `<div class ="modal-error"><p>Hubo un problema:${error}</p></div>`;
        errorContainer.innerHTML = templateError;
      });
  });
  return divElem;
};