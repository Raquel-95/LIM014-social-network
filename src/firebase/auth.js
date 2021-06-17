/** @format */
// Para crear una nueva cuenta
export const createUserAccount = (usuarioSignUp, passwordSignUp) =>
  firebase.auth().createUserWithEmailAndPassword(usuarioSignUp, passwordSignUp);

// Permite que un usuario acceda
export const loginUser = (usuarioSignIn, passwordSignIn) =>
  firebase.auth().signInWithEmailAndPassword(usuarioSignIn, passwordSignIn);

// Google Login
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
// para cerrar sesion
export const logOut = () => firebase.auth().signOut();

//Administrar usuarios

let currentUser = {};

export const getCurrentUser = () => currentUser;

export const findAuth = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = user;
    }
  });
};
