/** @format */
import { getPosts, getPost, deletePosts, updatePost, publishPost, likesPost } from '../lib/feedservice.js';

import { getCurrentUser } from '../firebase/auth.js';

export default () => {
  const viewFeed = /*html*/ `

  <div class='container p-4'>
  
  <div class='perfil-feed'>
    <div id='imgPf'>
      <img id='imageProfile' src='img/user.png'/>
    </div>
    <!-- profile -->
    <div class='hide' id='modalProfile'>
      <div class='modal'>
        <h2>Profile</h2>
        <div class='updateData'>
          <input type='text' placeholder='Update name' name='name' id='nameUser' />
          <input type='file' id='fotoUser' class='hide'/>
          <label for='fotoUser' id='selector' class='labelUpdatePhoto'> 
          </label>
          <div id='preview'></div>
        </div>
        <button id='updateButton'>Update</button>
        <span id='modalClose' class='modalClose'>x</span>
      </div>
    </div>
  </div>

  <div class='row'>

    <div class='col-md-6'>
      <div class='card'>
        <div class='card-body'>

        </br></br><h1 class='h4'>¡Publica algo sobre tus rutas!</h1></br></br>

          <form id='post-form'>
            
            <div class='form-group'>
              <textarea id='post-description' rows='3' class='form-control' placeholder='¿En qué estas pensando?'></textarea>
            </div>
            <input type='text' id='id-post' value=''>
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
  const modalProfile = divElemt.querySelector('#modalProfile');
  const imageProfile = divElemt.querySelector('#imageProfile');
  const fotoUser = divElemt.querySelector('#fotoUser');
  const output = divElemt.querySelector('#selector');
  const preview = divElemt.querySelector('#preview');
  //const updateButton = divElemt.querySelector('#updateButton');

  const loaderUpdate = (e) => {
    const file = e.target.files;
    const show = `<span class='fileSelected'>Selected file: </span> ${file[0].name}`;
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
    const show = `<span class='material-icons'>add_photo_alternate</span>
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

  // Desactiva el boton de publicar cuando esta vacio y se activa al presionar una tecla.
  postForm['post-description'].addEventListener('keyup', (event) => {
    let buttonPublicar = document.querySelector('#btn-post-form');
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
      });
    } else {
      // para una publicacion existente
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

    getPosts().then((list) => {
      list.forEach((doc) => {
        const post = doc.data();
        post.id = doc.id;
        let nameImgLike = post.likes.indexOf(idUser) !== -1 ? 'like' : 'no-like';
        
        // Para que los botones de eliminar y editar esten solo en mis publicaciones y el like para todos.
        if (idUser !== doc.data().idUser) {
          postContainer.innerHTML += `<div class='card-body-primary'>
            ${doc.data().description}
              <div class='buttons'>
              <img src='./img/${nameImgLike}.png' class='like' data-id='${post.id}'></img>
              ${doc.data().likes.length}
              </div>
            </div>`;
        } else {
          postContainer.innerHTML += `<div class='card-body-primary'>
            ${doc.data().description}
              <div class='buttons'>
              <button class='btn btn-delete' data-id='${post.id}'>Eliminar</button>
              <button class='btn btn-edit' data-id='${post.id}'>Editar</button>
              <img src='./img/${nameImgLike}.png' class='like' data-id='${post.id}'></img>
              ${doc.data().likes.length}
              </div>
            </div>`;

          const buttonDelete = document.querySelectorAll('.btn-delete');
          buttonDelete.forEach((btn) => {
            btn.addEventListener('click', (e) => {
              var askConfirmation = confirm('De verdad quieres eliminarlo?');
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
          likes.forEach((like) => {
            like.addEventListener('click', (e) => {

              const idPost = e.target.dataset.id;

              getPost(idPost).then((actualPost) => {
                let likes = actualPost.data().likes; // trae los likes de esa publicacion
                const result = likes.indexOf(idUser);
                if (result === -1) { // -1 no existes en la lista de likes.
                  likes.push(idUser); // si no existe lo agrega.
                } else {
                  likes.splice(result, 1); // si existe, elimina el like, elimina una posicion en la lista.
                }
                likesPost(idPost, likes).then(() => {// actualizar la lista de firebase
                  listPost(divElemt);
                }); 
              });
            });
          })
           
          });
        })
      .catch((error) => {
        console.log('Falló algo', error);
      });
  }

  return divElemt;
};

// Agregar imagen a las publicaciones
