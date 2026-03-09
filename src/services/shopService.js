const API_URL = import.meta.env.VITE_API_URL;

export const getTires = async () => {
  console.log("Fetching all tires from API:", API_URL);
  try {
    const endpoint = `${API_URL}/products/`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data; // Returns the array of tires
  } catch (error) {
    console.error("Error fetching tires:", error);
    throw error; // Re-throw to handle it in the component
  }
};

/**
 * Fetches a single tire by ID
 */
export const getTireById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Tire not found');
    return await response.json();
  } catch (error) {
    console.error("Error fetching tire details:", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users/search?email=${encodeURIComponent(email)}`);
    if (!response.ok) return null; // Si no se encuentra el usuario, devolvemos null en vez de lanzar error
    return await response.json();
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {      
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(orderData),
      credentials: 'include', // Asegura que se envíen las cookies de sesión
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error creating order');
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrderDetailsByToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/orders/v1/order-access/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('No pudimos encontrar la información de este pedido.');
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};