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

// const userPosted = firebase.auth().currentUser;

// if (userPosted !== null) {
//   user.providerData.forEach((profile) => {
//     console.log("Sign-in provider: " + profile.providerId);
//     console.log("  Provider-specific UID: " + profile.uid);
//     console.log("  Name: " + profile.displayName);
//     console.log("  Email: " + profile.email);
//     console.log("  Photo URL: " + profile.photoURL);
//   });
// }
