import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importar hook

function CartButton() {
    const navigate = useNavigate();
    const { totalItems, openCart } = useCart(); // Usar el hook para obtener totalItems
    return (
        <button onClick={openCart} className="relative p-2 text-brand-militar hover:text-brand-dark">
            <ShoppingCartIcon className="w-7 h-7" />
            {totalItems > 0 && (
                <span className="absolute top-1 right-0 bg-green-950 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {totalItems}
                </span>
            )}
        </button>
    );
}

export default CartButton;