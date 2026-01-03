import React from "react";

import SimpleButton from "../components/SimpleButton";
import NavigationBar from "../layouts/NavigationBar";
import PromotionsCarousel from "../layouts/PromotionsCarousel";
import { MOCK_TIRE } from "../mocks/MOCKTIRE";

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
    <div className="max-w-7xl mx-auto p-6 lg:p-8 flex flex-col lg:flex-row items-center lg:items-start gap-8">
      <img
        className="w-64 h-64 lg:w-96 lg:h-96 object-contain bg-white p-4 rounded-2xl shadow" 
        src="https://continentaltire.com/sites/default/files/styles/square_medium/public/media/image/2024-08/ct_webpage_premiumcontact6_l3qt_600x600_oe.png?itok=If3EneeJ"
        alt="Llanta de automovil"
        />
        <img className="w-24" src={`src/assets/logos/${MOCK_TIRE.brand}.svg`}  />
        <h3 className="text-3xl font-bold text-gray-900">{MOCK_TIRE.model}</h3>
        <p className="text-gray-700 my-4">
          <span className="font-medium">Medidas:</span> {MOCK_TIRE.width}/{MOCK_TIRE.profile} R{MOCK_TIRE.rim_diameter}
        </p>
    </div>
  </div>
);

export default ProductDetails;