import React from 'react';
import bannerImage from '../assets/images/houseBanner.jpg';

const Banner = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center ken-burns"
        style={{ backgroundImage: `url(${bannerImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white text-shadow-lg bounce-in">
          Find Your Dream Home Today
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-md md:max-w-3xl mx-auto text-white text-shadow bounce-in" style={{ animationDelay: '0.2s' }}>
          With our extensive listings and expert agents, your next home is just a few clicks away.
        </p>
      </div>
    </div>
  );
};

export default Banner;
