import React, { createContext, useContext, useState, useEffect } from 'react';
import {registerUser, registerGuestUser, loginUser, logoutUser, checkSession } from '../services/authService';

export const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // 1. Efecto Inicial: Verificar cookie al cargar la App
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userData = await checkSession(); // Llama a /auth/me
        console.log("checkSession result:", userData);
        if (userData) {
          setUser(userData);
          isAuthenticated = true;
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

  const register = async (formData) => {
    // 1. Llamamos a la API para crear el usuario
    const data = await registerUser(formData);
    console.log("Usuario registrado:", data);
    return data; // Retornamos la data por si la página de registro quiere mostrar un mensaje
  };

  const registerGuest = async (formData) => {
    const data = await registerGuestUser(formData.name, formData.phone, formData.email);
    console.log("Usuario invitado registrado:", data);
    return data; // Retornamos la data por si la página de checkout quiere mostrar un mensaje
  }

  const updateContactInfo = async (contactData) => {
    console.log("Actualizando información de contacto para el usuario:", contactData);
    try {
      const response = await fetch(`${API_URL}/users/contact/${contactData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la información de contacto');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error('Error al actualizar la información de contacto:', error);
      throw error;
    }
  };

  // 2. Acción de Login
  const login = async (formData) => {
    // Nota: loginUser ya lanza error si falla, así que el componente lo captura
    const data = await loginUser(formData);
    setUser(data.user); // Actualizamos estado inmediatamente
  };

  // 3. Acción de Logout
  const logout = async () => {
    await logoutUser(); // Avisamos al backend para que destruya la cookie
    isAuthenticated = false;
    setUser(null); // Limpiamos el estado local
    window.location.reload(); // Opcional: Recarga dura para limpiar caché
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    register,
    registerGuest,
    login,
    logout,
    updateContactInfo
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}