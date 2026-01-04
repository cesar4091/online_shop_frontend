import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function GalleryWithThumbnails({ className, IMAGES=[] }) {
  // Disable watchDrag to prevent manual swiping if you only want clicks to work
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: false
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  // Function to jump to a specific image
  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* 1. MAIN LARGE IMAGE */}
      <div className="relative overflow-hidden rounded-t-2xl border-x border-t border-brand-base" ref={emblaRef}>
        <div className="flex">
          {IMAGES.map((img) => (
            <div key={img.id} className="flex-[0_0_100%] min-w-0 aspect-square relative bg-white">
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
              {/* Brand Logo Overlay */}
              <img
                src="src/assets/logos/neumaniaticos-logo.svg"
                className="absolute top-4 left-4 w-10 opacity-50"
                alt="Logo"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. THUMBNAIL GRID (Matches width of top image) */}
      <div className="grid grid-cols-3 w-full border border-brand-base rounded-b-2xl overflow-hidden">
        {IMAGES.map((img, index) => (
          <button
            key={img.id}
            onClick={() => scrollTo(index)}
            className={`aspect-square relative bg-white border-r last:border-r-0 border-color-brand-base transition-all
              ${selectedIndex === index ? 'opacity-100 ring-2 ring-inset ring-brand-militar z-10' : 'opacity-60 hover:opacity-100'}
            `}
          >
            <img
              src={img.src}
              alt={`Thumbnail ${index}`}
              className="absolute inset-0 w-full h-full object-cover p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}