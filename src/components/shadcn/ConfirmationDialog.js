import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./Dialog";

function ConfirmationDialog({ open, onOpenChange, onConfirm, message }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogDescription>{message || "¿Estás seguro de que deseas realizar esta acción?"}</DialogDescription>
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
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
