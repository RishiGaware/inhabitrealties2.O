import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBed, FaBath, FaRuler, FaEye } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { Box, Heading, Flex, Grid, IconButton } from '@chakra-ui/react';
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
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" variant="pageTitle">
          Property Master
        </Heading>
        <IconButton 
          icon={<FaPlus />} 
          colorScheme="brand" 
          onClick={() => {
            setSelectedProperty(null);
            setIsModalOpen(true);
          }}
        />
      </Flex>

      {/* Property Types Filter */}
      <Flex gap={2} mb={6} overflowX="auto" pb={2}>
        <CommonCard
          px={4}
          py={2}
          onClick={() => setSelectedType('ALL')}
          _hover={{ borderColor: selectedType === 'ALL' ? 'brand.500' : 'gray.300' }}
          bg={selectedType === 'ALL' ? 'gray.50' : 'white'}
          borderColor={selectedType === 'ALL' ? 'brand.500' : 'gray.200'}
        >
          All Properties
        </CommonCard>
        {propertyTypes.map((type) => (
          <CommonCard
            key={type._id}
            px={4}
            py={2}
            onClick={() => setSelectedType(type.typeName)}
            _hover={{ borderColor: selectedType === type.typeName ? 'brand.500' : 'gray.300' }}
            bg={selectedType === type.typeName ? 'gray.50' : 'white'}
            borderColor={selectedType === type.typeName ? 'brand.500' : 'gray.200'}
          >
            {type.typeName}
          </CommonCard>
        ))}
      </Flex>

      {/* Properties Grid */}
      <Grid 
        templateColumns={{ 
          base: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)', 
          lg: 'repeat(4, 1fr)', 
          xl: 'repeat(5, 1fr)' 
        }} 
        gap={4}
      >
        {filteredProperties.map((property) => (
          <Box
            key={property._id}
            bg="white"
            borderRadius="lg"
            shadow="sm"
            border="1px"
            borderColor="gray.200"
            overflow="hidden"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          >
            <Box 
              h={{ base: '24', md: '32', lg: '36' }} 
              overflow="hidden" 
              cursor="pointer" 
              onClick={() => handlePreview(property)}
            >
              <img
                src={property.images?.[0] || 'default-property.jpg'}
                alt={property.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <Box
                position="absolute"
                top={2}
                right={2}
                bg="brand.500"
                color="white"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="xs"
                fontWeight="medium"
              >
                {property.propertyStatus}
              </Box>
            </Box>
            <Box p={3}>
              <Box
                fontSize="sm"
                fontWeight="medium"
                color="gray.900"
                cursor="pointer"
                onClick={() => handlePreview(property)}
                _hover={{ color: 'brand.500' }}
                mb={1}
              >
                {property.name}
              </Box>
              <Box color="brand.500" fontWeight="medium" fontSize="sm" mb={1}>
                {formatPrice(property.price)}
              </Box>
              <Flex align="center" gap={1} color="gray.600" fontSize="xs" mb={2}>
                <MdLocationOn size={12} />
                <Box
                  as="a"
                  href={`https://www.google.com/maps/search/?api=1&query=${property.propertyAddress.location.lat},${property.propertyAddress.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ color: 'brand.500' }}
                  isTruncated
                >
                  {`${property.propertyAddress.area}, ${property.propertyAddress.city}`}
                </Box>
              </Flex>
              <Flex justify="space-between" color="gray.600" fontSize="xs" mb={2}>
                <Flex align="center" gap={1}>
                  <FaBed size={10} />
                  <span>{property.features.bedRooms}</span>
                </Flex>
                <Flex align="center" gap={1}>
                  <FaBath size={10} />
                  <span>{property.features.bathRooms}</span>
                </Flex>
                <Flex align="center" gap={1}>
                  <FaRuler size={10} />
                  <span>{property.features.areaInSquarFoot}</span>
                </Flex>
              </Flex>
              <Flex justify="end" gap={2}>
                <IconButton
                  icon={<FaEye />}
                  size="xs"
                  variant="ghost"
                  colorScheme="brand"
                  onClick={() => handlePreview(property)}
                />
                <IconButton
                  icon={<FaEdit />}
                  size="xs"
                  variant="ghost"
                  colorScheme="brand"
                  onClick={() => handleEditProperty(property)}
                />
                <IconButton
                  icon={<FaTrash />}
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDeleteProperty(property._id)}
                />
              </Flex>
            </Box>
          </Box>
        ))}
      </Grid>

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
      {selectedProperty && (
        <PropertyPreview 
          isOpen={isPreviewOpen} 
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedProperty(null);
          }}
          property={selectedProperty} 
        />
      )}
    </Box>
  );
};

export default PropertyMaster; 