import React from 'react'
import NavigationBar from './NavigationBar';
import StandardButton from '../components/StandardButton';

function HeroSection() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[url(./assets/tire_track.png)] bg-no-repeat bg-auto bg-bottom-right">
            <section className="py-10 ">
                {/* Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                    {/* Heading: Spans full width */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-black font-semibold text-center text-[clamp(2.5rem,6vw,6rem)] leading-tight font-brand-titles">
                            Find the perfect tires for your car
                        </h3>
                    </div>

                    {/* Left: Button & Subtext */}
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <StandardButton className="w-50">Buy Now</StandardButton>
                        <p className="text-brand-gray text-base sm:text-lg text-center md:text-left max-w-sm ">
                            Discover quality and performance for every journey. Check out our latest offers!
                        </p>
                    </div>
                    {/* Right: Image */}
                    <div className="flex items-center justify-center">
                        <img
                            className="w-full max-w-xs md:max-w-sm aspect-ratio[16/9] object-contain"
                            src="/src/assets/hero_img.png"
                            alt="Tires and luxurious rim"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
export default HeroSection;