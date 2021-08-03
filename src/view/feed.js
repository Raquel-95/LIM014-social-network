/** @format */
import {
  getPosts,
  getPost,
  deletePosts,
  updatePost,
  publishPost,
  //likesPost,
  updateImage,
} from '../lib/feedservice.js';
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
            <img id='image_to_post'>
            <input type='text' id='id-post' value=''>
                <div class="image-upload">
                    <label for="file-input">
                        <img src="/img/icon-photo.png" id="icon-photo"/>
                    </label>
                    <input id="file-input" type="file"/>
                </div>
           
            <button class='btn btn-primary' id='btn-post-form' disabled>
              Publicar
            </button>
          </form>
        </div>
      </div>
      <!-- Tasks List -->
      <div class='col-md-6' id='tasks-container'></div>
    </div>
    <!-- profile -->
    <!-- posts List -->
    <div class='col-md-6' id='posts-container'>
      
    </div>
  </div>
</div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewFeed;

  let idUser = '';

  firebase.auth().onAuthStateChanged(function (user) {
    // onAuthStateChanged es un evento asincrono.
    idUser = user.uid;
  });

  const postForm = divElemt.querySelector('#post-form');
  const modalProfile = divElemt.querySelector('#modalProfile');
  const imageProfile = divElemt.querySelector('#imageProfile');
  const fotoUser = divElemt.querySelector('#fotoUser');
  const output = divElemt.querySelector('#selector');
  const preview = divElemt.querySelector('#preview');
  const uploadImg = divElemt.querySelector('#icon-photo');
  const uploadButton = divElemt.querySelector('#file-input');
  const photoPreview = divElemt.querySelector('#image_to_post');
  // const updateButton = divElemt.querySelector('#updateButton');

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

  // updateButton.addEventListener('click', () => {
  //   const imgUpload = fotoUser.files[0];
  //   const nameUser = divElemt.querySelector('#nameUser').value;
  //   updateImage(imgUpload, nameUser);

  //   modalProfile.classList.add('hide');
  //   modalProfile.classList.remove('display');
  //   modalProfile.classList.remove('modalProfile');
  // });

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

  let pathPhoto;

  // Envio del formulario
  postForm.addEventListener('submit', (e) => {
    console.log(pathPhoto);
    e.preventDefault(); // cancelar que se refresque la pagina
    const description = postForm['post-description'].value;
    const idPost = postForm['id-post'].value;

    // para una publicacion nueva
    if (idPost === '') {
      publishPost(idUser, description, pathPhoto).then(() => {
        pathPhoto = '';
        photoPreview.src = '';
        listPost(divElemt);
      });
    } else {
      // para una publicacion existente
      updatePost(idPost, description, pathPhoto).then(() => {
        postForm['id-post'].value = '';
        postForm['btn-post-form'].innerHTML = 'Publicar';
        pathPhoto = '';
        photoPreview.src = '';
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
        const imgPhotoId = "photo_post_" + post.id;
        let imgPhotoHtml = "";

        if(post.photo !== "" && post.photo != null){
          imgPhotoHtml = `<img id="${imgPhotoId}"/>`
        firebase.storage().ref().child(post.photo).getDownloadURL().then(function(url) {
          console.log("downloadurl " + url);
          const img = document.querySelector('#' + imgPhotoId);
          img.src = url;
          
        }).catch(function(error) {
          // Handle any errors
        });
      }
        // Para que los botones de eliminar y editar esten solo en mis publicaciones y el like para todos.
        if (idUser !== doc.data().idUser) {
          postContainer.innerHTML += /*html*/ `<div class='card-body-primary'>
            ${doc.data().description}
            ${imgPhotoHtml}
            <div class='buttons'>
              <img src='./img/${nameImgLike}.png' class='like' data-id='${post.id}'></img>
              ${doc.data().likes.length}
              </div>
            </div>`;
        } else {
          postContainer.innerHTML += /*html*/ `<div class='card-body-primary'>
            ${doc.data().description}
            ${imgPhotoHtml}
              <div class='buttons'>
              <div id='icons-delete-edit'>
                <img src='/img/icon-delete.png' class='btn btn-delete' data-id='${post.id}'/>
                <img src='/img/icon-edit.png' class='btn btn-edit' data-id='${post.id}'/>
              </div>
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

      // Agregar imagen a las publicaciones
      uploadImg.addEventListener('click', (e) => {
        console.log('quiero subir una imagen');
      }
      )

      uploadButton.onchange = function(e){
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const metadata = {
          contentType: 'image/jpeg',
        };
        storageRef
          .child(`imgPost/${file.name}`)
          .put(file, metadata)
          .then((snapshot) => {
            let buttonPublicar = document.querySelector('#btn-post-form');
            buttonPublicar.disabled = false;
            snapshot.ref.getDownloadURL()
            pathPhoto = snapshot.ref.fullPath;

            firebase.storage().ref().child(pathPhoto).getDownloadURL().then(function(url) {
              console.log("downloadurl " + url);
              photoPreview.src = url;
              
            }).catch(function(error) {
              // Handle any errors
            });


            })
          .then((downloadURL) => {
            console.log(downloadURL);
            downloadURL})
          .catch((error) => console.log(error));
      }

  }

  return divElemt;
}