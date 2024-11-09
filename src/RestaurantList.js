import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import RestaurantForm from "./RestaurantForm";
import { addRestaurant, updateRestaurant, deleteRestaurant } from "./firestoreService";
import { Edit2, Trash2 } from "lucide-react";
import Button from "./components/shadcn/Button";
import ConfirmationDialog from "./components/shadcn/ConfirmationDialog"; // Usamos el diálogo de Shadcn

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado del diálogo
  const [restaurantToDelete, setRestaurantToDelete] = useState(null); // Restaurante a eliminar

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "restaurants"), (snapshot) => {
      setRestaurants(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe; // Limpia la suscripción al desmontar el componente
  }, []);

  const handleAddOrUpdate = async (data) => {
    try {
      if (editingRestaurant) {
        await updateRestaurant(editingRestaurant.id, data); // Actualiza si hay restaurante en edición
        setEditingRestaurant(null); // Limpia el modo de edición
      } else {
        await addRestaurant(data); // Agrega un nuevo restaurante
      }
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
  };

  const handleDelete = async () => {
    if (restaurantToDelete) {
      try {
        await deleteRestaurant(restaurantToDelete.id); // Elimina el restaurante
        setRestaurantToDelete(null);
      } catch (error) {
        console.error("Error deleting restaurant:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Gestión de Restaurantes</h1>
      <div className="w-24 h-1 bg-indigo-500 rounded-full mb-6"></div>

      <RestaurantForm
        onSubmit={handleAddOrUpdate}
        restaurantData={editingRestaurant}
        clearEditing={() => setEditingRestaurant(null)}
      />

      <div className="w-full max-w-lg space-y-4">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">{restaurant.name}</h2>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${restaurant.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                {restaurant.active ? "Activo" : "Inactivo"}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Creado: {restaurant.createdAt ? new Date(restaurant.createdAt.seconds * 1000).toLocaleString() : "Fecha no disponible"}
            </p>

            {/* Botones de acción: editar y eliminar */}
            <div className="flex space-x-3 mt-4">
              <Button
                className="flex items-center text-indigo-500 hover:text-indigo-600 font-medium"
                onClick={() => handleEdit(restaurant)}
              >
                <Edit2 className="mr-1" size={16} /> Editar
              </Button>
              <Button
                className="flex items-center text-red-500 hover:text-red-600 font-medium"
                onClick={() => {
                  setRestaurantToDelete(restaurant);
                  setIsDialogOpen(true); // Abre el diálogo de confirmación
                }}
              >
                <Trash2 className="mr-1" size={16} /> Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Diálogo de confirmación para la eliminación */}
      <ConfirmationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onConfirm={handleDelete}
        message={`¿Estás seguro de que deseas eliminar el restaurante "${restaurantToDelete?.name}"?`}
      />
    </div>
  );
}

export default RestaurantList;
