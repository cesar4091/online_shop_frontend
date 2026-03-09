import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Ajusta la ruta
import NavigationBar from '../layouts/NavigationBar';
import { useAuth } from '../hooks/useAuth';
import { createOrder, getUserByEmail } from '../services/shopService';
import { registerUser } from '../services/authService';

export default function CheckoutPage() {
    const { cart, totalPrice, totalItems, clearCart } = useCart();
    const navigate = useNavigate();
    const { user, isAuthenticated, registerGuest, updateContactInfo } = useAuth(); // Para mostrar info del usuario o prellenar el formulario

    // Estado del formulario de envío
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '', // Prellenar con nombre del usuario si existe
        lastName: user?.name?.split(' ').slice(1).join(' ') || '', // Prellenar con apellido del usuario si existe
        phone: user?.phone || '',
        email: user?.email || '', // Prellenar con email del usuario si existe
        nit: user?.tax_id || '',
        address: '',
        province: '',
        city: '',
        notes: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirigir si el carrito está vacío
    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-base px-4">
                <h2 className="text-3xl font-brand-titles font-bold text-brand-dark mb-4">Tu carrito está vacío</h2>
                <p className="text-brand-gray mb-8 text-center max-w-md">
                    Parece que aún no has agregado llantas a tu pedido. Revisa nuestro catálogo para encontrar lo que necesitas.
                </p>
                <Link
                    to="/"
                    className="bg-brand-militar text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all"
                >
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // 1. Buscamos al usuario
            let userResponse = await getUserByEmail(formData.email);
            let finalUser = null;

            // 2. Verificamos si realmente encontramos algo 
            // (Maneja tanto si devuelve null como si devuelve un array vacío [])
            const userExists = userResponse && (!Array.isArray(userResponse) || userResponse.length > 0);

            if (!userExists) {
                formData.name = `${formData.firstName} ${formData.lastName}`; //enviar un nombre completo al backend
                // Si no existe, lo registramos. Asumimos que esto devuelve un OBJETO: { id: 5, ... }
                finalUser = await registerGuest(formData);
                finalUser = finalUser.user; // Ajusta esto según la estructura real de tu respuesta
            } else {
                // Si existe, extraemos el objeto. 
                // Si es un array sacamos el [0], si ya era objeto lo dejamos igual.
                finalUser = Array.isArray(userResponse) ? userResponse[0] : userResponse;
                console.log("Respuesta del backend al buscar usuario por email:", userResponse);
                console.log("Usuario resuelto para la orden:", finalUser);
            }

            //Actualizamos la info de contacto del usuario registrado (en caso de que haya cambiado algo en el formulario)
            await updateContactInfo({
                id: finalUser.id,
                phone: formData.phone,
                email: formData.email,
                tax_id: formData.nit,
                name: `${formData.firstName} ${formData.lastName}`
            });

            // 3. Ahora finalUser SIEMPRE será un objeto limpio { id: ..., email: ... }
            const orderPayload = {
                user_id: finalUser.id,
                user_email: formData.email,
                user_phone: formData.phone,
                tax_id: formData.nit,

                shipping_name: `${formData.firstName} ${formData.lastName}`,
                shipping_address: formData.address,
                billing_address: formData.address,
                shipping_province: formData.province,
                shipping_city: formData.city,
                shipping_cost: 25,

                notes: 'orden de prueba desde frontend',

                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price_at_purchase: item.price
                }))
            };
            console.log("Payload de orden a enviar al backend:", orderPayload);
            // 3. Llamas al servicio
            //const result = await createOrder(orderPayload);

            // 4. Si todo salió bien
            alert("¡Pedido realizado con éxito! Tu número de orden es: " + result.orderNumber);
            clearCart();
            navigate('/thanks', {
                state: { orderId: result.orderNumber || result.id }
            }); // Redirige a la página de agradecimiento con el ID de la orden

        } catch (error) {
            alert(error.message); // Muestra el error si falló algo en el backend
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="bg-brand-base min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-brand-titles font-bold text-brand-dark mb-8">
                        Finalizar Compra
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                        {/* COLUMNA IZQUIERDA: Formulario de Envío */}
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-brand-base/20">
                                <h2 className="text-xl font-bold text-brand-dark mb-6 border-b pb-4">
                                    Datos de Envío
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-brand-dark mb-2">Nombre</label>
                                            <input
                                                required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-brand-dark mb-2">Apellido</label>
                                            <input
                                                required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-brand-dark mb-2">Teléfono de contacto</label>
                                            <input
                                                required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-brand-dark mb-2">NIT</label>
                                            <input
                                                required type="text" name="nit" value={formData.nit} onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-dark mb-2">Correo electrónico</label>
                                        <input
                                            required type="email" name="email" value={formData.email} onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-dark mb-2">Dirección Completa</label>
                                        <input
                                            required type="text" name="address" value={formData.address} onChange={handleInputChange}
                                            placeholder="Calle, número, colonia..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-brand-dark mb-2">Provincia / Departamento</label>
                                            <input
                                                required type="text" name="province" value={formData.province} onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-brand-dark mb-2">Ciudad / Municipio</label>
                                            <input
                                                required type="text" name="city" value={formData.city} onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-dark mb-2">Notas Especiales</label>
                                        <input
                                            required type="text" name="notes" value={formData.notes} onChange={handleInputChange}
                                            placeholder="Instrucciones especiales para la entrega..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-militar focus:border-transparent outline-none transition-all"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full mt-8 bg-brand-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-militar transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                                    >
                                        {isProcessing ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        ) : (
                                            `Confirmar Pedido - $${totalPrice.toFixed(2)}`
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: Resumen del Pedido */}
                        <div className="w-full lg:w-[450px] order-1 lg:order-2">
                            <div className="bg-brand-light p-6 sm:p-8 rounded-2xl sticky top-8">
                                <h2 className="text-xl font-bold text-brand-dark mb-6">
                                    Resumen de Compra ({totalItems} items)
                                </h2>

                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl items-center">
                                            <img
                                                src={item.image_url[0].src || 'https://via.placeholder.com/60'}
                                                alt={item.model}
                                                className="w-16 h-16 object-contain"
                                            />
                                            <div className="flex-1">
                                                <p className="font-bold text-brand-dark text-sm leading-tight">{item.brand} {item.model}</p>
                                                <p className="text-xs text-brand-gray mt-1">Medida: {item.width}/{item.profile} R{item.rim}</p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-sm font-semibold text-brand-militar">x{item.quantity}</span>
                                                    <span className="font-bold text-brand-dark">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 border-t border-brand-dark/10 pt-6 space-y-3">
                                    <div className="flex justify-between text-brand-gray">
                                        <span>Subtotal</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-brand-gray">
                                        <span>Envío</span>
                                        <span className="text-green-600 font-medium">Gratis</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-brand-dark pt-3 border-t border-brand-dark/10">
                                        <span>Total a Pagar</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}