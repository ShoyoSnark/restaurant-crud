// src/RestaurantList.js

// Importaciones necesarias: React y sus hooks, Firestore, iconos, y componentes personalizados
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import RestaurantForm from "./RestaurantForm";
import { addRestaurant, updateRestaurant, deleteRestaurant } from "./firestoreService";
import { Edit2, Trash2 } from "lucide-react"; // Iconos de edición y eliminación

// Componente principal que muestra la lista de restaurantes y el formulario para añadir/editar
function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]); // Estado para almacenar los restaurantes
  const [editingRestaurant, setEditingRestaurant] = useState(null); // Estado para el restaurante en edición

  // useEffect que se ejecuta al montar el componente: escucha cambios en la colección de restaurantes
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "restaurants"), (snapshot) => {
      setRestaurants(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe; // Limpia la suscripción al desmontar el componente
  }, []);

  // Función para añadir o actualizar un restaurante
  const handleAddOrUpdate = async (data) => {
    try {
      if (editingRestaurant) {
        // Modo de edición: actualiza el restaurante
        await updateRestaurant(editingRestaurant.id, data);
        setEditingRestaurant(null); // Limpia el modo de edición
      } else {
        // Modo de creación: añade un nuevo restaurante
        await addRestaurant(data);
      }
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  // Activa el modo de edición para el restaurante seleccionado
  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
  };

  // Función para eliminar un restaurante
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este restaurante?")) {
      try {
        await deleteRestaurant(id);
      } catch (error) {
        console.error("Error deleting restaurant:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Título del componente */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2 shadow-lg">
        Gestión de Restaurantes
      </h1>
      <div className="w-24 h-1 bg-blue-500 rounded-full mb-6"></div>

      {/* Formulario para crear o editar un restaurante */}
      <RestaurantForm
        onSubmit={handleAddOrUpdate}
        restaurantData={editingRestaurant} // Pasa el restaurante en edición si está seleccionado
        clearEditing={() => setEditingRestaurant(null)} // Limpia el estado de edición
      />

      {/* Lista de restaurantes */}
      <div className="w-full max-w-lg space-y-4">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col space-y-2 hover:shadow-xl transition-shadow duration-200"
          >
            {/* Información del restaurante: nombre y estado (Activo/Inactivo) */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">{restaurant.name}</h2>
              <span className={`text-sm font-medium px-2 py-1 rounded-lg ${restaurant.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                {restaurant.active ? "Activo" : "Inactivo"}
              </span>
            </div>

            {/* Fecha de creación del restaurante */}
            <p className="text-xs text-gray-400">
              Creado: {restaurant.createdAt ? new Date(restaurant.createdAt.seconds * 1000).toLocaleString() : "Fecha no disponible"}
            </p>

            {/* Botones de edición y eliminación */}
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(restaurant)}
                className="flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <Edit2 className="mr-1" size={16} /> Editar
              </button>
              <button
                onClick={() => handleDelete(restaurant.id)}
                className="flex items-center text-red-500 hover:text-red-600 font-medium transition-colors duration-200"
              >
                <Trash2 className="mr-1" size={16} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;
