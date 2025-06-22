import React from 'react';
import { FaAward, FaUsers, FaBuilding } from 'react-icons/fa';
import useOnScreen from '../../hooks/useOnScreen';

const stats = [
  { icon: <FaBuilding className="text-4xl text-purple-600" />, value: '1200+', label: 'Premium Properties' },
  { icon: <FaUsers className="text-4xl text-purple-600" />, value: '4500+', label: 'Happy Customers' },
  { icon: <FaAward className="text-4xl text-purple-600" />, value: '240+', label: 'Awards Winning' },
];

const FeatureCard = ({ stat, index }) => {
  const [cardRef, isCardVisible] = useOnScreen({ threshold: 0.2 });
  return (
    <div
      ref={cardRef}
      key={stat.label}
      className={`relative text-center p-6 bg-white rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-2 ${
        isCardVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <dt>
        <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4">
          {stat.icon}
        </div>
        <p className="text-3xl font-bold leading-6 text-gray-900">{stat.value}</p>
      </dt>
      <dd className="mt-2 text-base font-medium text-gray-500">{stat.label}</dd>
    </div>
  );
};

const Features = () => {
  const [headingRef, isVisible] = useOnScreen({ threshold: 0.3 });

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="max-w-2xl mx-auto lg:text-center">
          <h2
            className={`text-base text-purple-600 font-semibold tracking-wide uppercase transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            Why Choose Us
          </h2>
          <p
            className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            Find Real Estate That Suits You.
          </p>
          <p
            className={`mt-4 text-xl text-gray-500 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            Experience a seamless and transparent real estate journey with our dedicated team of experts. We are committed to helping you find the perfect property that meets your needs and exceeds your expectations.
          </p>
        </div>
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {stats.map((stat, index) => (
              <FeatureCard key={stat.label} stat={stat} index={index} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features; 