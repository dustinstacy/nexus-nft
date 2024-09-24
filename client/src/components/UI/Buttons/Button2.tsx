import React from 'react';

const Button2: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="bg-blue-800 text-silver border-2 border-gold py-3 px-6 rounded-lg transition-all duration-300 
                       shadow-md hover:bg-blue-700 hover:text-white hover:shadow-lg 
                       hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-blue-600"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button2;
