import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import SimpleButton from './SimpleButton';
import { useCart } from '../context/CartContext';
import { MOCK_TIRES } from '../mocks/MOCKTIRE';
import { useParams } from 'react-router-dom';
import { useTireCatalog } from '../hooks/useTireCatalog';

export default function AddItemsControls() {
    const { addToCart } = useCart(); // Usar el hook para obtener la función addToCart
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    const { tires } = useTireCatalog();

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));
    const handleAddToCart = () => {
        addToCart(tires.find(tire => tire.id === parseInt(id,10) ), quantity);
        setQuantity(1); // Resetear contador
    };

    return (
        <div className="bg-white border-t border-brand-base px-4 py-3 flex gap-4 items-center">

            {/* Quantity Selector (Pill Shape) */}
            <div className="flex items-center bg-brand-light rounded-full px-1 py-1 shadow-inner">
                <button
                    onClick={handleDecrement}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-dark shadow-sm active:scale-90 transition-transform"
                >
                    <MinusIcon className="w-4 h-4" />
                </button>

                <span className="w-8 text-center font-bold text-brand-dark text-lg">
                    {quantity}
                </span>

                <button
                    onClick={handleIncrement}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-brand-dark shadow-sm active:scale-90 transition-transform"
                >
                    <PlusIcon className="w-4 h-4" />
                </button>
            </div>
            {/* Add to Cart Button (Big CTA) */}
            <SimpleButton
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 active:scale-[0.98] transition-all uppercase tracking-wide flex justify-center items-center gap-2"
            >
                <span>Agregar A Carrito</span>
            </SimpleButton>
        </div>
    )
}



