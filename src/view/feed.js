/** @format */
import { getTasks, getTask, deleteTasks, updateTask, publishPost } from '../lib/feedservice.js';

export default () => {
  const viewFeed = `

  <div class='container p-4'>
  <div class='row'>
    
    <div class='col-md-6'>
      <div class='card'>
        <div class='card-body'>

        </br></br><h1 class='h4'>¡Publica algo sobre tus rutas!</h1></br></br>

          <form id='post-form'>
            
            <div class='form-group'>
              <textarea id='post-description' rows='3' class='form-control' placeholder='¿En qué estas pensando?'></textarea>
            </div>
            <input type="text" id="id-post" value="">
            <button class='btn btn-primary' id='btn-task-form'>
              Publicar
            </button>

          </form>
        </div>
      </div>
    </div>
    <!-- Tasks List -->
    <div class='col-md-6' id='tasks-container'></div>
  </div>
</div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;

  const postForm = divElemt.querySelector('#post-form');

  listPost(divElemt);

  postForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar que se refresque la pagina
    const description = postForm['post-description'].value;
    const idPost = postForm['id-post'].value;

    if (idPost === '') {
      publishPost(description).then(()=>{
        listPost(divElemt);
      })
    } else {
      updateTask(idPost, description).then(()=>{
        postForm['id-post'].value = '';
        postForm['btn-task-form'].innerHTML = 'Publicar';
        listPost(divElemt);
      });
    }
  
    postForm.reset();
  });


  function listPost(divElemt) {
    console.log("listPost");
    const postForm = divElemt.querySelector('#post-form');
    const taskConteiner = divElemt.querySelector('#tasks-container');
    taskConteiner.innerHTML = '';

    getTasks()
      .then((list) => {
        list.forEach((doc) => {
          const task = doc.data();
          task.id = doc.id;
          taskConteiner.innerHTML += `<div class='card-body-primary'>
      ${doc.data().description}
      <div class='buttons'>
        <button class='btn btn-delete' data-id='${task.id}'>Eliminar</button>
        <button class='btn btn-edit' data-id='${task.id}'>Editar</button>
      </div>
    </div>`;

          const buttonDelete = document.querySelectorAll('.btn-delete');
          buttonDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              deleteTasks(e.target.dataset.id);
              listPost(divElemt);
              console.log('click');
            });
          });
          const buttonEdit = document.querySelectorAll('.btn-edit');
          buttonEdit.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              getTask(e.target.dataset.id).then((k) => {
                listPost(divElemt);
                postForm['post-description'].value = k.data().description;
                postForm['id-post'].value = e.target.dataset.id;
                postForm['btn-task-form'].innerHTML = 'guardar';
              });
            });
          });
        });
      })
      .catch((error) => {
        console.log('Falló algo', error);
      });
  }

return divElemt;
}