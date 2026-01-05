import React, { use } from "react";
import StandardButton from "./StandardButton";
import SimpleButton from "./SimpleButton";
import { Link, useNavigate } from 'react-router-dom';

function TireCard({
  id,
  brand,
  model,
  width,
  profile,
  rim_diameter,
  load_index,
  speed_rating,
  season,
  type,
  description,
  price,
  image_url,
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow hover:border rounded-2xl min-w-90 w-90">
      <div className="relative px-3">
        <p className="absolute rounded w-10 bg-brand-base text-center text-sm text-black ">999</p>
        <img className="absolute right-3 -top-2 mx-auto w-23 rounded" src={`src/assets/logos/${brand}.svg`} />
        <img
          className=" h-48 w-48 mt-5 mx-auto "
          src={image_url[0]}
          alt={`${brand} ${model}`}
        />
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {brand} <span className="font-normal">{model}</span>
          </h2>
          <p className="text-sm text-gray-700 my-2">
            <span className="font-medium">Medidas:</span> {width}/{profile} R{rim_diameter}
          </p>
          <div className="flex flex-wrap gap-2 my-2 text-xs text-gray-500">
            <span className="border rounded px-2 py-0.5 bg-gray-100">Tipo: {type}</span>
            <span className="border rounded px-2 py-0.5 bg-gray-100">Índice de carga: {load_index}</span>
            <span className="border rounded px-2 py-0.5 bg-gray-100">Velocidad: {speed_rating}</span>
            {season && (
              <span className="border rounded px-2 py-0.5 bg-gray-100">Temporada: {season}</span>
            )}
          </div>
          <p className="text-gray-800 h-18 overflow-hidden text-wrap">{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">${price}</span>
          <SimpleButton type="button" onClick={() => navigate(`/productDetails/${id}`)} className="px-4 py-2">
            Comprar
          </SimpleButton>
        </div>
      </div>
    </div>
  );
}

export default TireCard;