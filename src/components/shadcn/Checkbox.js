// src/components/shadcn/Checkbox.js
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

function Checkbox({ checked, onCheckedChange, className }) {
  return (
    <CheckboxPrimitive.Root
      className="w-6 h-6 bg-gray-200 rounded shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 flex items-center justify-center"
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="text-indigo-600" size={18} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export default Checkbox;
            