import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

// Contenedor del diálogo
export function Dialog({ children, ...props }) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// Contenido del diálogo, que se centrará en la pantalla
export function DialogContent({ children, ...props }) {
  return (
    <DialogPrimitive.Content
      {...props}
      className="fixed top-1/2 left-1/2 w-80 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
    >
      {children}
      <DialogPrimitive.Close asChild>
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
          <XIcon className="w-4 h-4" />
        </button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  );
}

// Título del diálogo
export function DialogTitle({ children }) {
  return <DialogPrimitive.Title className="text-lg font-bold text-gray-900 mb-4">{children}</DialogPrimitive.Title>;
}

// Descripción dentro del diálogo
export function DialogDescription({ children }) {
  return <DialogPrimitive.Description className="text-sm text-gray-600 mb-6">{children}</DialogPrimitive.Description>;
}

// Botón de apertura del diálogo
export function DialogTrigger({ children, ...props }) {
  return <DialogPrimitive.Trigger {...props}>{children}</DialogPrimitive.Trigger>;
}
