import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StandardButton from '../components/StandardButton.jsx';
import TireCard from '../components/TireCard.jsx';
import { MOCK_TIRES } from '../mocks/MOCKTIRE.js';
import { useTireCatalog } from '../hooks/useTireCatalog';

export default function TireSearch() {

  //const tires = MOCK_TIRES;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedTires, setSearchedTires] = useState([]);

  const {tires, isLoading, error} = useTireCatalog(searchParams);

  // Helper object to parse URL params safely
  const searchData = {
    width: parseInt(searchParams.get('width') || "0"),
    profile: parseInt(searchParams.get('profile') || "0"),
    rim: parseInt(searchParams.get('rim') || "0")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // We create a temporary object representing the NEXT state
    // Note: inputs return strings, so we must be careful with types if we compare manually here
    const newParams = { 
      width: searchData.width.toString(),
      profile: searchData.profile.toString(),
      rim: searchData.rim.toString(),
      [name]: value 
    };
    
    // Clean up "0" values. 
    // Since 'value' from select is a string "0", we compare against string "0" strictly
    if (newParams.width === "0") delete newParams.width;
    if (newParams.profile === "0") delete newParams.profile;
    if (newParams.rim === "0") delete newParams.rim;

    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-0 w-11/12 max-w-4xl mx-auto mt-3 p-3 bg-brand-light rounded-2xl shadow-sm">
      <h2 className="font-brand-titles text-3xl text-brand-dark mb-6 font-bold">
        Encuentra Tus Llantas
      </h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Width Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-brand-gray ml-1">Ancho</label>
          <select 
            name="width"
            value={searchData.width}
            onChange={handleChange}
            className="px-4 py-3 bg-white border-2 border-brand-base rounded-xl focus:border-brand-militar outline-none transition-colors"
          >
            <option value="0">Seleccionar Ancho</option>
            <option value="185">185</option>
            <option value="190">190</option>
            <option value="195">195</option>
            <option value="205">205</option>
            <option value="215">215</option>
            <option value="225">225</option>
          </select>
        </div>

        {/* Profile Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-brand-gray ml-1">Perfil</label>
          <select 
            name="profile"
            value={searchData.profile}
            onChange={handleChange}
            className="bg-white border-2 border-brand-base rounded-xl px-4 py-3 focus:border-brand-militar outline-none transition-colors"
          >
            <option value="0">Seleccionar Perfil</option>
            <option value="45">45</option>
            <option value="55">55</option>
            <option value="60">60</option>
            <option value="65">65</option>
            <option value="75">75</option>
          </select>
        </div>

        {/* Rim Size Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-brand-gray ml-1">Rin</label>
          <select 
            name="rim"
            value={searchData.rim}
            onChange={handleChange}
            className="bg-white border-2 border-brand-base rounded-xl px-4 py-3 focus:border-brand-militar outline-none transition-colors"
          >
            <option value="0">Seleccionar Rin</option>
            <option value="15">R15</option>
            <option value="16">R16</option>
            <option value="17">R17</option>
            <option value="18">R18</option>
          </select>
        </div>

        {/* Search Button */}
        <StandardButton type="submit" className="w-full">
          Buscar Llantas
        </StandardButton>
      </form>

      <div className='flex flex-wrap gap-3 justify-center pt-5'>
        {/* State 1: Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-brand-militar">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-dark mb-2"></div>
            <p className="text-brand-militar font-bold">Buscando las mejores opciones...</p>
          </div>
        )}

        {/* State 2: Error */}
        {error && !isLoading && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            <p className="font-bold">Error de conexión</p>
            <p className="text-sm">No pudimos conectar con el servidor. Intenta nuevamente.</p>
          </div>
        )}

        {/* State 3: Empty Results */}
        {!isLoading && !error && tires.length === 0 && (
          <div className="text-center py-4">
              <p className="text-brand-militar font-bold">No se encontraron resultados.</p>
              <p className="text-brand-gray text-sm">Prueba ajustando los filtros de búsqueda.</p>
          </div>
        )}

        {/* State 4: Success */}
        {!isLoading && !error && tires.length > 0 && (
          tires.map((tire) => (
            <TireCard key={tire.id} {...tire} />
          ))
        )}
      </div>
    </div>
  );
}