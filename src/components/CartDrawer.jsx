import React from 'react';
import { XMarkIcon, TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import StandardButton from './StandardButton'; // Reusamos tu botón

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, totalPrice } = useCart();

  return (
    // 1. Contenedor Maestro (Z-Index alto para estar sobre todo)
    <div className={`relative z-100 ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      {/* 2. El Overlay Oscuro (Fondo) */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={closeCart} // Cerrar al hacer clic fuera
      />

      {/* 3. El Panel Deslizante (Drawer) */}
      <div className={`fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10 transition-transform duration-300 ease-in-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        
        <div className="w-screen max-w-md flex flex-col bg-white shadow-xl">
          
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-6 bg-brand-base border-b border-gray-200">
            <h2 className="text-lg font-brand-titles font-bold text-brand-dark">
              Tu Carrito ({cart.length})
            </h2>
            <button 
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* BODY (Lista de Productos) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <ShoppingBagIcon className="w-16 h-16 opacity-20" />
                <p>Tu carrito está vacío</p>
                <button onClick={closeCart} className="text-blue-600 font-bold text-sm">
                  Seguir comprando
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex py-2 gap-4 border-b border-gray-100 pb-4 last:border-0">
                  {/* Imagen Miniatura */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 p-1">
                    <img
                      src={item.image_url[0].src}
                      alt={item.model}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-(--color-brand-dark)">
                        <h3>{item.model}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.width}/{item.profile} R{item.rim_diameter}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Cant: {item.quantity}</p>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <TrashIcon className="w-4 h-4" /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER (Subtotal y Botón Pagar) */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 bg-gray-50">
              <div className="flex justify-between text-base font-bold text-(--color-brand-dark) mb-4">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">
                Envío e impuestos calculados al finalizar.
              </p>
              <StandardButton className="w-full bg-[#EA3811] hover:bg-[#c9300e]">
                Proceder al Pago
              </StandardButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}