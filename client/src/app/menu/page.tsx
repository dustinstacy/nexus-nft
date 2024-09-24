import React from 'react';
import Button2 from '../../components/UI/Buttons/Button2';

const Menu: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Button2>Game</Button2>
      <Button2>Inventory</Button2>
      <Button2>Market</Button2>
    </div>
  );
};

export default Menu;
