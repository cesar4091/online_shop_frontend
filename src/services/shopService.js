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
    console.log(data)
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