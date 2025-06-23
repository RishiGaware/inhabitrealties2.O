import React from 'react';
import { PROPERTY_IMAGES } from '../config/images';
import { FaHome, FaShieldAlt, FaChartLine, FaHandshake, FaSearch, FaCalculator } from 'react-icons/fa';

const PropertyFeatures = () => {
  const features = [
    {
      name: "Premium Properties",
      image: PROPERTY_IMAGES.luxuryVilla,
      description: "Discover our curated collection of premium properties featuring luxury amenities, modern designs, and prime locations.",
      features: ["Luxury Amenities", "Prime Locations", "Modern Design"],
      icon: FaHome
    },
    {
      name: "Investment Opportunities",
      image: PROPERTY_IMAGES.modernMinimalist,
      description: "Explore high-return investment properties with detailed market analysis and growth potential insights.",
      features: ["Market Analysis", "Growth Potential", "ROI Tracking"],
      icon: FaChartLine
    },
    {
      name: "Expert Guidance",
      image: PROPERTY_IMAGES.victorianHome,
      description: "Get personalized guidance from our experienced real estate professionals throughout your buying or selling journey.",
      features: ["Personalized Service", "Expert Advice", "Full Support"],
      icon: FaHandshake
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Property Features & Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto"
             style={{ fontFamily: "'Inter', sans-serif" }}>
            Discover what makes our real estate services exceptional and find the perfect property that matches your lifestyle and investment goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <feature.icon className="text-2xl text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {feature.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed"
                   style={{ fontFamily: "'Inter', sans-serif" }}>
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span style={{ fontFamily: "'Inter', sans-serif" }}>{item}</span>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                        style={{ fontFamily: "'Inter', sans-serif" }}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Our Comprehensive Services
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto"
               style={{ fontFamily: "'Inter', sans-serif" }}>
              From property search to closing, we provide end-to-end real estate services to make your journey seamless.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-2xl text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}>Property Search</h4>
              <p className="text-sm text-gray-600"
                 style={{ fontFamily: "'Inter', sans-serif" }}>Advanced search with detailed filters</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaCalculator className="text-2xl text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}>Mortgage Calculator</h4>
              <p className="text-sm text-gray-600"
                 style={{ fontFamily: "'Inter', sans-serif" }}>Calculate payments and affordability</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}>Secure Transactions</h4>
              <p className="text-sm text-gray-600"
                 style={{ fontFamily: "'Inter', sans-serif" }}>Safe and protected property transactions</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-2xl text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}>Expert Support</h4>
              <p className="text-sm text-gray-600"
                 style={{ fontFamily: "'Inter', sans-serif" }}>24/7 customer support and guidance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFeatures; 