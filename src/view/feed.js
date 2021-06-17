/** @format */
import { getPosts, getPost, deletePosts, updatePost, publishPost, likesPost } from '../lib/feedservice.js';

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

  // Desactiva el boton de publicar cuando esta vacio y se activa al presionar una tecla.
  postForm['post-description'].addEventListener('keyup', (event) => {
    let buttonPublicar = document.querySelector("#btn-post-form");
    if (event.target.value === '') {
      buttonPublicar.disabled = true;
    } else {
      buttonPublicar.disabled = false;
    }
  });

  // Envio del formulario
  postForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar que se refresque la pagina
    const description = postForm['post-description'].value;
    const idPost = postForm['id-post'].value;

    // para una publicacion nueva
    if (idPost === '') {
      publishPost(idUser, description).then(() => {
        listPost(divElemt);
      })
    } else { // para una publicacion existente
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
    const postForm = divElemt.querySelector('#post-form');
    const postContainer = divElemt.querySelector('#posts-container');
    postContainer.innerHTML = '';

    getPosts()
      .then((list) => {
        list.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;

      // Para que los botones de eliminar y editar esten solo en mis publicaciones y el like para todos.
          // console.log("uuid " + idUser + " " + doc.data().idUser)
          if (idUser !== doc.data().idUser) {
            postContainer.innerHTML += `<div class='card-body-primary'>
            ${doc.data().description}
              <div class='buttons'>
              <img src='./img/like.png' class='like' data-id='${post.id}'></img>
              </div>
            </div>`;

          }else{
            postContainer.innerHTML += `<div class='card-body-primary'>
            ${doc.data().description}
              <div class='buttons'>
              <button class='btn btn-delete' data-id='${post.id}'>Eliminar</button>
              <button class='btn btn-edit' data-id='${post.id}'>Editar</button>
              <img src='./img/like.png' class='like' data-id='${post.id}'></img>
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
          }

      // Likes 
          const likes = document.querySelectorAll('.like');
          likes.forEach((btn) => {
            btn.addEventListener('click', () => {
              const result = objPost.likes.indexOf(idUser);
              if (result === -1) {
                objPost.likes.push(idUser);
                likePost(objPost.id, objPost.likes);
              } else {
                objPost.likes.splice(result, 1);
                likePost(objPost.id, objPost.likes);
              }
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
