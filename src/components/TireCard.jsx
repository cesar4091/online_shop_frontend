import React from "react";
import StandardButton from "./StandardButton";
import SimpleButton from "./SimpleButton";

const TireCard = ({
  brand,
  model,
  width,
  profile,
  rim_diameter,
  load_index,
  speed_rating,
  season,
  construction,
  type,
  description,
  price,
  image_url,
}) => (
  <div className="bg-white shadow hover:border rounded-2xl md:w-5/12">
    <img
      className=" h-48 w-48 mt-5 mx-auto bg-brand-base"
      src={image_url[0]}
      alt={`${brand} ${model}`}
    />
    <div className="p-3 flex-1 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {brand} <span className="font-normal">{model}</span>
        </h2>
        <p className="text-sm text-gray-700 my-2">
          <span className="font-medium">Medidas:</span> {width}/{profile} R{rim_diameter} {construction}
        </p>
        <div className="flex flex-wrap gap-2 my-2 text-xs text-gray-500">
          <span className="border rounded px-2 py-0.5 bg-gray-100">Tipo: {type}</span>
          <span className="border rounded px-2 py-0.5 bg-gray-100">Índice de carga: {load_index}</span>
          <span className="border rounded px-2 py-0.5 bg-gray-100">Velocidad: {speed_rating}</span>
          {season && (
            <span className="border rounded px-2 py-0.5 bg-gray-100">Temporada: {season}</span>
          )}
        </div>
        <p className="text-gray-800 mb-4 h-16">{description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-green-600">${price}</span>
        <SimpleButton className="px-4 py-2">
          Comprar
        </SimpleButton>
      </div>
    </div>
  </div>
);

export default TireCard;