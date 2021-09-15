/** @format */

export default () => {
  const viewSession = /*html*/ `
  <section id="pag_404">
  <h2 class='text-center'>¡Pagina no encontrada!</h2>
  <p>No se encuebtra la url</p>
  </section>`;
  const divElem = document.createElement('div');
  divElem.innerHTML = viewSession;
  return divElem;
};
