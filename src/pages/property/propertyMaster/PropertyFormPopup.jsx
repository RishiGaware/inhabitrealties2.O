import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import FloatingInput from '../../../components/common/FloatingInput';

const PropertyFormPopup = ({ isOpen, onClose, onSubmit, propertyTypes, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    propertyTypeId: '',
    description: '',
    propertyAddress: {
      street: '',
      area: '',
      city: '',
      state: '',
      zipOrPinCode: '',
      country: '',
      location: {
        lat: '',
        lng: ''
      }
    },
    owner: '',
    price: '',
    propertyStatus: 'FOR SALE',
    features: {
      bedRooms: '',
      bathRooms: '',
      areaInSquarFoot: '',
      amenities: []
    },
    listedDate: '',
    published: true
  });

  const amenitiesOptions = [
    'Parking',
    'Swimming Pool',
    'Garden',
    'Gym',
    'Security',
    'Balcony',
    'Air Conditioning',
    'Elevator',
    '24/7 Water',
    'Power Backup'
  ];

  const statusOptions = ['FOR SALE', 'FOR RENT', 'SOLD', 'RENTED'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-base"
        >
          <FaTimes size={20} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Property Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FloatingInput
                type="text"
                id="name"
                name="name"
                label="Property Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose Type
              </label>
              <select
                value={formData.propertyTypeId}
                onChange={(e) => setFormData({ ...formData, propertyTypeId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                required
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.typeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <FloatingInput
              type="text"
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput
                type="text"
                id="street"
                name="street"
                label="Street"
                value={formData.propertyAddress.street}
                onChange={(e) => setFormData({
                  ...formData,
                  propertyAddress: { ...formData.propertyAddress, street: e.target.value }
                })}
                required
              />
              <FloatingInput
                type="text"
                id="area"
                name="area"
                label="Area"
                value={formData.propertyAddress.area}
                onChange={(e) => setFormData({
                  ...formData,
                  propertyAddress: { ...formData.propertyAddress, area: e.target.value }
                })}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FloatingInput
                type="text"
                id="city"
                name="city"
                label="City"
                value={formData.propertyAddress.city}
                onChange={(e) => setFormData({
                  ...formData,
                  propertyAddress: { ...formData.propertyAddress, city: e.target.value }
                })}
                required
              />
              <FloatingInput
                type="text"
                id="state"
                name="state"
                label="State"
                value={formData.propertyAddress.state}
                onChange={(e) => setFormData({
                  ...formData,
                  propertyAddress: { ...formData.propertyAddress, state: e.target.value }
                })}
                required
              />
              <FloatingInput
                type="text"
                id="zipOrPinCode"
                name="zipOrPinCode"
                label="ZIP/PIN Code"
                value={formData.propertyAddress.zipOrPinCode}
                onChange={(e) => setFormData({
                  ...formData,
                  propertyAddress: { ...formData.propertyAddress, zipOrPinCode: e.target.value }
                })}
                required
              />
            </div>
            <FloatingInput
              type="text"
              id="country"
              name="country"
              label="Country"
              value={formData.propertyAddress.country}
              onChange={(e) => setFormData({
                ...formData,
                propertyAddress: { ...formData.propertyAddress, country: e.target.value }
              })}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput
                type="number"
                id="latitude"
                name="latitude"
                label="Latitude (optional)"
                value={formData.propertyAddress.location.lat}
                onChange={(e) => setFormData({
                  ...formData,
                  propertyAddress: {
                    ...formData.propertyAddress,
                    location: { ...formData.propertyAddress.location, lat: e.target.value }
                  }
                })}
              />
              <FloatingInput
                type="number"
                id="longitude"
                name="longitude"
                label="Longitude (optional)"
                value={formData.propertyAddress.location.lng}
                onChange={(e) => setFormData({
                  ...formData,
                  propertyAddress: {
                    ...formData.propertyAddress,
                    location: { ...formData.propertyAddress.location, lng: e.target.value }
                  }
                })}
              />
            </div>
          </div>

          {/* Owner Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">Owner Details</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose Owner
              </label>
              <select
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                required
              >
                <option value="">Select Owner</option>
                <option value="owner1">Owner 1</option>
                <option value="owner2">Owner 2</option>
              </select>
            </div>
          </div>

          {/* Price and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Choose Status
              </label>
              <select
                value={formData.propertyStatus}
                onChange={(e) => setFormData({ ...formData, propertyStatus: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Features Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FloatingInput
                type="number"
                id="bedRooms"
                name="bedRooms"
                label="Bedroom Count"
                value={formData.features.bedRooms}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, bedRooms: e.target.value }
                })}
                required
              />
              <FloatingInput
                type="number"
                id="bathRooms"
                name="bathRooms"
                label="Bathroom Count"
                value={formData.features.bathRooms}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, bathRooms: e.target.value }
                })}
                required
              />
              <FloatingInput
                type="number"
                id="areaInSquarFoot"
                name="areaInSquarFoot"
                label="Area (sq.ft)"
                value={formData.features.areaInSquarFoot}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, areaInSquarFoot: e.target.value }
                })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {amenitiesOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.features.amenities.includes(amenity)}
                      onChange={(e) => {
                        const updatedAmenities = e.target.checked
                          ? [...formData.features.amenities, amenity]
                          : formData.features.amenities.filter(a => a !== amenity);
                        setFormData({
                          ...formData,
                          features: { ...formData.features, amenities: updatedAmenities }
                        });
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Listed Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={formData.listedDate}
              onChange={(e) => setFormData({ ...formData, listedDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyFormPopup; 