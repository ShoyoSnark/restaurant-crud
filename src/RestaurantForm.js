// src/RestaurantForm.js

// Importaciones necesarias: React y hooks, íconos y bibliotecas de UI
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

// Componente que representa el formulario para crear o editar un restaurante
function RestaurantForm({ restaurantData, onSubmit, clearEditing }) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { name: "", active: false }, // Valores predeterminados del formulario
  });
  const [isActive, setIsActive] = useState(false); // Estado local para el checkbox de activo/inactivo

  // Carga los datos del restaurante en el formulario cuando se selecciona uno para editar
  useEffect(() => {
    if (restaurantData) {
      setValue("name", restaurantData.name);
      setIsActive(restaurantData.active || false);
    }
  }, [restaurantData, setValue]);

  // Maneja el envío del formulario
  const onSubmitHandler = (data) => {
    const formData = {
      ...data,
      active: isActive,
    };
    onSubmit(formData); // Llama a la función de creación o actualización
    resetForm(); // Restablece el formulario
  };

  // Restablece el formulario y el modo de edición
  const resetForm = () => {
    reset();
    setIsActive(false);
    clearEditing(); // Llama a la función para salir del modo de edición
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="p-8 bg-white shadow-lg rounded-xl max-w-md mx-auto space-y-6 border border-gray-200"
    >
      {/* Título del formulario */}
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Registrar Restaurante</h2>
      
      {/* Campo de entrada para el nombre del restaurante */}
      <div className="flex flex-col">
        <label className="font-semibold text-gray-700 mb-1">Nombre del Restaurante</label>
        <input
          {...register("name", { required: true })}
          placeholder="Ejemplo: La Buena Mesa"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        />
      </div>

      {/* Checkbox para el estado de activo/inactivo */}
      <div className="flex items-center space-x-2">
        <Checkbox.Root
          checked={isActive}
          onCheckedChange={(checked) => setIsActive(checked)}
          className="w-6 h-6 bg-gray-200 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Checkbox.Indicator>
            <Check className="text-green-600" size={20} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <span className="text-gray-700 font-medium">Activo</span>
      </div>

      {/* Botones para enviar o cancelar */}
      <div className="flex space-x-4 mt-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-2 rounded-lg font-semibold shadow-md hover:from-green-500 hover:to-green-600 transition-all duration-200"
        >
          {restaurantData ? "Actualizar" : "Crear"}
        </button>
        {restaurantData && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-400 transition-all duration-200"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default RestaurantForm;
