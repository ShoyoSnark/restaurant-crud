import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Checkbox from "./components/shadcn/Checkbox"; // Componente shadcn de Checkbox personalizado
import Button from "./components/shadcn/Button"; // Componente shadcn de Botón personalizado

// Componente principal que representa el formulario
function RestaurantForm({ restaurantData, onSubmit, clearEditing }) {
  // Configuración de React Hook Form
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { name: "", active: false },
  });
  const [isActive, setIsActive] = useState(false); // Estado local para el checkbox

  // Carga de datos en el formulario si hay un restaurante en modo de edición
  useEffect(() => {
    if (restaurantData) {
      setValue("name", restaurantData.name);
      setIsActive(restaurantData.active || false);
    }
  }, [restaurantData, setValue]);

  // Maneja el envío del formulario para crear o actualizar un restaurante
  const onSubmitHandler = (data) => {
    const formData = {
      ...data,
      active: isActive,
    };
    onSubmit(formData); // Llama a la función de creación/actualización
    resetForm(); // Resetea el formulario después de enviar
  };

  // Resetea el formulario y el estado de edición
  const resetForm = () => {
    reset();
    setIsActive(false);
    clearEditing();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto space-y-6 border border-gray-300"
    >
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Registrar Restaurante</h2>

      {/* Campo de entrada para el nombre del restaurante */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Nombre del Restaurante</label>
        <input
          {...register("name", { required: true })}
          placeholder="Ejemplo: La Buena Mesa"
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Checkbox para indicar si el restaurante está activo o inactivo */}
      <div className="flex items-center space-x-3">
        <Checkbox checked={isActive} onCheckedChange={(checked) => setIsActive(checked)} />
        <label className="text-gray-700">Activo</label>
      </div>

      {/* Botones de acción para crear/actualizar o cancelar */}
      <div className="flex space-x-3">
        <Button type="submit" className="flex-1">
          {restaurantData ? "Actualizar" : "Crear"}
        </Button>
        {restaurantData && (
          <Button type="button" className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={resetForm}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}

export default RestaurantForm;
