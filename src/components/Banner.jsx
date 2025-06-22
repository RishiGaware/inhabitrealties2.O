import React from 'react';
import bannerImage from '../assets/images/houseBanner.jpg';

const Banner = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center ken-burns"
        style={{ 
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight bounce-in" 
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif",
                textShadow: '0 4px 12px rgba(0,0,0,0.6)',
                color: '#FFFFFF'
              }}>
            Find Your Dream Home
          </h1>
        </div>
        <div className="mb-8">
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl md:max-w-4xl mx-auto text-gray-100 leading-relaxed bounce-in font-light" 
             style={{ 
               animationDelay: '0.2s',
               fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
               textShadow: '0 2px 6px rgba(0,0,0,0.7)'
             }}>
            Discover exceptional properties with our curated collection of premium real estate listings. 
            Your perfect home awaits.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bounce-in" style={{ animationDelay: '0.4s' }}>
          <button className="px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  style={{ 
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    background: 'linear-gradient(to right, #9333ea, #2563eb)',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
            Explore Properties
          </button>
          <button className="px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    background: 'transparent',
                    cursor: 'pointer'
                  }}>
            Learn More
          </button>
        </div>
        <div className="mt-12 text-center bounce-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-200 font-medium tracking-wide uppercase" 
             style={{ 
               fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
               textShadow: '0 1px 4px rgba(0,0,0,0.8)'
            }}>
            Trusted by 10,000+ families
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
