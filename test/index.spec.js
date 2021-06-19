/** @format */

// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

// importamos la funcion que vamos a testear

import firebasemock from 'firebase-mock';
import {
  createUserAccount,
  loginUser,
  loginGoogle,
  logOut,
} from '../src/firebase/auth';


// MOCK MANUAL DE PUBLICACIONES

import MockFirebase from '../__mocks__/firebase-mock.js';

//para poder utilizarlo aquí, ejecutamos
global.firebase = MockFirebase(); // todas las declaraciones que digan firebase van a ser reemplazadas por el mock creado.

import { createUserAccount, loginUser, loginGoogle, logOut } from '../src/firebase/auth.js';


const mockauth = new firebasemock.MockAuthentication();
mockauth.autoFlush();
const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use AUTHENTICATION
  () => mockauth
);
global.firebase = mocksdk;
describe('createUserAccount', () => {
  it('debería ser una función', () => {
    expect(typeof createUserAccount).toBe('function');
  });
  it('deberia poder crear un usario', () => {
    createUserAccount('email@gmail.com', '123123').then((user) => {
      expect(user.email).toBe('email@gmail.com');
    });
  });
  it('deberia poder crear una contraseña', () => {
    createUserAccount('email@gmail.com', '123123').then((user) => {
      expect(user.password).toBe('123123');
    });
  });
});

describe('loginUser', () => {
  it('debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
  it('usuario debe ingresar', () => {
    loginUser('email@gmail.com', '123123').then((user) => {
      expect(user.email).toBe('email@gmail.com');
    });
  });
  it('debe ingresar con constraseña', () => {
    createUserAccount('email@gmail.com', '123123').then((user) => {
      expect(user.password).toBe('123123');
    });
  });
});

describe('loginGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  it('usuario debe ingresar con cuenta google', () => {
    loginGoogle().then((user) => {
      expect(user.email).toBe('email@gmail.com');
    });
  });
});

describe('logOut', () => {
  it('debería ser una función', () => {
    expect(typeof logOut).toBe('function');
  });
  it('deberia cerrar sesion', () => {
    logOut().then((user) => {
      expect(user).toBe(null);
    });
  });
});
