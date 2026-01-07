import React, { useState } from 'react';
import StandardButton from '../components/StandardButton.jsx';
import TireCard from '../components/TireCard.jsx';
import { MOCK_TIRES } from '../mocks/MOCKTIRE.js';

export default function TireSearch() {

  const tires= MOCK_TIRES;
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
    <div className="m-0 w-11/12 max-w-4xl mx-auto mt-3 p-3 bg-brand-light rounded-2xl shadow-sm">
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
            className="px-4 py-3 bg-white border-2 border-brand-base rounded-xl focus:border-brand-militar outline-none transition-colors"
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
      </div>
    </div>
  );
}