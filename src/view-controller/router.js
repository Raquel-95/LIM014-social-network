import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/login': { return container.appendChild(components.login()); }
    case '#/feed': { return container.appendChild(components.feed()); }
    default: { return container.appendChild(components.different()); }
  }
};

export { changeView };
