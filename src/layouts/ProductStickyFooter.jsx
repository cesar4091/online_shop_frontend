import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ShoppingCartIcon, UserCircleIcon, Bars3Icon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import StandardButton from '../components/StandardButton';
import SimpleButton from '../components/SimpleButton';
import AdditemsControls from '../components/AddItemsControls.jsx';
import { useCart } from '../context/CartContext'; // Importar hook
import CartButton from '../components/CartButton.jsx';
import UserLoginButton from '../components/UserLoginButon.jsx';

export default function ProductStickyFooter() {
  const navigate = useNavigate();
  const { totalItems } = useCart(); // Usar el hook para obtener totalItems

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex flex-col shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className='w-full'>
              <AdditemsControls />
      </div>

      {/* --- LAYER 2: NAVIGATION BAR (The one we built before) --- */}
      <div className="bg-brand-base border-t border-brand-militar/10 pb-safe">
        <div className="flex items-center justify-around p-2">
          
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="p-2 text-brand-militar hover:text-brand-dark">
            <ChevronLeftIcon className="w-7 h-7" />
          </button>

          <CartButton />

          {/* User */}
          <UserLoginButton />

          {/* Menu */}
          <button className="p-2 text-brand-militar hover:text-brand-dark">
            <Bars3Icon className="w-7 h-7" />
          </button>
          
        </div>
      </div>
    </div>
  );
}