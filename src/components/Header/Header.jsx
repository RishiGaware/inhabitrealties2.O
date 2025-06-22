import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../assets/images/logo.png';
import logoWhite from '../../assets/images/logown.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
      <img className="h-16 sm:h-30 w-auto" src={isScrolled ? logo : logoWhite} alt="Inhabit Realties" />
      <div className="font-extrabold hidden sm:block">
        {/* <h1 className="text-2xl sm:text-3xl tracking-tighter">INHABIT REALTIES</h1>
        <p className="text-sm sm:text-base font-light tracking-widest -mt-1">
          WE PRESENT YOUR DREAMS
        </p> */}
      </div>
    </Link>
  );

  const NavLinks = ({ inMobileMenu = false }) => (
    <div className={`flex ${inMobileMenu ? 'flex-col space-y-4 p-4' : 'items-center space-x-6'}`}>
      <Link to="/contact" onClick={closeMenu} className="hover:text-purple-600 transition-colors">
        Contact Us
      </Link>
      <button
        onClick={() => {
          closeMenu();
          navigate('/login');
        }}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
      >
        Sign In
      </button>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md text-gray-800' : 'bg-transparent text-white'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Logo />
          <div className="hidden md:flex">
            <NavLinks />
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out rounded-l-2xl text-gray-800 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link to="/" onClick={closeMenu}>
            <img className="h-12 w-auto" src={logo} alt="Inhabit Realties" />
          </Link>
          <button onClick={closeMenu}>
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <NavLinks inMobileMenu />
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;