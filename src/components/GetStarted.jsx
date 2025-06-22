import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
             style={{ fontFamily: "'Inter', sans-serif" }}>
            Join thousands of satisfied customers who found their perfect property with us. 
            Start your journey today and discover the home you've always dreamed of.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => navigate('/login')}
            className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:scale-105"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-800 to-blue-800 group-hover:h-full rounded-full"></span>
            <span className="relative flex items-center text-xl font-semibold">
              Get Started Today
              <FiArrowRight className="ml-3 transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
            </span>
          </button>
          
          <button
            onClick={() => navigate('/register')}
            className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold text-purple-600 transition-all duration-300 ease-in-out rounded-full border-2 border-purple-600 hover:bg-purple-600 hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="relative flex items-center text-xl font-semibold">
              Create Account
            </span>
          </button>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 font-medium tracking-wide uppercase" 
             style={{ fontFamily: "'Inter', sans-serif" }}>
            No commitment required • Free to start
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;