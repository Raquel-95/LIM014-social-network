/** @format */

export const getTasks = () => firebase.firestore().collection("post").get();

export const getTask = (id) => firebase.firestore().collection("post").doc(id).get();

export const deleteTasks = (id) => firebase.firestore().collection("post").doc(id).delete();

export const updateTask = (id, updatedTask) => firebase.firestore().collection("post").doc(id).update({'description': updatedTask});

export const publishPost = (content) => firebase.firestore().collection('post').doc().set({ 'description': content })
