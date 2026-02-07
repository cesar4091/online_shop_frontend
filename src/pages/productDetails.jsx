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

import { useTireDetails } from '../hooks/useTireDetails.js';

function ProductDetails() {
  const { id } = useParams(); // 2. Usar useParams para obtener el ID del producto de la URL
  const reqID = parseInt(id, 10)

  // 1. Usamos el hook en lugar del MOCK loop
  const { product, isLoading, error } = useTireDetails(reqID);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-base">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark"></div>
      </div>
    );
  }

  // 3. Estado de Error o No Encontrado
  if (error || !product) {
    console.error("Producto no encontrado");
    return (
      <NotFound />
    );
  }

  const IMAGES = product.image_url || [];
  return (
    <div className="bg-brand-base">
      <NavigationBar />
      <div className='lg:hidden'>
        <ProductStickyFooter />
      </div>

      <div className="p-10 mx-auto pt-6 flex flex-col place-content-center lg:flex-row gap-1 lg:gap-0 max-w-7xl ">
        <GalleryWithThumbnails
          className="mx-auto lg:m-0 w-10/12 sm:w-80 lg:w-106 lg:h-full"
          IMAGES={IMAGES} />

        <div className='pl-10 pb-50  lg:w-2/3'>
          <img className="mx-auto w-30 rounded" src={`../src/assets/logos/${product.brand}.svg`} />
          <h3 className="text-center text-3xl font-bold text-gray-900">{product.model}</h3>
          <p className="text-center text-2xl text-gray-700">
            <span className="ml-1 font-bold">{product.width}/{product.profile} R{product.rim_diameter}</span>
          </p>
          <hr className="my-2 h-px border-t-0  bg-brand-dark dark:bg-white" />

          <p className="text-2xl text-gray-900 font-bold mb-4">${product.price}</p>
          <p className="text-gray-800 my-4">{product.description}</p>

          <div className='hidden lg:block'>
            <AdditemsControls />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Especificaciones</h3>
          <p className="text-gray-800"><span className="font-bold">Marca:</span> {product.brand}</p>
          <p className="text-gray-800"><span className="font-bold">Índice de carga:</span> {product.load_index}</p>
          <p className="text-gray-800"><span className="font-bold">Clasificación de velocidad:</span> {product.speed_rating}</p>
          <p className="text-gray-800"><span className="font-bold">Temporada:</span> {product.season}</p>
          <p className="text-gray-800"><span className="font-bold">Tipo:</span> {product.type}</p>

        </div>
      </div>
    </div>


  );
}

export default ProductDetails;