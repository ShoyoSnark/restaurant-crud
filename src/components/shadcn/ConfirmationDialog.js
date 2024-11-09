// src/components/shadcn/ConfirmationDialog.js
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react"; // Cambiado a XIcon

function ConfirmationDialog({ open, onOpenChange, onConfirm, message }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 p-4 bg-white rounded-lg shadow-lg">
        <Dialog.Title className="text-lg font-semibold text-gray-900 mb-2">Confirmación</Dialog.Title>
        <Dialog.Description className="text-sm text-gray-600 mb-4">
          {message || "¿Estás seguro de que deseas realizar esta acción?"}
        </Dialog.Description>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Confirmar
          </button>
        </div>
        <Dialog.Close asChild>
          <button className="absolute top-2 right-2">
            <XIcon className="w-4 h-4 text-gray-600" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default ConfirmationDialog;
