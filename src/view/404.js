/** @format */

export default () => {
  const viewSession = /*html*/ `
  <h2 class='text-center'>¡Pagina no encontrada!</h2>
  <p>No se encuebtra la url</p>`;
  const divElem = document.createElement('div');
  divElem.innerHTML = viewSession;
  return divElem;
};
