const API_URL = import.meta.env.VITE_API_URL;

/**
 * Sends login credentials to the server
 * @param {Object} credentials - { username, password }
 */

export const registerUser = async (userData) => {
  const payload = {
    ...userData,
    status: 'active'
  };

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Error al registrar el usuario';
    try {
      errorMessage = JSON.parse(errorText).message || errorMessage;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  const textResponse = await response.text();
  
  try {
    // Intentamos parsearlo. Si es un espacio en blanco o texto plano, esto fallará
    // y saltará al catch sin romper la aplicación.
    return textResponse.trim() ? JSON.parse(textResponse) : {}; 
  } catch (error) {
    console.warn("La API no devolvió un JSON válido, devolviendo texto crudo:", textResponse);
    return { message: textResponse }; // Devolvemos lo que sea que haya respondido
  }
};

export const registerGuestUser = async (name, phone, email) => {
  const payload = {
    name: name || "Invitado",
    email: email, // Email único para evitar conflictos
    phone: phone || "0000000000",
  };
  const response = await fetch(`${API_URL}/users/newGuest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Error al crear usuario invitado';
    try {
      errorMessage = JSON.parse(errorText).message || errorMessage;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  const textResponse = await response.text();
  
  try {
    return textResponse.trim() ? JSON.parse(textResponse) : {}; 
  } catch (error) {
    console.warn("La API no devolvió un JSON válido, devolviendo texto crudo:", textResponse);
    return { message: textResponse };
  }
};

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

    console.log("checkSession response status:", response);
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