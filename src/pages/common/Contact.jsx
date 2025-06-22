import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaRegCommentDots, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiArrowLeft, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useOnScreen from '../../hooks/useOnScreen';

const Contact = () => {
  const navigate = useNavigate();
  const [headerRef, isHeaderVisible] = useOnScreen({ threshold: 0.3 });
  const [formRef, isFormVisible] = useOnScreen({ threshold: 0.2 });
  const [infoRef, isInfoVisible] = useOnScreen({ threshold: 0.2 });

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 transition-all duration-700 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Get in Touch
          </h1>
          <p
            className={`mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
              isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We'd love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div
            ref={formRef}
            className={`lg:col-span-2 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl transition-all duration-1000 ${
              isFormVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2
              className="text-3xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Send us a Message
            </h2>
            <p className="text-gray-600 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              Our team will get back to you within 24 hours.
            </p>
            <form action="#" method="POST" className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Your Name</label>
                <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg p-3 focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600 transition-all duration-300">
                  <FaUser className="text-gray-400 mr-4" />
                  <input type="text" name="name" id="name" placeholder="John Doe" className="w-full bg-transparent border-none outline-none text-gray-800 text-lg" style={{ fontFamily: "'Inter', sans-serif" }} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Your Email</label>
                <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-lg p-3 focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600 transition-all duration-300">
                  <FaEnvelope className="text-gray-400 mr-4" />
                  <input type="email" name="email" id="email" placeholder="you@example.com" className="w-full bg-transparent border-none outline-none text-gray-800 text-lg" style={{ fontFamily: "'Inter', sans-serif" }} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Your Message</label>
                <div className="flex items-start bg-gray-50 border-2 border-gray-200 rounded-lg p-3 focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600 transition-all duration-300">
                  <FaRegCommentDots className="text-gray-400 mr-4 mt-1" />
                  <textarea name="message" id="message" rows="5" placeholder="Your Message..." className="w-full bg-transparent border-none outline-none text-gray-800 text-lg resize-none" style={{ fontFamily: "'Inter', sans-serif" }}></textarea>
                </div>
              </div>
              <div>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg py-4 px-6 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Send Message
                </button>
              </div>
            </form>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Follow us on social media</p>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors"><FaTwitter size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors"><FaFacebook size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors"><FaInstagram size={24} /></a>
              </div>
            </div>
          </div>

          {/* Contact Information & Navigation */}
          <div
            ref={infoRef}
            className={`space-y-8 transition-all duration-1000 delay-200 ${
              isInfoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Contact Information</h3>
              <div className="space-y-6 text-gray-700 text-lg">
                <p className="flex items-center">
                  <FaMapMarkerAlt className="w-6 h-6 mr-4 text-purple-600" />
                  <span>123 Real Estate St, New York, NY 10001</span>
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="w-6 h-6 mr-4 text-purple-600" />
                  <span>support@inhabit.com</span>
                </p>
                <p className="flex items-center">
                  <FaPhone className="w-6 h-6 mr-4 text-purple-600" />
                  <span>+1 (555) 123-4567</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Move to</h3>
              <div className="space-y-4">
                <button onClick={() => navigate('/')} className="w-full flex items-center justify-center text-lg font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 py-3 px-4 rounded-xl transition-all duration-300">
                  <FiArrowLeft className="mr-3" /> Go to Home
                </button>
                <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center text-lg font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-3 px-4 rounded-xl transition-all duration-300">
                  <FiLogIn className="mr-3" /> Login
                </button>
                <button onClick={() => navigate('/register')} className="w-full flex items-center justify-center text-lg font-semibold text-green-600 bg-green-50 hover:bg-green-100 py-3 px-4 rounded-xl transition-all duration-300">
                  <FiUserPlus className="mr-3" /> Register
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.220131835108!2d-73.98801558459388!3d40.74844097932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e192a415a556!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628882 Empire State Building"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 