import { useState, useEffect } from 'react';
import { getTireById } from '../services/shopService.js';

export function useTireDetails(id) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay ID, no hacemos nada
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await getTireById(id);
        setProduct(data);
      } catch (err) {
        setError(err);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Se ejecuta si cambia el ID (ej: usuario navega a otro producto)

  return { product, isLoading, error };
}