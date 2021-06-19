/** @format */

import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#/': {
      return container.appendChild(components.sesion());
    }
    case '#/registro': {
      return container.appendChild(components.registro());
    }
    case '#/feed': {
      container.appendChild(components.header());
      return container.appendChild(components.feed());
    }
    default:
      return container.appendChild(components.different());
  }
};

export { changeView };
