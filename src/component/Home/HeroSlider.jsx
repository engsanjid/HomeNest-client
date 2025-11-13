import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function HeroSlider() {
  return (
    <div className="w-full h-[70vh] rounded-xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        loop={true}
        className="w-full h-full"
      >

        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                Find Your Perfect Home
              </h2>
              <p className="text-gray-200 mt-3 max-w-2xl">
                Discover top-rated properties in your preferred locations.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                Buy • Rent • Invest
              </h2>
              <p className="text-gray-200 mt-3 max-w-2xl">
                Explore a variety of verified property listings.
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1599423300746-b62533397364"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                Find Your Dream Property
              </h2>
              <p className="text-gray-200 mt-3 max-w-2xl">
                Thousands of listings tailored to your needs.
              </p>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
