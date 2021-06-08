import {
  getTask,
  getTasks,
  deleteTasks,
  updateTask,
} from '../lib/feedservice.js';

const db = firebase.firestore();

export default () => {
  const viewFeed = `
  <figure>
    <img class="logo-feed" src="img\\logo.png" alt="logo">
  <figure>

  <div class="container p-4">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">

          <h1 class="h4">¡Publica algo sobre tus rutas!</h1>

          <form id="task-form">
            
            <div class="form-group">
              <textarea id="task-description" rows="3" class="form-control" placeholder="¿En qué estas pensando?"></textarea>
            </div>

            <button class="btn btn-primary" id="btn-task-form">
              Publicar
            </button>

          </form>
        </div>
      </div>
    </div>
    <!-- Tasks List -->
    <div class="col-md-6" id="tasks-container"></div>
  </div>
</div>
     `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;

  const taskForm = divElemt.querySelector('#task-form');

  const editStatus = false;

  listPost(divElemt, taskForm);

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar que se refresque la pagina
    const description = taskForm['task-description'].value;

    if (!editStatus) {
      const descriptionEdit = description;
    } else {
      taskForm['btn-task-form'].innerText = 'Guardar';
    }

    db.collection('task').doc().set({
      description,
    }).then(() => {
      listPost(divElemt, taskForm);
    })
      .catch((p) => {
        console.log('error', p);
      });
    taskForm.reset();
  });

  return divElemt;
};

async function listPost(divElemt, taskForm) {
  const taskConteiner = divElemt.querySelector('#tasks-container');
  taskConteiner.innerHTML = '';

  getTasks().then((list) => {
    list.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id;
      taskConteiner.innerHTML += `<div class="card-body-primary">
      ${doc.data().description}
      <div class="buttons">
        <button class="btn btn-delete" data-id="${task.id}">Eliminar</button>
        <button class="btn btn-edit" data-id="${task.id}">Editar</button>
      </div>
    </div>`;

      const buttonDelete = document.querySelectorAll('.btn-delete');
      buttonDelete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          deleteTasks(e.target.dataset.id);
          listPost(divElemt, taskForm);
        });
      });
      const buttonEdit = document.querySelectorAll('.btn-edit');
      buttonEdit.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          getTask(e.target.dataset.id).then((k) => {
            listPost(divElemt, taskForm);
            taskForm['task-description'].value = k.data().description;
          });
        });
      });
    });
  }).catch((error) => {
    console.log('Falló algo', error);
  });
}
