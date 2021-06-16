/** @format */
import { getPosts, getPost, deletePosts, updatePost, publishPost } from '../lib/feedservice.js';

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
            <button class='btn btn-primary' id='btn-post-form' disabled>
              Publicar
            </button>

          </form>
        </div>
      </div>
    </div>
    <!-- posts List -->
    <div class='col-md-6' id='posts-container'></div>
  </div>
</div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;

  let idUser = '';

  firebase.auth().onAuthStateChanged(function (user) { // onAuthStateChanged es un evento asincrono.
    idUser = user.uid;
  });
  
  const postForm = divElemt.querySelector('#post-form');

  listPost(divElemt);

  // const textPost = divElemt.querySelector('#post-description');

  postForm['post-description'].addEventListener('keyup', (event) => {
    let buttonPublicar = document.querySelector("#btn-post-form");
    if (event.target.value === '') {
      buttonPublicar.disabled = true;
    } else {
      buttonPublicar.disabled = false;
    }
  });


  postForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar que se refresque la pagina
    const description = postForm['post-description'].value;
    const idPost = postForm['id-post'].value;

    if (idPost === '') {
      publishPost(idUser, description).then(() => {
        listPost(divElemt);
      })
    } else {
      updatePost(idPost, description).then(() => {
        postForm['id-post'].value = '';
        postForm['btn-post-form'].innerHTML = 'Publicar';
        listPost(divElemt);
      });
    }
    postForm['btn-post-form'].disabled = true;
    postForm.reset(); // vuelve al formulario a sus valores por defecto.
  });


  function listPost(divElemt) {
    // console.log("listPost");
    const postForm = divElemt.querySelector('#post-form');
    const postContainer = divElemt.querySelector('#posts-container');
    postContainer.innerHTML = '';

    getPosts()
      .then((list) => {
        list.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;

          console.log("uuid " + idUser + " " + doc.data().idUser)
          if (idUser !== doc.data().idUser) {
            postContainer.innerHTML += `<div class='card-body-primary'>
            ${doc.data().description}`
            return;
          }

          postContainer.innerHTML += `<div class='card-body-primary'>
            ${doc.data().description}
              <div class='buttons'>
              <button class='btn btn-delete' data-id='${post.id}'>Eliminar</button>
              <button class='btn btn-edit' data-id='${post.id}'>Editar</button>
              </div>
            </div>`;

          const buttonDelete = document.querySelectorAll('.btn-delete');
          buttonDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              var askConfirmation = confirm("De verdad quieres eliminarlo?");
              if (askConfirmation) {
                deletePosts(e.target.dataset.id).then(() => {
                  listPost(divElemt);
                });
              }

              console.log('click');
            });
          });
          const buttonEdit = document.querySelectorAll('.btn-edit');
          buttonEdit.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              getPost(e.target.dataset.id).then((k) => {
                listPost(divElemt);
                postForm['post-description'].value = k.data().description;
                postForm['id-post'].value = e.target.dataset.id;
                postForm['btn-post-form'].innerHTML = 'guardar';
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

// Agregar imagen a las publicaciones
