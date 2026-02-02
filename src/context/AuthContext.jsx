import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, checkSession } from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Efecto Inicial: Verificar cookie al cargar la App
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userData = await checkSession(); // Llama a /auth/me
        if (userData) {
          setUser(userData);
          console.log("Sesión restaurada para usuario:", userData);
        }
      } catch (error) {
        console.log("No hay sesión activa");
      } finally {
        setIsLoading(false); // Terminamos de cargar, sea éxito o fallo
      }
    };

    verifyUser();
  }, []);

  // 2. Acción de Login
  const login = async (formData) => {
    // Nota: loginUser ya lanza error si falla, así que el componente lo captura
    const data = await loginUser(formData);
    setUser(data.user); // Actualizamos estado inmediatamente
  };

  // 3. Acción de Logout
  const logout = async () => {
    await logoutUser(); // Avisamos al backend para que destruya la cookie
    setUser(null); // Limpiamos el estado local
    window.location.href = '/'; // Opcional: Recarga dura para limpiar caché
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}