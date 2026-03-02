import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Asegúrate de tener heroicons instalado: npm install @heroicons/react
import { CheckCircleIcon } from '@heroicons/react/24/outline'; 

export default function ThankYouPage() {
  const location = useLocation();
  
  // Extraemos el ID de la orden si lo pasamos desde el Checkout.
  // Si por alguna razón no viene (ej. el usuario recargó la página), mostramos un texto genérico.
  const orderId = location.state?.orderId || 'Pendiente de confirmación';

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-brand-base px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-sm border border-brand-base/20 p-8 md:p-12 text-center transform transition-all hover:shadow-md">
        
        {/* Icono animado de Éxito */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-50 p-3">
            <CheckCircleIcon className="w-20 h-20 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-brand-titles font-bold text-brand-dark mb-4">
          ¡Gracias por tu compra!
        </h1>
        
        <p className="text-brand-gray mb-6 text-base">
          Tu pedido ha sido procesado correctamente y ya estamos preparando tus llantas para el envío.
        </p>
        
        {/* Tarjeta con el Número de Orden */}
        <div className="bg-brand-light rounded-2xl p-6 mb-8 border border-gray-100">
          <p className="text-sm text-brand-gray mb-1 uppercase tracking-wider font-bold">
            Número de Orden
          </p>
          <p className="text-2xl font-bold text-brand-militar">
            #{orderId}
          </p>
        </div>
        
        <p className="text-sm text-brand-gray mb-8 px-4">
          Te hemos enviado un correo electrónico con el recibo detallado y la información de seguimiento.
        </p>
        
        {/* Botón de regreso */}
        <Link 
          to="/" 
          className="inline-block w-full bg-brand-dark text-white font-bold py-4 px-8 rounded-xl hover:bg-brand-militar transition-colors duration-300"
        >
          Seguir comprando
        </Link>
      </div>
      
      {/* Elemento decorativo o mensaje de soporte */}
      <div className="mt-8 text-center text-sm text-brand-gray">
        <p>¿Tienes alguna duda con tu pedido?</p>
        <Link to="/contacto" className="text-brand-militar font-bold hover:underline">
          Contáctanos
        </Link>
      </div>
    </div>
  );
}