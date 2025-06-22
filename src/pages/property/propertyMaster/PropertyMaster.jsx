import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBed, FaBath, FaRuler, FaEye } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import PropertyFormPopup from './PropertyFormPopup';
import PropertyPreview from './PropertyPreview';

const PropertyMaster = () => {
  const [selectedType, setSelectedType] = useState('ALL');
  const [properties, setProperties] = useState([
    {
      _id: "681773a734a673816a13477a",
      name: "Rishi Villa",
      propertyTypeId: "6816f1f6ba050a75d9b2a072",
      description: "Special property with 4 beds and balcony with commercial swimming pool",
      propertyAddress: {
        street: "Main Street",
        area: "Iscon Cross Road",
        city: "Ahmedabad",
        state: "Gujrat",
        zipOrPinCode: "424106",
        country: "India",
        location: {
          lat: 20.56162307637181,
          lng: 74.8888578784469
        }
      },
      price: 52350000,
      propertyStatus: "FOR SALE",
      features: {
        bedRooms: 4,
        bathRooms: 3,
        areaInSquarFoot: 1200,
        amenities: ["balcony", "swimming pool", "parking area"]
      },
      images: ["https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=1000&auto=format&fit=crop"]
    },
    {
      _id: "681773a734a673816a13477b",
      name: "Luxury Apartment",
      propertyTypeId: "6816f1f6ba050a75d9b2a073",
      description: "Modern apartment with city view and premium amenities",
        propertyAddress: {
        street: "Park Avenue",
        area: "City Center",
        city: "Mumbai",
        state: "Maharashtra",
        zipOrPinCode: "400001",
        country: "India",
        location: {
          lat: 19.0760,
          lng: 72.8777
        }
      },
      price: 75000000,
        propertyStatus: "FOR SALE",
        features: {
          bedRooms: 3,
          bathRooms: 2,
          areaInSquarFoot: 1500,
        amenities: ["gym", "swimming pool", "security"]
      },
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"]
    },
    {
      _id: "681773a734a673816a13477c",
      name: "Commercial Plaza",
      propertyTypeId: "6816f1f6ba050a75d9b2a075",
      description: "Prime commercial property in business district",
      propertyAddress: {
        street: "Business Street",
        area: "CBD",
        city: "Pune",
        state: "Maharashtra",
        zipOrPinCode: "411001",
        country: "India",
        location: {
          lat: 18.5204,
          lng: 73.8567
        }
      },
      price: 150000000,
      propertyStatus: "FOR RENT",
      features: {
        bedRooms: 0,
        bathRooms: 4,
        areaInSquarFoot: 5000,
        amenities: ["parking", "24/7 access", "cafeteria"]
      },
      images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"]
    },
    {
      _id: "681773a734a673816a13477d",
      name: "Modern Villa",
      propertyTypeId: "6816f1f6ba050a75d9b2a074",
      description: "Luxurious villa with private pool and garden",
      propertyAddress: {
        street: "Palm Street",
        area: "Juhu",
        city: "Mumbai",
        state: "Maharashtra",
        zipOrPinCode: "400049",
        country: "India",
        location: {
          lat: 19.1075,
          lng: 72.8263
        }
      },
      price: 180000000,
      propertyStatus: "FOR SALE",
      features: {
        bedRooms: 5,
        bathRooms: 6,
        areaInSquarFoot: 4500,
        amenities: ["private pool", "garden", "security", "smart home"]
      },
      images: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1000&auto=format&fit=crop"]
    },
    {
      _id: "681773a734a673816a13477e",
      name: "City View Apartment",
      propertyTypeId: "6816f1f6ba050a75d9b2a073",
      description: "High-rise apartment with panoramic city views",
      propertyAddress: {
        street: "Skyline Road",
        area: "Bandra West",
        city: "Mumbai",
        state: "Maharashtra",
        zipOrPinCode: "400050",
        country: "India",
        location: {
          lat: 19.0596,
          lng: 72.8295
        }
      },
      price: 95000000,
      propertyStatus: "FOR SALE",
      features: {
        bedRooms: 4,
        bathRooms: 3,
        areaInSquarFoot: 2200,
        amenities: ["gym", "pool", "party hall", "kids play area"]
      },
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"]
    },
    {
      _id: "681773a734a673816a13477f",
      name: "Family House",
      propertyTypeId: "6816f1f6ba050a75d9b2a072",
      description: "Spacious family home in quiet neighborhood",
      propertyAddress: {
        street: "Green Avenue",
        area: "Viman Nagar",
        city: "Pune",
        state: "Maharashtra",
        zipOrPinCode: "411014",
        country: "India",
        location: {
          lat: 18.5679,
          lng: 73.9143
        }
      },
      price: 45000000,
      propertyStatus: "FOR SALE",
      features: {
        bedRooms: 3,
        bathRooms: 3,
        areaInSquarFoot: 1800,
        amenities: ["garden", "parking", "security"]
      },
      images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop"]
    }
  ]);

  const propertyTypes = [
    {
      _id: "6816f1f6ba050a75d9b2a072",
      typeName: "House",
      description: "A type of house which contains 1R, 1RK, 1BHK, 2BHK, 3BHK, 4BHK and more"
    },
    {
      _id: "6816f1f6ba050a75d9b2a073",
      typeName: "Apartment",
      description: "Modern apartments with all amenities"
    },
    {
      _id: "6816f1f6ba050a75d9b2a074",
      typeName: "Villa",
      description: "Luxury villas with premium features"
    },
    {
      _id: "6816f1f6ba050a75d9b2a075",
      typeName: "Commercial",
      description: "Commercial properties and spaces"
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleAddProperty = (propertyData) => {
    const newProperty = {
      _id: Date.now().toString(),
      ...propertyData,
      images: ['default-property.jpg']
    };
    setProperties([...properties, newProperty]);
    setIsModalOpen(false);
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleUpdateProperty = (updatedData) => {
    const updatedProperties = properties.map(property => 
      property._id === selectedProperty._id ? { ...property, ...updatedData } : property
    );
    setProperties(updatedProperties);
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  const handleDeleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(property => property._id !== propertyId));
    }
  };

  const handlePreview = (property) => {
    setSelectedProperty(property);
    setIsPreviewOpen(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const filteredProperties = selectedType === 'ALL' 
    ? properties 
    : properties.filter(property => {
        const type = propertyTypes.find(t => t._id === property.propertyTypeId);
        return type?.typeName === selectedType;
      });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1">
          <h1 className="text-base sm:text-lg font-medium text-gray-900">Properties</h1>
          <span className="text-[11px] sm:text-[13px] text-gray-500 font-medium mt-0.5"></span>
        </div>
        <button
          onClick={() => {
            setSelectedProperty(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 text-[11px] sm:text-[13px]"
        >
          <FaPlus size={10} className="shrink-0" /> 
          <span className="hidden xs:inline">Add Property</span>
          <span className="xs:hidden">Add</span>
        </button>
      </div>

      {/* Property Types Filter */}
      <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedType('ALL')}
          className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all duration-200 bg-white border ${
            selectedType === 'ALL'
              ? 'text-gray-900 font-bold text-[14px] sm:text-[15px] border-gray-400 bg-gray-50 shadow-sm'
              : 'text-gray-500 font-medium text-[11px] sm:text-[13px] hover:text-gray-700 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${selectedType === 'ALL' ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            All Properties
          </div>
        </button>
        {propertyTypes.map((type) => (
          <button
            key={type._id}
            onClick={() => setSelectedType(type.typeName)}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all duration-200 bg-white border ${
              selectedType === type.typeName
                ? 'text-gray-900 font-bold text-[14px] sm:text-[15px] border-gray-400 bg-gray-50 shadow-sm'
                : 'text-gray-500 font-medium text-[11px] sm:text-[13px] hover:text-gray-700 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {type.typeName === 'House' && (
                <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${selectedType === type.typeName ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )}
              {type.typeName === 'Apartment' && (
                <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${selectedType === type.typeName ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
              {type.typeName === 'Villa' && (
                <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${selectedType === type.typeName ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )}
              {type.typeName === 'Commercial' && (
                <svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${selectedType === type.typeName ? 'text-gray-900' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
              {type.typeName}
            </div>
          </button>
        ))}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3">
        {filteredProperties.map((property) => (
          <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <div className="h-24 sm:h-32 md:h-36 overflow-hidden relative cursor-pointer" onClick={() => handlePreview(property)}>
              <img
                src={property.images?.[0] || 'default-property.jpg'}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-blue-600 text-white px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[13px]">
                {property.propertyStatus}
              </div>
            </div>
            <div className="p-1.5 sm:p-2 md:p-3">
              <h3 className="text-[11px] sm:text-[13px] font-medium text-gray-900 cursor-pointer hover:text-blue-600 truncate" 
                  onClick={() => handlePreview(property)}>
                {property.name}
              </h3>
              <p className="text-blue-600 font-medium mt-0.5 text-[11px] sm:text-[13px]">
                {formatPrice(property.price)}
              </p>
              <div className="flex items-center gap-1 text-gray-600 text-[10px] sm:text-[13px] mt-0.5 sm:mt-1">
                <MdLocationOn size={10} className="shrink-0 sm:w-4 sm:h-4" />
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${property.propertyAddress.location.lat},${property.propertyAddress.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate hover:text-blue-600"
                >
                  {`${property.propertyAddress.area}, ${property.propertyAddress.city}`}
                </a>
              </div>
              <div className="flex justify-between mt-1 sm:mt-2 text-gray-600 text-[10px] sm:text-[13px]">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <FaBed size={9} className="shrink-0 sm:w-3.5 sm:h-3.5" />
                  <span>{property.features.bedRooms}</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <FaBath size={9} className="shrink-0 sm:w-3.5 sm:h-3.5" />
                  <span>{property.features.bathRooms}</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <FaRuler size={9} className="shrink-0 sm:w-3.5 sm:h-3.5" />
                  <span>{property.features.areaInSquarFoot}</span>
                </div>
              </div>
              <div className="mt-1 sm:mt-2 flex justify-end gap-1.5 sm:gap-2">
                <button 
                  onClick={() => handlePreview(property)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEye size={11} className="sm:w-3.5 sm:h-3.5" />
                </button>
                <button 
                  onClick={() => handleEditProperty(property)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit size={11} className="sm:w-3.5 sm:h-3.5" />
                </button>
                <button 
                  onClick={() => handleDeleteProperty(property._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={11} className="sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Property Form Popup */}
      <PropertyFormPopup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProperty(null);
        }}
        onSubmit={selectedProperty ? handleUpdateProperty : handleAddProperty}
        propertyTypes={propertyTypes}
        initialData={selectedProperty}
      />

      {/* Property Preview Popup */}
      <PropertyPreview
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedProperty(null);
        }}
        property={selectedProperty}
      />
    </div>
  );
};

export default PropertyMaster; 