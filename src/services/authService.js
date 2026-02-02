const API_URL = "";

/**
 * Sends login credentials to the server
 * @param {Object} credentials - { username, password }
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // Incluye cookies si las hay
    });

    if (!response.ok) {
      // Intentamos leer el mensaje de error del servidor
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en la autenticación');
    }

    // Retorna los datos (usualmente incluye el Token y datos del usuario)
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const checkSession = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // <--- Envía la cookie automáticamente
    });

    console.log("checkSession response status:", response.status);
    if (response.ok) {
      return await response.json(); // Retorna el usuario si la cookie es válida
    }
    return null; // Si da 401 o 403, no hay usuario
  } catch (error) {
    return null;
  }
};

// 3. Cerrar Sesión (Endpoint /logout)
export const logoutUser = async () => {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST', // O GET, depende de tu backend
      credentials: 'include',
    });
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión", error);
    return false;
  }
};