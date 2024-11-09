// src/components/shadcn/Button.js
import React from "react";
import classNames from "classnames";

function Button({ children, className, ...props }) {
  return (
    <button
      className={classNames(
        "px-4 py-2 rounded-md font-medium text-white transition-colors duration-200",
        "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
