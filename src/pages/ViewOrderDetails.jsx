import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetailsByToken } from '../services/shopService.js';
import NeumaniaticosButton from '../components/neumaniaticosButton.jsx';

export default function ViewOrderDetails() {
  const { token } = useParams(); // Extrae el :token de la URL
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetailsByToken(token);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchOrder();
  }, [token]);

  // Funciones de formateo para que se vea profesional
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-GT', options); // Formato adaptado a la región
  };

  const formatMoney = (amount) => {
    return Number(amount).toLocaleString('es-GT', { style: 'currency', currency: 'USD' }); // Ajusta la moneda según necesites (ej: USD, GTQ)
  };

  if (isLoading || !order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-brand-base">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-militar"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-base px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error al cargar el pedido</h2>
        <p className="text-brand-gray mb-6">{error}</p>
        <Link to="/" className="bg-brand-dark text-white px-6 py-2 rounded-lg font-bold">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-base min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className='pb-2'>
            <NeumaniaticosButton />
        </div>
        {/* ENCABEZADO DEL PEDIDO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-brand-titles font-bold text-brand-dark mb-2">
              Detalles de tu Pedido
            </h1>
            <p className="text-brand-gray">
              Realizado el {formatDate(order.order_date)}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right">
            <p className="text-sm text-brand-gray uppercase tracking-wider font-bold mb-1">Orden #</p>
            <p className="text-xl font-bold text-brand-militar">{order.order_number}</p>
            {/* Pill de Estado */}
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wide">
              Estado: {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Lista de Productos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-brand-base/20 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-brand-dark">Artículos en tu orden ({order.items.length})</h2>
              </div>
              
              <ul className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <li key={item.product_id} className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    {/* Extraemos la primera imagen del array */}
                    <img 
                      src={item.image[0]?.src} 
                      alt={item.image[0]?.alt || item.name} 
                      className="w-24 h-24 object-contain bg-gray-50 rounded-lg p-2"
                    />
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-bold text-brand-dark mb-1">{item.name}</h3>
                      <p className="text-sm text-brand-gray mb-3">ID Producto: {item.product_id}</p>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-4">
                        <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">
                          Cant: {item.quantity}
                        </span>
                        <span className="font-bold text-brand-dark">
                          {formatMoney(item.price)} c/u
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-brand-gray mb-1">Subtotal Item</p>
                      <p className="text-lg font-bold text-brand-militar">
                        {formatMoney(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COLUMNA DERECHA: Resumen de Pago */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-brand-base/20 p-6 sticky top-8">
              <h2 className="text-lg font-bold text-brand-dark mb-6">Resumen del Pago</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatMoney(order.subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos (IVA)</span>
                  <span className="font-medium">{formatMoney(order.tax_amount)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600 border-b border-gray-100 pb-4">
                  <span>Costo de Envío</span>
                  <span className="font-medium">{formatMoney(order.shipping_cost)}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-bold text-brand-dark">Total</span>
                  <span className="text-2xl font-bold text-brand-militar">{formatMoney(order.total_amount)}</span>
                </div>
              </div>

              {/* Botón de acción (opcional) */}
              <button 
                onClick={() => window.print()}
                className="w-full mt-8 bg-gray-100 hover:bg-gray-200 text-brand-dark font-bold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Imprimir Recibo
              </button>
                
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}