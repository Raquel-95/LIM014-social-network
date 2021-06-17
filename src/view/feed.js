/** @format */
import {
  getTasks,
  getTask,
  deleteTasks,
  updateTask,
  publishPost,
} from '../lib/feedservice.js';
import { getCurrentUser } from '../firebase/auth.js';

export default () => {
  const viewFeed = /*html*/ `

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
    <div id="imgPf">
      <img id="imageProfile" src='img/user.png'/>
    </div>
    <div class="hide" id="modalProfile">
      <div class="modal">
        <h2>Profile</h2>
        <div class="updateData">
          <input type="text" placeholder="Update name" name="name" id="nameUser" />
          <input type="file" id="fotoUser" class="hide" />
          <label for="fotoUser" id="selector" class="labelUpdatePhoto"> 
          </label>
          <div id="preview"></div>
        </div>
        <button id="updateButton">Update</button>
        <span id="modalClose" class="modalClose">x</span>
      </div>
    </div>
</div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;

  const postForm = divElemt.querySelector('#post-form');
  const modalProfile = divElemt.querySelector('#modalProfile');
  const imageProfile = divElemt.querySelector('#imageProfile');
  const fotoUser = divElemt.querySelector('#fotoUser');
  const output = divElemt.querySelector('#selector');
  const preview = divElemt.querySelector('#preview');
  //const updateButton = divElemt.querySelector('#updateButton');

  const loaderUpdate = (e) => {
    const file = e.target.files;
    const show = `<span class="fileSelected">Selected file: </span> ${file[0].name}`;
    output.innerHTML = show;

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      const image = document.createElement('img');
      image.src = reader.result;

      preview.innerHTML = '';
      preview.append(image);
    };
  };

  fotoUser.addEventListener('change', loaderUpdate);

  imageProfile.addEventListener('click', () => {
    divElemt.querySelector('#nameUser').value = getCurrentUser().displayName;
    modalProfile.classList.add('display');
    modalProfile.classList.add('modalProfile');
    modalProfile.classList.remove('hide');
    const show = `<span class="material-icons">add_photo_alternate</span>
    Choose a photo`;
    output.innerHTML = show;
    const img = document.createElement('img');
    img.src = getCurrentUser().photoURL;
    if (preview.childNodes[0]) {
      preview.replaceChild(img, preview.childNodes[0]);
    } else {
      preview.append(img);
    }
  });

  // -------------------------------------------------
  listPost(divElemt);

  postForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar que se refresque la pagina
    const description = postForm['post-description'].value;
    const idPost = postForm['id-post'].value;

    if (idPost === '') {
      publishPost(description).then(() => {
        listPost(divElemt);
      });
    } else {
      updateTask(idPost, description).then(() => {
        postForm['id-post'].value = '';
        postForm['btn-task-form'].innerHTML = 'Publicar';
        listPost(divElemt);
      });
    }

    postForm.reset();
  });

  function listPost(divElemt) {
    console.log('listPost');
    const postForm = divElemt.querySelector('#post-form');
    const taskConteiner = divElemt.querySelector('#tasks-container');
    taskConteiner.innerHTML = '';

    getTasks()
      .then((list) => {
        list.forEach((doc) => {
          const task = doc.data();
          task.id = doc.id;
          taskConteiner.innerHTML += /*html*/ `<div class='card-body-primary'>
          ${doc.data().description}
            <div class='buttons'>
              <button class='btn btn-delete' data-id='${
                task.id
              }'>Eliminar</button>
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
};
