/** @format */

export const addPost = () =>
  firebase
    .firestore()
    .collection('post')
    .add({
      timePost: new Date().toLocaleString('UMT-0500'),
      likes: [],
    });

export const getPosts = () => firebase.firestore().collection('post').get();

export const getPost = (id) =>
  firebase.firestore().collection('post').doc(id).get();

export const deletePosts = (id) =>
  firebase.firestore().collection('post').doc(id).delete();

export const updatePost = (id, updatedpost) =>
  firebase
    .firestore()
    .collection('post')
    .doc(id)
    .update({ description: updatedpost });

export const publishPost = (idUser, content) =>
  firebase
    .firestore()
    .collection('post')
    .doc()
    .set({ idUser: idUser, description: content });

export const likesPost = (id, likes) =>
  firebase.firestore().collection('post').doc(id).update({ likes });

export const updateImage = (imgUpload, nameUser) => {
  const storageRef = firebase.storage().ref();
  const uploadResult = storageRef
    .child(`images/${imgUpload.name}`)
    .put(imgUpload);
  const downloadUrl = uploadResult.ref.getDownloadURL();
  firebase.auth().currentUser.updateProfile({
    photoURL: downloadUrl,
    displayName: nameUser,
  });
};
