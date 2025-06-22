import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaRegCommentDots } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We'd love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-md font-medium text-gray-700 mb-2">Your Name</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
                  <FaUser className="text-gray-400 mr-3" />
                  <input type="text" name="name" id="name" placeholder="John Doe" className="w-full bg-transparent border-none outline-none text-gray-700" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-2">Your Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <input type="email" name="email" id="email" placeholder="you@example.com" className="w-full bg-transparent border-none outline-none text-gray-700" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-md font-medium text-gray-700 mb-2">Your Message</label>
                <div className="flex items-start border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
                  <FaRegCommentDots className="text-gray-400 mr-3 mt-1" />
                  <textarea name="message" id="message" rows="6" placeholder="Your Message" className="w-full bg-transparent border-none outline-none text-gray-700 resize-none"></textarea>
                </div>
              </div>
              <div>
                <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center">
                  <FaMapMarkerAlt className="w-5 h-5 mr-3 text-purple-600" />
                  123 Real Estate St, New York, NY 10001
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="w-5 h-5 mr-3 text-purple-600" />
                  support@inhabit.com
                </p>
                <p className="flex items-center">
                  <FaPhone className="w-5 h-5 mr-3 text-purple-600" />
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.220131835108!2d-73.98801558459388!3d40.74844097932824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e192a415a556!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628882 Empire State Building"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 