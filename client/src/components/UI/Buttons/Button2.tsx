import React from 'react';

const Button2: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="w-1/6 bg-gray-500 text-white text-center border-2 border-purple-500 py-3 rounded-lg transition-all duration-300 
                       shadow-md hover:bg-purple-500 hover:text-white hover:border-gray-500 hover:shadow-lg 
                       hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-purple-600"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button2;
