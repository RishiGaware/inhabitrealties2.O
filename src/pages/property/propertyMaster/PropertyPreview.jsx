import React from 'react';
import { FaTimes, FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const PropertyPreview = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 border border-gray-400 hover:border-gray-600 rounded-md p-1 bg-white hover:bg-gray-50 transition-colors z-10"
        >
          <FaTimes size={16} />
        </button>

        {/* Main Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.images?.[0] || 'default-property.jpg'}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
            {property.propertyStatus}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Header Section */}
          <div className="space-y-1.5">
            <h2 className="text-lg font-medium text-gray-900">{property.name}</h2>
            <div className="flex items-center text-[13px] text-gray-600">
              <FaMapMarkerAlt size={14} className="mr-1.5" />
              <span>{`${property.propertyAddress.street}, ${property.propertyAddress.area}, ${property.propertyAddress.city}, ${property.propertyAddress.state} ${property.propertyAddress.zipOrPinCode}`}</span>
            </div>
            <div className="text-[13px] font-medium text-blue-600">
              {formatPrice(property.price)}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-3 py-3 border-t border-b">
            <div className="flex items-center gap-1.5">
              <FaBed size={14} className="text-blue-600" />
              <span className="text-[13px] text-gray-600">{property.features.bedRooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaBath size={14} className="text-blue-600" />
              <span className="text-[13px] text-gray-600">{property.features.bathRooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaRuler size={14} className="text-blue-600" />
              <span className="text-[13px] text-gray-600">{property.features.areaInSquarFoot} sq.ft</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="text-[13px] font-medium text-gray-900">Description</h3>
            <p className="text-[13px] text-gray-600">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="space-y-1.5">
            <h3 className="text-[13px] font-medium text-gray-900">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
              {property.features.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center text-[13px] text-gray-600">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <h3 className="text-[13px] font-medium text-gray-900 mb-1.5">Property Info</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Listed Date:</span> {property.listedDate && formatDate(property.listedDate)}</p>
                <p><span className="font-medium">Status:</span> {property.propertyStatus}</p>
                <p>
                  <span className="font-medium">Location:</span>{' '}
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${property.propertyAddress.location.lat},${property.propertyAddress.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View on Google Maps
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-2 border-t">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-[13px] font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPreview; 