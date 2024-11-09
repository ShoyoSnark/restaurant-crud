// src/RestaurantForm.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Checkbox from "./components/shadcn/Checkbox"; // Checkbox de Shadcn
import Button from "./components/shadcn/Button"; // Botón de Shadcn

function RestaurantForm({ restaurantData, onSubmit, clearEditing }) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { name: "", active: false },
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (restaurantData) {
      setValue("name", restaurantData.name);
      setIsActive(restaurantData.active || false);
    }
  }, [restaurantData, setValue]);

  const onSubmitHandler = (data) => {
    const formData = {
      ...data,
      active: isActive,
    };
    onSubmit(formData);
    resetForm();
  };

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

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Nombre del Restaurante</label>
        <input
          {...register("name", { required: true })}
          placeholder="Ejemplo: La Buena Mesa"
          className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox checked={isActive} onCheckedChange={(checked) => setIsActive(checked)} />
        <label className="text-gray-700">Activo</label>
      </div>

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
