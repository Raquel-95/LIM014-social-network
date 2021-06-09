/** @format */
import { logOutEvent } from '../firebase/firebasecontroller.js';
import { getTasks, getTask, deleteTasks } from '../lib/feedservice.js';
// export default () => {
//   const contenidoFeed = `
//   <div id="Pantalla">
//   <div id="cabecera">
//   <img id="imageProfile" src='images/user.png'/>
//        <button type="submit" id="buttonLogout">Cerrar sesión</button>
//  </div>
//   <div class="prepost">
//    <input type="text" placeholder="¿Que conoceremos hoy?" id="postUser">
//    <button type="submit" id="sendPost">Publicar</button>
//    </div>
//   <div id="tabla"></div>
//   </div>`;

//   const divElem = document.createElement("div");
//   divElem.innerHTML = contenidoFeed;

//   return divElem;
// };

export default () => {
  const viewFeed = `
  <div id="cabecera">
    <img id="imageProfile" src='images/user.png'/>
    <button type="submit" id="buttonLogOut">Cerrar sesión</button>
  </div>
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
</div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;

  // cerrar sesion
  const buttonLogOut = divElemt.querySelector('#buttonLogOut');
  buttonLogOut.addEventListener('click', logOutEvent);

  const taskForm = divElemt.querySelector('#task-form');

  const editStatus = false;

  async function listPost(divElemt, taskForm) {
    const taskConteiner = divElemt.querySelector('#tasks-container');
    taskConteiner.innerHTML = '';

    getTasks()
      .then((list) => {
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
              console.log('click');
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
      })
      .catch((error) => {
        console.log('Falló algo', error);
      });
  }
  listPost(divElemt, taskForm);

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar que se refresque la pagina
    const description = taskForm['task-description'].value;

    if (!editStatus) {
      taskForm['btn-task-form'].innerText = 'Guardar';
    } else {
      console.log('cambio de boton', description);
    }

    firebase
      .firestore()
      .collection('task')
      .doc()
      .set({
        description,
      })
      .then(() => {
        listPost(divElemt, taskForm);
      })
      .catch((p) => {
        console.log('error', p);
      });
    taskForm.reset();
  });
  return divElemt;
};
