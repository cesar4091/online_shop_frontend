import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import StandardButton from './StandardButton'

const PROMOTIONS = [
  { id: 1, src: 'src/assets/promoImages/Promotion1.png', alt: 'Summer Sale 20% Off' },
  { id: 2, src: 'src/assets/promoImages/Promotion2.png', alt: 'Buy 3 Get 1 Free on Tires' },
  { id: 3, src: 'src/assets/promoImages/Promotion3.png', alt: 'Free Alignment with Rim Purchase' },
];

export default function PromotionsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])
  
  // 1. State to track the current slide
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 2. Update the index whenever the carousel settles on a new slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Set initial index
    emblaApi.on('select', onSelect); // Listen for changes
    emblaApi.on('reInit', onSelect); 
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="font-brand-titles text-2xl text-brand-dark mb-4 font-bold uppercase tracking-wide">
        Promociones actuales
      </h2>

      <div className="relative group">
        <div className="overflow-hidden rounded-2xl shadow-xl border border-brand-base" ref={emblaRef}>
          <div className="flex">
            {PROMOTIONS.map((promo) => (
              <div key={promo.id} className="flex-[0_0_100%] min-w-0 relative aspect-18/6 bg-brand-militar">
                <img src={promo.src} alt={promo.alt} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Round Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
          <StandardButton onClick={scrollPrev} className="w-12 h-12 flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xl">‹</span>
          </StandardButton>
          <StandardButton onClick={scrollNext} className="w-12 h-12 flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xl">›</span>
          </StandardButton>
        </div>
      </div>
      
      {/* 3. Dynamic Visual Indicators (Dots) */}
      <div className="flex justify-center gap-2 mt-6">
        {PROMOTIONS.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              index === selectedIndex 
                ? 'w-8 bg-brand-militar' 
                : 'w-2 bg-brand-dark'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}