import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import loginImage from '../../assets/images/loginImage1.jpg';
import logo from '../../assets/images/logown.png';

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Form section */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center flex-grow">
          <div className="w-full max-w-md mx-auto">
            <img src={logo} alt="Logo" className="w-32 mb-6" />
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800">Create an Account</h1>
            <p className="font-light text-gray-500 mb-8">
              Let's get started with your free account.
            </p>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">Full Name</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
                  <FaUser className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-gray-700"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-gray-700"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
                  <FaLock className="text-gray-400 mr-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-gray-700"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
               <div>
                <label className="block text-md font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
                  <FaLock className="text-gray-400 mr-3" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-gray-700"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                style={{ backgroundColor: 'var(--light-primary)' }}
                className="w-full text-white p-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity mt-8"
              >
                Sign Up
              </button>
            </form>
            <div className="text-center text-gray-500 mt-8">
              Already have an account?
              <Link to="/login" className="font-bold text-purple-600 hover:text-purple-800 ml-2">Sign In</Link>
            </div>
          </div>
        </div>
        {/* Image section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={loginImage}
            alt="Real Estate"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NewRegister; 