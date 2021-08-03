/** @format */
// importamos la funcion que vamos a testear

import {
  createUserAccount,
  loginUser,
  loginGoogle,
  logOut,
} from '../src/firebase/auth.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();

mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  () => null,
  () => mockauth
);

// global.firebase = mocksdk;

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
