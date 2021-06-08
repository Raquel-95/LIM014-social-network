/** @format */

// aqui exportaras las funciones que necesites

export const firebaseInit = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBCnQxYROWcew2i8r5BSP4NLn-CBI4-lcU",
    authDomain: "ruta-rixsiy.firebaseapp.com",
    databaseURL: "https://ruta-rixsiy-default-rtdb.firebaseio.com",
    projectId: "ruta-rixsiy",
    storageBucket: "ruta-rixsiy.appspot.com",
    messagingSenderId: "214042096683",
    appId: "1:214042096683:web:150c7115fb1eb6ca01e66e",
    measurementId: "G-4C8JL478YZ",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
};
