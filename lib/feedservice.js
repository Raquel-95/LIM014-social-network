/** @format */

export const getPosts = () => firebase.firestore().collection('post').orderBy('timePost', 'desc').get();

export const getPost = (id) => firebase.firestore().collection('post').doc(id).get();

export const deletePosts = (id) => firebase.firestore().collection('post').doc(id).delete();

export const updatePost = (id, updatedpost, photo) => firebase.firestore().collection('post').doc(id).update({'description': updatedpost, 'photo':photo});

export const publishPost = (idUser, content, photo) => firebase.firestore().collection('post').doc().set(
    { 'idUser': idUser, 'description': content, 'photo': photo, 'timePost': new Date().toLocaleString('GMT-0500'), 'likes': []});

export const likesPost = (id, likes) => firebase.firestore().collection('post').doc(id).update({ 'likes' :likes });

// export const orderPostbyTimeDesc = (callback, idUser) => firebase.firestore().collection('post').doc(idUser).orderBy('timePost', 'desc')
// export const updateImage = (imgUpload, nameUser) => {
//   const storageRef = firebase.storage().ref();
//   const uploadResult = storageRef
//     .child(`images/${imgUpload.name}`)
//     .put(imgUpload);
//   const downloadUrl = uploadResult.ref.getDownloadURL();
//   firebase.auth().currentUser.updateProfile({
//     photoURL: downloadUrl,
//     displayName: nameUser,
//   });
// };
