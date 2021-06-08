// Este es el punto de entrada de tu aplicacion
import { changeView } from './view-controller/router.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash)); // evento 'hashchange' para cambiar la url y usamos hash para que nos traiga despues del #
};

window.addEventListener('load', init); // cada vez que escuches una recarga, ejecutar la función init.
