import { useState, useEffect, useMemo } from 'react';
import { getTires } from '../services/shopService.js'; // Tu servicio que trae TODO

export function useTireCatalog(searchParams = null) {
  const [allTires, setAllTires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Carga Inicial (Solo se ejecuta una vez al montar)
  useEffect(() => {
  // 1. Definimos la función asíncrona interna
  const fetchTiresData = async () => {
    try {
      // Intentamos obtener los datos
      const data = await getTires();
      setAllTires(data);
      console.log("Tires fetched:", data);
    } catch (err) {
      // Si falla, capturamos el error
      setError(err);
    } finally {
      // Esto se ejecuta SIEMPRE, haya éxito o error (perfecto para apagar el loading)
      setIsLoading(false);
    }
  };
  // 2. La ejecutamos inmediatamente
  fetchTiresData();
}, []); // Dependencias vacías = Solo al montar



  // 2. Filtrado en Memoria (Súper rápido)
  // Usamos useMemo para que solo recalcule si cambian los filtros o la data
  const filteredTires = useMemo(() => {
    // GUARD CLAUSE: If no searchParams provided, return everything immediately
    if (!searchParams) return allTires;

    // Safety check: Ensure searchParams has the .get method (is a URLSearchParams object)
    if (typeof searchParams.get !== 'function') {
        console.warn("useTireCatalog expected URLSearchParams, got:", searchParams);
        return allTires;
    }

    const width = parseInt(searchParams.get('width') || "0");
    const profile = parseInt(searchParams.get('profile') || "0");
    const rim = parseInt(searchParams.get('rim') || "0");

    let results = allTires;

    if (width !== 0) results = results.filter(t => t.width === width);
    if (profile !== 0) results = results.filter(t => t.profile === profile);
    if (rim !== 0) results = results.filter(t => t.rim_diameter === rim);

    return results;
  }, [allTires, searchParams]); // Dependencias

  console.log("Filtered Tires:", filteredTires);
  return { tires: filteredTires, isLoading, error };
}