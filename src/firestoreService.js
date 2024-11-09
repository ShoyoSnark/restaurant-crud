// src/firestoreService.js
import { db } from "./firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

// Crear nuevo restaurante con timestamp
const addRestaurant = async (data) => {
  await addDoc(collection(db, "restaurants"), {
    ...data,
    createdAt: serverTimestamp(), // Timestamp en el momento de la creación
  });
};

// Actualizar restaurante
const updateRestaurant = async (id, data) => {
  const restaurantRef = doc(db, "restaurants", id);
  await updateDoc(restaurantRef, data);
};

// Eliminar restaurante
const deleteRestaurant = async (id) => {
  const restaurantRef = doc(db, "restaurants", id);
  await deleteDoc(restaurantRef);
};

export { addRestaurant, updateRestaurant, deleteRestaurant };
