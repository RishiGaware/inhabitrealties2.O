import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Box, Heading, Flex, Grid, Button } from '@chakra-ui/react';
import CommonCard from '../../../components/common/Card/CommonCard';
import FloatingInput from '../../../components/common/floatingInput/FloatingInput';

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
    <Box
      position="fixed"
      inset={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={50}
    >
      <Box
        position="fixed"
        inset={0}
        bg="blackAlpha.200"
        backdropFilter="blur(4px)"
      />
      <CommonCard
        position="relative"
        p={6}
        w="full"
        maxW="4xl"
        maxH="90vh"
        overflowY="auto"
        shadow="xl"
      >
        <Button
          position="absolute"
          top={4}
          right={4}
          color="gray.500"
          _hover={{ color: 'gray.700' }}
          variant="ghost"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </Button>

        <Box mb={6}>
          <Heading size="lg" color="gray.900">
            Add Property Details
          </Heading>
        </Box>

        <Box as="form" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={6}>
            <Box>
              <FloatingInput
                type="text"
                id="name"
                name="name"
                label="Property Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Box>
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Choose Type
              </Box>
              <select
                value={formData.propertyTypeId}
                onChange={(e) => setFormData({ ...formData, propertyTypeId: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a202c'
                }}
                required
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.typeName}
                  </option>
                ))}
              </select>
            </Box>
          </Grid>

          {/* Description */}
          <Box mb={6}>
            <FloatingInput
              type="text"
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </Box>

          {/* Address */}
          <Box mb={6}>
            <Heading size="md" color="gray.900" mb={4}>
              Address
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mb={4}>
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
            </Grid>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mb={4}>
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
            </Grid>
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
          </Box>

          {/* Location */}
          <Box mb={6}>
            <Heading size="md" color="gray.900" mb={4}>
              Location
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
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
            </Grid>
          </Box>

          {/* Owner Details */}
          <Box mb={6}>
            <Heading size="md" color="gray.900" mb={4}>
              Owner Details
            </Heading>
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Choose Owner
              </Box>
              <select
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a202c'
                }}
                required
              >
                <option value="">Select Owner</option>
                <option value="owner1">Owner 1</option>
                <option value="owner2">Owner 2</option>
                <option value="owner3">Owner 3</option>
              </select>
            </Box>
          </Box>

          {/* Price and Status */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={6}>
            <FloatingInput
              type="number"
              id="price"
              name="price"
              label="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Property Status
              </Box>
              <select
                value={formData.propertyStatus}
                onChange={(e) => setFormData({ ...formData, propertyStatus: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a202c'
                }}
                required
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Box>
          </Grid>

          {/* Features */}
          <Box mb={6}>
            <Heading size="md" color="gray.900" mb={4}>
              Features
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mb={4}>
              <FloatingInput
                type="number"
                id="bedRooms"
                name="bedRooms"
                label="Bedrooms"
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
                label="Bathrooms"
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
                label="Area (sq ft)"
                value={formData.features.areaInSquarFoot}
                onChange={(e) => setFormData({
                  ...formData,
                  features: { ...formData.features, areaInSquarFoot: e.target.value }
                })}
                required
              />
            </Grid>
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Amenities
              </Box>
              <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={2}>
                {amenitiesOptions.map((amenity) => (
                  <Box key={amenity} display="flex" alignItems="center" gap={2}>
                    <input
                      type="checkbox"
                      id={amenity}
                      checked={formData.features.amenities.includes(amenity)}
                      onChange={(e) => {
                        const newAmenities = e.target.checked
                          ? [...formData.features.amenities, amenity]
                          : formData.features.amenities.filter(a => a !== amenity);
                        setFormData({
                          ...formData,
                          features: { ...formData.features, amenities: newAmenities }
                        });
                      }}
                    />
                    <Box as="label" htmlFor={amenity} fontSize="sm" color="gray.700">
                      {amenity}
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Box>

          {/* Submit Buttons */}
          <Flex justify="end" gap={3}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="brand"
            >
              {initialData ? 'Update Property' : 'Add Property'}
            </Button>
          </Flex>
        </Box>
      </CommonCard>
    </Box>
  );
};

export default PropertyFormPopup; 