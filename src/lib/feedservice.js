/** @format */

//const db = firebase.firestore();

export const getTasks = () => db.collection("task").get();

export const getTask = (id) => db.collection("task").doc(id).get();

export const deleteTasks = (id) => db.collection("task").doc(id).delete();

export const updateTask = (id, updatedTask) =>
  db.collection("task").doc(id).update(updatedTask);
