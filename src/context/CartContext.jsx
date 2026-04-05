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
  // 1. Creamos una bandera para saber si excedimos el stock
  let stockExceeded = false;

  setCart(currentCart => {
    const existingItem = currentCart.find(item => item.id === product.id);
    
    // 2. Calculamos cuántos hay actualmente en el carrito (0 si no existe)
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    
    // 3. Calculamos el total proyectado
    const newTotalQuantity = currentQuantityInCart + quantity;

    // 4. Validamos contra el stock del producto
    if (newTotalQuantity > product.stock) {
      stockExceeded = true; // Levantamos la bandera
      return currentCart;   // Retornamos el carrito intacto, cancelando la adición
    }

    // 5. Si hay stock suficiente, procedemos normalmente
    if (existingItem) {
      return currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: newTotalQuantity }
          : item
      );
    }
    
    return [...currentCart, { ...product, quantity }];
  });

  // 6. Fuera del setCart, manejamos la experiencia del usuario (UX)
  if (stockExceeded) {
    // Aquí puedes usar alert() o tu librería de notificaciones (ej. react-toastify)
    alert(`¡Lo sentimos! Solo tenemos ${product.stock} unidades disponibles de este producto.`);
  } else {
    // Si todo salió bien, abrimos el carrito
    setIsCartOpen(true); 
  }
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