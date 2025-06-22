import React from 'react';
import bannerImage from '../assets/images/houseBanner.jpg';

const Banner = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center ken-burns"
        style={{ backgroundImage: `url(${bannerImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight bounce-in" 
              style={{ 
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            Find Your Dream Home
          </h1>
        </div>
        <div className="mb-8">
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl md:max-w-4xl mx-auto text-gray-200 leading-relaxed bounce-in font-light" 
             style={{ 
               animationDelay: '0.2s',
               fontFamily: "'Inter', sans-serif",
               textShadow: '0 2px 4px rgba(0,0,0,0.5)'
             }}>
            Discover exceptional properties with our curated collection of premium real estate listings. 
            Your perfect home awaits.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bounce-in" style={{ animationDelay: '0.4s' }}>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
            Explore Properties
          </button>
          <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
            Learn More
          </button>
        </div>
        <div className="mt-12 text-center bounce-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-300 font-medium tracking-wide uppercase" 
             style={{ fontFamily: "'Inter', sans-serif" }}>
            Trusted by 10,000+ families
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
