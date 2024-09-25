'use client';

import React from 'react';
import Button2 from '../../components/UI/Buttons/Button2';
import { useRouter } from 'next/navigation';

const Menu: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col space-y-4">
      <Button2 onClick={() => handleNavigation('/exchange')}>Exchange</Button2>
      <Button2 onClick={() => handleNavigation('/market')}>Market</Button2>
      <Button2 onClick={() => handleNavigation('/inventory')}>
        Inventory
      </Button2>
    </div>
  );
};

export default Menu;
