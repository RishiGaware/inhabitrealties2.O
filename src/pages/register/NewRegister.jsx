import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import registerImg from '../../assets/images/loginImage1.jpg';
import logo from '../../assets/images/logo.png';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

const NewRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    console.log('Registering with:', { name, email, password });
    setError('');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-5xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Left Side - Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center order-2 lg:order-1">
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Inhabit Realties" className="h-14 sm:h-16" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Create Your Account
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              Join us and find your perfect home.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Full Name
                </label>
                <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg p-2.5 sm:p-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300">
                  <FaUser className="text-gray-400 mx-2" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-transparent border-none outline-none text-gray-700 text-sm sm:text-base"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Email Address
                </label>
                <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg p-2.5 sm:p-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300">
                  <FaEnvelope className="text-gray-400 mx-2" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-none outline-none text-gray-700 text-sm sm:text-base"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Password
                </label>
                <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg p-2.5 sm:p-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300">
                  <FaLock className="text-gray-400 mx-2" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-none outline-none text-gray-700 text-sm sm:text-base"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-semibold text-gray-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Confirm Password
                </label>
                <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg p-2.5 sm:p-3 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300">
                  <FaLock className="text-gray-400 mx-2" />
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-none outline-none text-gray-700 text-sm sm:text-base"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs sm:text-sm mt-2 text-center">{error}</p>}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-bold text-base py-3 px-6 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Create Account
                </button>
              </div>
            </form>

            <p className="text-center text-gray-500 mt-8 text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-purple-600 hover:text-purple-800 transition-colors">
                Log In
              </Link>
            </p>

            <div className="mt-4 text-center">
              <Link to="/" className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-purple-700 transition-colors flex items-center justify-center">
                <FiArrowLeft className="mr-1" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Side - Image */}
        <div className="hidden lg:block relative order-1 lg:order-2">
          <img src={registerImg} alt="Modern Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white p-4">
            <h2 className="text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your New Beginning<br/>Starts Here
            </h2>
            <p className="mt-4 text-gray-200 max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
              Exceptional properties for an exceptional life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRegister;