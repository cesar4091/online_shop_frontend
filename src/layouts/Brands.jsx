import React from 'react'

function Brands() {
    return (
        <div className='my-10'>
        <p className='text-center text-shadow-sm text-black text-2xl font-brand-titles'>Trabajamos con las mejores marcas:</p>
        <div className='flex w-full justify-center items-center flex-wrap'>
          <img src="/logos/bridgestone.svg" alt="Bridgestone Logo" className="h-12 m-4 rounded inline" />
          <img src="/logos/michelin.svg" alt="Michelin Logo" className="h-12 m-4 rounded inline" />
          <img src="/logos/pirelli.svg" alt="Pirelli Logo" className="h-12 m-4 rounded inline" />
          <img src="/logos/continental.svg" alt="Continental Logo" className="h-12 m-4 rounded inline" />
          <img src="/logos/dunlop.svg" alt="Dunlop Logo" className="h-12 m-4 rounded inline" />
          <img src="/logos/goodyear.svg" alt="Goodyear Logo" className="h-12 m-4 rounded  inline" />
        </div>
      </div>
    );
}

export default Brands;