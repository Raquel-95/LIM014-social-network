/** @format */

export const getTasks = () => firebase.firestore().collection("task").get();

export const getTask = (id) =>
  firebase.firestore().collection("task").doc(id).get();

export const deleteTasks = (id) =>
  firebase.firestore().collection("task").doc(id).delete();

export const updateTask = (id, updatedTask) =>
  firebase.firestore().collection("task").doc(id).update(updatedTask);
