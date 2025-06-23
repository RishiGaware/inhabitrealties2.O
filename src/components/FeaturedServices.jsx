import React from 'react';
import { FaHome, FaSearch, FaHandshake, FaChartLine, FaShieldAlt, FaClock } from 'react-icons/fa';

const FeaturedServices = () => {
  const services = [
    {
      icon: <FaHome className="text-4xl" />,
      title: "Property Management",
      description: "Comprehensive property management services including tenant screening, maintenance, and rent collection.",
      features: ["24/7 Support", "Online Portal", "Maintenance Tracking"]
    },
    {
      icon: <FaSearch className="text-4xl" />,
      title: "Property Search",
      description: "Advanced search tools to help you find the perfect property based on your specific requirements.",
      features: ["Smart Filters", "Saved Searches", "Price Alerts"]
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      title: "Investment Advisory",
      description: "Expert advice on real estate investments with market analysis and portfolio optimization.",
      features: ["Market Analysis", "ROI Projections", "Risk Assessment"]
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Market Insights",
      description: "Real-time market data and trends to help you make informed real estate decisions.",
      features: ["Price Trends", "Market Reports", "Neighborhood Data"]
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Legal Support",
      description: "Professional legal assistance for all your real estate transactions and documentation needs.",
      features: ["Contract Review", "Title Search", "Legal Consultation"]
    },
    {
      icon: <FaClock className="text-4xl" />,
      title: "Quick Transactions",
      description: "Streamlined processes to ensure fast and efficient property transactions.",
      features: ["Digital Signatures", "Online Payments", "Fast Closing"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why Choose Inhabit Realties?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            We provide comprehensive real estate services backed by years of experience and a commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="text-purple-600 mb-6 flex justify-center transform transition-transform duration-300 hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3 animate-pulse"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>
                500+
              </div>
              <div className="text-gray-500 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Properties Sold
              </div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>
                1000+
              </div>
              <div className="text-gray-500 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Happy Clients
              </div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>
                15+
              </div>
              <div className="text-gray-500 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Years Experience
              </div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>
                98%
              </div>
              <div className="text-gray-500 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices; 