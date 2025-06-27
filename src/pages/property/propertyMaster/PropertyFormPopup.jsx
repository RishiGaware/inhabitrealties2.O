import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Box, Heading, Flex, Grid, Button } from '@chakra-ui/react';
import CommonCard from '../../../components/common/Card/CommonCard';
import FloatingInput from '../../../components/common/floatingInput/FloatingInput';

const PropertyFormPopup = ({ isOpen, onClose, onSubmit, propertyTypes, initialData = null, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});

  // Update form data when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        propertyTypeId: initialData.propertyTypeId || '',
        description: initialData.description || '',
        propertyAddress: {
          street: initialData.propertyAddress?.street || '',
          area: initialData.propertyAddress?.area || '',
          city: initialData.propertyAddress?.city || '',
          state: initialData.propertyAddress?.state || '',
          zipOrPinCode: initialData.propertyAddress?.zipOrPinCode || '',
          country: initialData.propertyAddress?.country || '',
          location: {
            lat: initialData.propertyAddress?.location?.lat || '',
            lng: initialData.propertyAddress?.location?.lng || ''
          }
        },
        owner: initialData.owner || '',
        price: initialData.price || '',
        propertyStatus: initialData.propertyStatus || 'FOR SALE',
        features: {
          bedRooms: initialData.features?.bedRooms || '',
          bathRooms: initialData.features?.bathRooms || '',
          areaInSquarFoot: initialData.features?.areaInSquarFoot || '',
          amenities: initialData.features?.amenities || []
        },
        listedDate: initialData.listedDate || '',
        published: initialData.published !== undefined ? initialData.published : true
      });
    } else {
      // Reset form for new property
      setFormData({
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
    }
    setErrors({}); // Clear errors when form data changes
  }, [initialData, isOpen]);

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

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Property name is required';
    }
    if (!formData.propertyTypeId) {
      newErrors.propertyTypeId = 'Property type is required';
    }
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.propertyAddress?.street?.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!formData.propertyAddress?.area?.trim()) {
      newErrors.area = 'Area is required';
    }
    if (!formData.propertyAddress?.city?.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.propertyAddress?.state?.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.propertyAddress?.zipOrPinCode?.trim()) {
      newErrors.zipOrPinCode = 'ZIP/PIN code is required';
    }
    if (!formData.propertyAddress?.country?.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.owner?.trim()) {
      newErrors.owner = 'Owner is required';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.features?.bedRooms || parseInt(formData.features.bedRooms) < 0) {
      newErrors.bedRooms = 'Valid number of bedrooms is required';
    }
    if (!formData.features?.bathRooms || parseInt(formData.features.bathRooms) < 0) {
      newErrors.bathRooms = 'Valid number of bathrooms is required';
    }
    if (!formData.features?.areaInSquarFoot || parseFloat(formData.features.areaInSquarFoot) <= 0) {
      newErrors.areaInSquarFoot = 'Valid area is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLocationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      propertyAddress: {
        ...prev.propertyAddress,
        location: { ...prev.propertyAddress.location, [field]: value }
      }
    }));
  };

  const handleFeaturesChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      features: { ...prev.features, [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
          isDisabled={isSubmitting}
        >
          <FaTimes size={20} />
        </Button>

        <Box mb={6}>
          <Heading size="lg" color="gray.900">
            {initialData ? 'Edit Property Details' : 'Add Property Details'}
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
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.name}
              />
            </Box>
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Choose Type
              </Box>
              <select
                value={formData.propertyTypeId}
                onChange={(e) => handleInputChange('propertyTypeId', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.propertyTypeId ? '1px solid #e53e3e' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a202c',
                  backgroundColor: isSubmitting ? '#f7fafc' : 'white',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                required
                disabled={isSubmitting}
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.typeName}
                  </option>
                ))}
              </select>
              {errors.propertyTypeId && (
                <Box color="red.500" fontSize="sm" mt={1}>
                  {errors.propertyTypeId}
                </Box>
              )}
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
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.description}
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
                onChange={(e) => handleAddressChange('street', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.street}
              />
              <FloatingInput
                type="text"
                id="area"
                name="area"
                label="Area"
                value={formData.propertyAddress.area}
                onChange={(e) => handleAddressChange('area', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.area}
              />
            </Grid>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mb={4}>
              <FloatingInput
                type="text"
                id="city"
                name="city"
                label="City"
                value={formData.propertyAddress.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.city}
              />
              <FloatingInput
                type="text"
                id="state"
                name="state"
                label="State"
                value={formData.propertyAddress.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.state}
              />
              <FloatingInput
                type="text"
                id="zipOrPinCode"
                name="zipOrPinCode"
                label="ZIP/PIN Code"
                value={formData.propertyAddress.zipOrPinCode}
                onChange={(e) => handleAddressChange('zipOrPinCode', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.zipOrPinCode}
              />
            </Grid>
            <FloatingInput
              type="text"
              id="country"
              name="country"
              label="Country"
              value={formData.propertyAddress.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.country}
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
                onChange={(e) => handleLocationChange('lat', e.target.value)}
                isDisabled={isSubmitting}
              />
              <FloatingInput
                type="number"
                id="longitude"
                name="longitude"
                label="Longitude (optional)"
                value={formData.propertyAddress.location.lng}
                onChange={(e) => handleLocationChange('lng', e.target.value)}
                isDisabled={isSubmitting}
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
                onChange={(e) => handleInputChange('owner', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.owner ? '1px solid #e53e3e' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a202c',
                  backgroundColor: isSubmitting ? '#f7fafc' : 'white',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                required
                disabled={isSubmitting}
              >
                <option value="">Select Owner</option>
                <option value="owner1">Owner 1</option>
                <option value="owner2">Owner 2</option>
                <option value="owner3">Owner 3</option>
              </select>
              {errors.owner && (
                <Box color="red.500" fontSize="sm" mt={1}>
                  {errors.owner}
                </Box>
              )}
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
              onChange={(e) => handleInputChange('price', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.price}
            />
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Property Status
              </Box>
              <select
                value={formData.propertyStatus}
                onChange={(e) => handleInputChange('propertyStatus', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a202c',
                  backgroundColor: isSubmitting ? '#f7fafc' : 'white',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                required
                disabled={isSubmitting}
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
                onChange={(e) => handleFeaturesChange('bedRooms', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.bedRooms}
              />
              <FloatingInput
                type="number"
                id="bathRooms"
                name="bathRooms"
                label="Bathrooms"
                value={formData.features.bathRooms}
                onChange={(e) => handleFeaturesChange('bathRooms', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.bathRooms}
              />
              <FloatingInput
                type="number"
                id="areaInSquarFoot"
                name="areaInSquarFoot"
                label="Area (sq ft)"
                value={formData.features.areaInSquarFoot}
                onChange={(e) => handleFeaturesChange('areaInSquarFoot', e.target.value)}
                required
                isDisabled={isSubmitting}
                error={errors.areaInSquarFoot}
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
                        handleFeaturesChange('amenities', newAmenities);
                      }}
                      disabled={isSubmitting}
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
              isDisabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="brand"
              isLoading={isSubmitting}
              loadingText={initialData ? 'Updating...' : 'Adding...'}
              isDisabled={isSubmitting}
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