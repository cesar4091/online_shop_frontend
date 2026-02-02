import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* <--- AQUÍ */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
