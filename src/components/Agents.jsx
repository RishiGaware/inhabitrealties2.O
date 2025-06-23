import React from 'react';
import { housesData } from '../data';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Agents = () => {
  // Get unique agents from housesData, assuming one agent per house for simplicity
  const allAgents = housesData.map(house => house.agent);
  const uniqueAgents = Array.from(new Set(allAgents.map(a => a.name)))
    .map(name => {
      return allAgents.find(a => a.name === name);
    })
    .slice(0, 4); // Displaying first 4 unique agents

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Meet Our Expert Agents
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Our dedicated team of professionals is here to help you find your perfect home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {uniqueAgents.map((agent, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="relative">
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-full h-64 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {agent.name}
                </h3>
                <p className="text-sm text-purple-600 font-medium mb-4">
                  Real Estate Agent
                </p>
                <div className="flex justify-center gap-4 text-gray-600">
                  <a href={`tel:${agent.phone}`} className="hover:text-purple-600 transition-colors">
                    <FaPhone />
                  </a>
                  <a href={`mailto:${agent.name.replace(' ', '.').toLowerCase()}@inhabit.com`} className="hover:text-purple-600 transition-colors">
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agents; 