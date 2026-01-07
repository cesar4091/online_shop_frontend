import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom'; // 1. Importar useParams
import StandardButton from '../components/StandardButton'
import SimpleButton from "../components/SimpleButton";
import NavigationBar from "../layouts/NavigationBar";
import { MOCK_TIRES } from "../mocks/MOCKTIRE";
import ProductStickyFooter from '../layouts/ProductStickyFooter';
import AdditemsControls from '../components/AddItemsControls.jsx';
import GalleryWithThumbnails from '../components/ProductGalleryWithThumbnails.jsx';
import NotFound from './notFound.jsx';

function ProductDetails() {
  const { id } = useParams(); // 2. Usar useParams para obtener el ID del producto de la URL

  const reqID = parseInt(id, 10)
  let product = {};
  MOCK_TIRES.forEach(tire => {
    if (tire.id === reqID) {
      product = tire;
    }
  })
  const MOCK_TIRE = product;
  if (!product) { console.error("Producto no encontrado"); return <NotFound /> }

  const IMAGES = MOCK_TIRE.image_url || [];
  return (
    <div className="bg-brand-base">
      <NavigationBar />
      <div className='lg:hidden'>
        <ProductStickyFooter price={MOCK_TIRE.price} />
      </div>

      <div className=" mx-auto pt-6 flex flex-col place-content-center lg:flex-row gap-1 lg:gap-0 max-w-7xl ">
        <GalleryWithThumbnails
          className="mx-auto lg:m-0 w-10/12 sm:w-80 lg:w-106 lg:h-full"
          IMAGES={IMAGES} />

        <div className='px-10 pb-50  lg:w-2/3'>
          <img className="mx-auto w-30 rounded" src={`../src/assets/logos/${MOCK_TIRE.brand}.svg`} />
          <h3 className="text-center text-3xl font-bold text-gray-900">{MOCK_TIRE.model}</h3>
          <p className="text-center text-2xl text-gray-700">
            <span className="ml-1 font-bold">{MOCK_TIRE.width}/{MOCK_TIRE.profile} R{MOCK_TIRE.rim_diameter}</span>
          </p>
          <hr className="my-2 h-px border-t-0  bg-brand-dark dark:bg-white" />

          <p className="text-2xl text-gray-900 font-bold mb-4">${MOCK_TIRE.price}</p>
          <p className="text-gray-800 my-4">{MOCK_TIRE.description}</p>

          <div className='hidden lg:block'>
            <AdditemsControls />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Especificaciones</h3>
          <p className="text-gray-800"><span className="font-bold">Marca:</span> {MOCK_TIRE.brand}</p>
          <p className="text-gray-800"><span className="font-bold">Índice de carga:</span> {MOCK_TIRE.load_index}</p>
          <p className="text-gray-800"><span className="font-bold">Clasificación de velocidad:</span> {MOCK_TIRE.speed_rating}</p>
          <p className="text-gray-800"><span className="font-bold">Temporada:</span> {MOCK_TIRE.season}</p>
          <p className="text-gray-800"><span className="font-bold">Tipo:</span> {MOCK_TIRE.type}</p>

        </div>
      </div>
    </div>


  );
}

export default ProductDetails;