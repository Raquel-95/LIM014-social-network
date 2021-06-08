export default () => {
  const viewFeed = `
    <h2 class="text-center">Muro</h2>
    <figure>
      <img src="" alt="">
      <img src="" alt="">
    </figure>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;
  return divElemt;
};
