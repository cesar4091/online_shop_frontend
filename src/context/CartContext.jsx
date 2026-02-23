import { createContext, useState, useEffect, useContext } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

export function CartProvider({ children }) {
  // 2. Iniciar estado buscando en LocalStorage primero
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //Estado de visibilidad del Drawer
  const [isCartOpen, setIsCartOpen] = useState(false); // Por defecto cerrado

  // 3. Guardar en LocalStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  // --- FUNCIONES LOGICAS ---

  // Agregar producto (Evita duplicados, solo suma cantidad)
  const addToCart = (product, quantity = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);

      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentCart, { ...product, quantity }];
    });
    setIsCartOpen(true); // NUEVO: Abrir el carrito automáticamente al agregar
  };

  // NUEVO: Funciones para abrir/cerrar manualmente
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Remover producto
  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  //Vaciar el carrito 
  const clearCart = () => setCart([]);

  // Calcular total de items (para la burbuja roja)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Calcular precio total
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, 
    totalPrice, isCartOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usarlo fácil
export const useCart = () => useContext(CartContext);