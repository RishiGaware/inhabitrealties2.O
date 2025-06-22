import React from 'react';
import Banner from '../components/Banner';
import Features from '../pages/common/Features';
import AboutUs from '../pages/common/AboutUs';
import HouseList from '../components/Houses/HouseList';
import GetStarted from '../components/GetStarted';
import ImageSlider from '../components/Animations/ImageSlider';

const Home = () => {
  return (
    <div className="bg-white">
      <Banner />
      <Features />
      <HouseList />
      <ImageSlider />
      <AboutUs />
      <GetStarted />
    </div>
  );
};

export default Home;