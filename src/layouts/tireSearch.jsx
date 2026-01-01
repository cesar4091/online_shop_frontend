import React, { useState } from 'react';
import StandardButton from '../components/StandardButton.jsx';
import TireCard from '../components/TireCard.jsx';

export default function TireSearch() {

  const tires=[
    {
        "id": 1,
        "barcode": "3528707222197",
        "brand": "Michelin",
        "model": "Primacy 4",
        "tire_size": "205/55R16",
        "width": 205,
        "profile": 55,
        "rim_diameter": 16,
        "load_index": 91,
        "speed_rating": "V",
        "season": null,
        "vehicle_type": null,
        "construction": "Radial",
        "type": "Tubeless",
        "utqg": "unknown",
        "origin": null,
        "description": "Llantas Michelin Primacy 4 diseñadas para autos compactos y sedanes, excelente agarre en mojado y larga durabilidad.",
        "price": "145.00",
        "discount": "0.00",
        "stock": 10,
        "category_id": null,
        "status": "active",
        "image_url": [
            "https://www.tyrereviews.com/images/tyres/Michelin-Primacy-4.png"
        ],
        "created_at": "2025-11-03T18:57:44.353Z",
        "updated_at": "2025-11-03T18:57:44.353Z"
    },
    {
        "id": 2,
        "barcode": "3286340895213",
        "brand": "Bridgestone",
        "model": "Turanza T005",
        "tire_size": "195/65R15",
        "width": 195,
        "profile": 65,
        "rim_diameter": 15,
        "load_index": 91,
        "speed_rating": "H",
        "season": null,
        "vehicle_type": null,
        "construction": "Radial",
        "type": "Tubeless",
        "utqg": "unknown",
        "origin": null,
        "description": "Turanza T005 ofrece control y seguridad en lluvia, ideal para uso urbano y carretera.",
        "price": "120.00",
        "discount": "0.00",
        "stock": 12,
        "category_id": null,
        "status": "active",
        "image_url": [
            "https://www.tyrereviews.com/images/tyres/Bridgestone-Turanza-T005.png"
        ],
        "created_at": "2025-11-03T18:57:44.353Z",
        "updated_at": "2025-11-03T18:57:44.353Z"
    },
    {
        "id": 3,
        "barcode": "5452000829452",
        "brand": "Goodyear",
        "model": "Assurance TripleMax 2",
        "tire_size": "185/65R15",
        "width": 185,
        "profile": 65,
        "rim_diameter": 15,
        "load_index": 88,
        "speed_rating": "H",
        "season": null,
        "vehicle_type": null,
        "construction": "Radial",
        "type": "Tubeless",
        "utqg": "unknown",
        "origin": null,
        "description": "Goodyear Assurance TripleMax 2 brinda frenado eficiente en mojado y confort en manejo diario.",
        "price": "98.50",
        "discount": "0.00",
        "stock": 8,
        "category_id": null,
        "status": "active",
        "image_url": [
            "https://www.goodyear.com.my/wp-content/uploads/ATM2_45.png"
        ],
        "created_at": "2025-11-03T18:57:44.353Z",
        "updated_at": "2025-11-03T18:57:44.353Z"
    },
    {
        "id": 4,
        "barcode": "8019227224370",
        "brand": "Pirelli",
        "model": "Cinturato P1 Plus",
        "tire_size": "195/60R15",
        "width": 195,
        "profile": 60,
        "rim_diameter": 15,
        "load_index": 88,
        "speed_rating": "V",
        "season": null,
        "vehicle_type": null,
        "construction": "Radial",
        "type": "Tubeless",
        "utqg": "unknown",
        "origin": null,
        "description": "Cinturato P1 Plus, mezcla de rendimiento y confort con bajo consumo de combustible.",
        "price": "110.00",
        "discount": "0.00",
        "stock": 15,
        "category_id": null,
        "status": "active",
        "image_url": [
            "https://images.simpletire.com/images/q_auto/line-images/9162/9162-sidetread/pirelli-cinturato-p1-plus.png"
        ],
        "created_at": "2025-11-03T18:57:44.353Z",
        "updated_at": "2025-11-03T18:57:44.353Z"
    },
    {
        "id": 5,
        "barcode": "4019238053530",
        "brand": "Continental",
        "model": "ContiPremiumContact 6",
        "tire_size": "225/45R17",
        "width": 225,
        "profile": 45,
        "rim_diameter": 17,
        "load_index": 94,
        "speed_rating": "Y",
        "season": null,
        "vehicle_type": null,
        "construction": "Radial",
        "type": "Tubeless",
        "utqg": "unknown",
        "origin": null,
        "description": "ContiPremiumContact 6 combina precisión de manejo con excelente agarre y confort.",
        "price": "175.00",
        "discount": "0.00",
        "stock": 7,
        "category_id": null,
        "status": "active",
        "image_url": [
            "https://continentaltire.com/sites/default/files/styles/square_medium/public/media/image/2024-08/ct_webpage_premiumcontact6_l3qt_600x600_oe.png?itok=If3EneeJ"
        ],
        "created_at": "2025-11-03T18:57:44.353Z",
        "updated_at": "2025-11-03T18:57:44.353Z"
    }
];
  let results = tires;
  const [searchedTires, setSearchedTires] = useState([]);
  const [searchData, setSearchData] = useState({
    width: 0,
    profile: 0,
    rim: 0
  });

  function findTires(searchData){
    const width = parseInt(searchData.width);
    const profile = parseInt(searchData.profile);
    const rim = parseInt(searchData.rim);

    results = tires;
    results = width!=0 ? results.filter((tire) => tire.width === width): results;
    results = profile!=0 ? results.filter((tire) => tire.profile === profile): results;
    results = rim!=0 ? results.filter((tire) => tire.rim_diameter === rim): results;

    setSearchedTires(results);
  }

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchData);
    // Logic to filter or redirect goes here
    findTires(searchData);
  };

  return (
    <div className="w-5/6 max-w-4xl mx-auto mt-3 p-6 bg-brand-light rounded-2xl shadow-sm">
      <h2 className="font-brand-titles) text-3xl text-brand-dark) mb-6 font-bold">
        Find Your Tires
      </h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Width Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-(--color-brand-gray) ml-1">Width</label>
          <select 
            name="width"
            value={searchData.width}
            onChange={handleChange}
            className="bg-white border-2 border-brand-base rounded-xl px-4 py-3 focus:border-brand-militar outline-none transition-colors"
          >
            <option value="0">Select Width</option>
            <option value="195">195</option>
            <option value="205">205</option>
            <option value="225">225</option>
          </select>
        </div>

        {/* Profile Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-(--color-brand-gray) ml-1">Profile</label>
          <select 
            name="profile"
            value={searchData.profile}
            onChange={handleChange}
            className="bg-white border-2 border-brand-base rounded-xl px-4 py-3 focus:border-brand-militar outline-none transition-colors"
          >
            <option value="0">Select Profile</option>
            <option value="45">45</option>
            <option value="55">55</option>
            <option value="65">65</option>
          </select>
        </div>

        {/* Rim Size Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-(--color-brand-gray) ml-1">Rim Size</label>
          <select 
            name="rim"
            value={searchData.rim}
            onChange={handleChange}
            className="bg-white border-2 border-brand-base rounded-xl px-4 py-3 focus:border-brand-militar outline-none transition-colors"
          >
            <option value="0">Select Rim</option>
            <option value="15">R15</option>
            <option value="17">R17</option>
            <option value="19">R19</option>
          </select>
        </div>

        {/* Search Button */}
        <StandardButton type="submit" className="w-full">
          Search Tires
        </StandardButton>
      </form>

      <div className='flex flex-wrap gap-3 justify-center pt-5'>
        { searchedTires.map((tire) => ( <TireCard key={tire.id} {...tire} /> )) }
        {    console.log(searchedTires)}
      </div>
    </div>
  );
}