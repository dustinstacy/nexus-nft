import React from 'react';

const Button1: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="bg-light-gray text-light-black py-2 px-4 rounded transition-all duration-300 
                       shadow-md hover:bg-light-black hover:text-light-gray hover:shadow-lg 
                       hover:translate-y-[-2px]"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button1;
