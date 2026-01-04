import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import StandardButton from '../components/StandardButton'
import SimpleButton from "../components/SimpleButton";
import NavigationBar from "../layouts/NavigationBar";
import PromotionsCarousel from "../layouts/PromotionsCarousel";
import { MOCK_TIRE } from "../mocks/MOCKTIRE";
import ProductStickyFooter from '../layouts/ProductStickyFooter';
import AdditemsControls from '../components/AddItemsControls.jsx';
import GalleryWithThumbnails from '../components/ProductGalleryWithThumbnails.jsx';

const IMAGES = MOCK_TIRE.image_url;

const ProductDetails = ({
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
}) => (
  <div className="bg-brand-base">
    <NavigationBar />
    <div className='lg:hidden'>
      <ProductStickyFooter price={MOCK_TIRE.price} />
    </div>

    <div className=" mx-auto pt-6 flex flex-col place-content-center lg:flex-row gap-1 lg:gap-0 max-w-7xl ">
      <GalleryWithThumbnails 
      className="mx-auto lg:m-0 w-10/12 sm:w-80 lg:w-106 lg:h-full max-w-7xl " 
      IMAGES = {IMAGES} />

      <div className='px-10 '>
        <h3 className="text-3xl font-bold text-gray-900">{MOCK_TIRE.model}</h3>
        <p className="text-2xl text-gray-700 first-letter:uppercase">
          {MOCK_TIRE.brand} <span className="font-bold">{MOCK_TIRE.width}/{MOCK_TIRE.profile} R{MOCK_TIRE.rim_diameter}</span>
        </p>
        <hr className="my-2 h-px border-t-0  bg-brand-dark dark:bg-white" />
        <p className="text-2xl text-gray-900 font-bold mb-4">${MOCK_TIRE.price}</p>
        <p className="text-gray-800 my-4">{MOCK_TIRE.description}</p>

        <div className='hidden lg:block'>
          <AdditemsControls />
        </div>

      </div>
    </div>
  </div>


);

export default ProductDetails;