export default () => {
  const viewLogin = `
  <h2 class="text-center">¡Bienvenido a nuestra página!</h2>
  <figure class="text-center">
    <img class="logo" src="img\\logo.png" alt="logo">
    <img class="fb" src="img\\facebook.png" alt="facebook">
    <img class="google" src="img\\google.png" alt="google">
  </figure>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewLogin;
  return divElemt;
};
