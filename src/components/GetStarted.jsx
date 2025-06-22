import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center py-12 bg-white">
      <button
        onClick={() => navigate('/login')}
        className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-white transition-all duration-300 ease-in-out rounded-full bg-purple-600 hover:bg-purple-700"
      >
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out bg-purple-800 group-hover:h-full"></span>
        <span className="relative flex items-center text-2xl">
          Get Started
          <FiArrowRight className="ml-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  );
};

export default GetStarted;