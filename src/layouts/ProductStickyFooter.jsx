import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ShoppingCartIcon, UserCircleIcon, Bars3Icon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import StandardButton from '../components/StandardButton';
import SimpleButton from '../components/SimpleButton';
import AdditemsControls from '../components/AddItemsControls.jsx';

export default function ProductStickyFooter({ cartCount = 2, price }) {
  const navigate = useNavigate();

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

          {/* Cart */}
          <button className="relative p-2 text-brand-militar hover:text-brand-dark">
            <ShoppingCartIcon className="w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 bg-green-950 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* User */}
          <button className="p-2 text-brand-militar hover:text-brand-dark">
            <UserCircleIcon className="w-7 h-7" />
          </button>

          {/* Menu */}
          <button className="p-2 text-brand-militar hover:text-brand-dark">
            <Bars3Icon className="w-7 h-7" />
          </button>
          
        </div>
      </div>
    </div>
  );
}