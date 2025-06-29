import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaHome, FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaRulerCombined, FaListUl, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { Box, Heading, Flex, Grid, Button, Input, Select, Checkbox, CheckboxGroup, Stack, useToast, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import CommonCard from '../../../components/common/Card/CommonCard';
import FloatingInput from '../../../components/common/floatingInput/FloatingInput';
import { fetchUsers } from '../../../services/usermanagement/userService';
import dayjs from 'dayjs';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker icon issue in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationPicker({ lat, lng, onChange }) {
  const position = [lat || 20.5937, lng || 78.9629]; // Default: India center
  function DraggableMarker() {
    const [markerPos, setMarkerPos] = useState(position);
    useMapEvents({
      click(e) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
        onChange(e.latlng.lat, e.latlng.lng);
      },
    });
    return (
      <Marker
        position={markerPos}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = e.target.getLatLng();
            setMarkerPos([lat, lng]);
            onChange(lat, lng);
          },
        }}
      />
    );
  }
  return (
    <MapContainer
      center={position}
      zoom={lat && lng ? 15 : 5}
      style={{ height: 250, width: '100%', borderRadius: 12, marginTop: 8 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
  );
}

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
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (isOpen && !hasInitialized) {
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
          listedDate: initialData.listedDate || dayjs().format('YYYY-MM-DD'),
          published: initialData.published !== undefined ? initialData.published : true
        });
      } else {
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
          listedDate: dayjs().format('YYYY-MM-DD'),
          published: true
        });
      }
      setErrors({});
      setHasInitialized(true);
    }
  }, [isOpen, initialData, hasInitialized]);

  useEffect(() => {
    if (!isOpen) setHasInitialized(false);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUsersLoading(true);
      setUsersError(null);
      fetchUsers()
        .then((res) => setUsers(res.data || []))
        .catch(() => setUsersError('Failed to load users'))
        .finally(() => setUsersLoading(false));
    }
  }, [isOpen]);

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
      toast({
        title: initialData ? 'Property updated!' : 'Property added!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Please fix the errors in the form.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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

  // Amenities as chips
  const handleAmenityRemove = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        amenities: prev.features.amenities.filter((a) => a !== amenity)
      }
    }));
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
          {/* Section: Basic Info */}
          <Flex align="center" mb={2} gap={2}>
            <FaHome color="#8B5CF6" />
            <Heading size="md" color="gray.900">Basic Information</Heading>
          </Flex>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={6}>
            <FloatingInput
              type="text"
              id="name"
              name="name"
              label="Property Name *"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.name}
            />
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Choose Type *
              </Box>
              <Select
                value={formData.propertyTypeId}
                onChange={(e) => handleInputChange('propertyTypeId', e.target.value)}
                borderColor={errors.propertyTypeId ? 'red.500' : 'gray.200'}
                isDisabled={isSubmitting}
                required
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.typeName}
                  </option>
                ))}
              </Select>
              {errors.propertyTypeId && (
                <Box color="red.500" fontSize="sm" mt={1}>
                  {errors.propertyTypeId}
                </Box>
              )}
            </Box>
          </Grid>
          <FloatingInput
            type="text"
            id="description"
            name="description"
            label="Description *"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
            isDisabled={isSubmitting}
            error={errors.description}
            mb={6}
          />

          {/* Section: Address */}
          <Flex align="center" mb={2} gap={2}>
            <FaMapMarkerAlt color="#8B5CF6" />
            <Heading size="md" color="gray.900">Address</Heading>
          </Flex>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={6}>
            <FloatingInput
              type="text"
              id="street"
              name="street"
              label="Street *"
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
              label="Area *"
              value={formData.propertyAddress.area}
              onChange={(e) => handleAddressChange('area', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.area}
            />
            <FloatingInput
              type="text"
              id="city"
              name="city"
              label="City *"
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
              label="State *"
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
              label="ZIP/PIN Code *"
              value={formData.propertyAddress.zipOrPinCode}
              onChange={(e) => handleAddressChange('zipOrPinCode', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.zipOrPinCode}
            />
            <FloatingInput
              type="text"
              id="country"
              name="country"
              label="Country *"
              value={formData.propertyAddress.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.country}
            />
          </Grid>

          {/* Section: Location */}
          <Flex align="center" mb={2} gap={2}>
            <FaMapMarkerAlt color="#8B5CF6" />
            <Heading size="md" color="gray.900">Location</Heading>
          </Flex>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={6}>
            <FloatingInput
              type="number"
              id="lat"
              name="lat"
              label="Latitude *"
              value={formData.propertyAddress.location.lat}
              onChange={(e) => handleLocationChange('lat', e.target.value)}
              required
              isDisabled={isSubmitting}
            />
            <FloatingInput
              type="number"
              id="lng"
              name="lng"
              label="Longitude *"
              value={formData.propertyAddress.location.lng}
              onChange={(e) => handleLocationChange('lng', e.target.value)}
              required
              isDisabled={isSubmitting}
            />
          </Grid>
          <Box mb={6}>
            <LocationPicker
              lat={parseFloat(formData.propertyAddress.location.lat) || 20.5937}
              lng={parseFloat(formData.propertyAddress.location.lng) || 78.9629}
              onChange={(lat, lng) => {
                handleLocationChange('lat', lat);
                handleLocationChange('lng', lng);
              }}
            />
            <Box fontSize="xs" color="gray.500" mt={1}>
              Drag the marker or click on the map to set the property location.
            </Box>
          </Box>

          {/* Section: Owner */}
          <Flex align="center" mb={2} gap={2}>
            <FaUser color="#8B5CF6" />
            <Heading size="md" color="gray.900">Owner Details</Heading>
          </Flex>
          <Box mb={6}>
            <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
              Choose Owner *
            </Box>
            <Select
              value={formData.owner}
              onChange={(e) => handleInputChange('owner', e.target.value)}
              borderColor={errors.owner ? 'red.500' : 'gray.200'}
              isDisabled={isSubmitting || usersLoading}
              required
              placeholder="Select Owner"
            >
              {usersLoading && <option value="" disabled>Loading users...</option>}
              {usersError && <option value="" disabled>{usersError}</option>}
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </Select>
            {errors.owner && (
              <Box color="red.500" fontSize="sm" mt={1}>
                {errors.owner}
              </Box>
            )}
          </Box>

          {/* Section: Price & Status */}
          <Flex align="center" mb={2} gap={2}>
            <FaRupeeSign color="#8B5CF6" />
            <Heading size="md" color="gray.900">Price & Status</Heading>
          </Flex>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={6}>
            <FloatingInput
              type="number"
              id="price"
              name="price"
              label="Price (INR) *"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.price}
            />
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Choose Status *
              </Box>
              <Select
                value={formData.propertyStatus}
                onChange={(e) => handleInputChange('propertyStatus', e.target.value)}
                borderColor={errors.propertyStatus ? 'red.500' : 'gray.200'}
                isDisabled={isSubmitting}
                required
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
            </Box>
          </Grid>

          {/* Section: Features */}
          <Flex align="center" mb={2} gap={2}>
            <FaListUl color="#8B5CF6" />
            <Heading size="md" color="gray.900">Features</Heading>
          </Flex>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} mb={4}>
            <FloatingInput
              type="number"
              id="bedRooms"
              name="bedRooms"
              label="Bedrooms *"
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
              label="Bathrooms *"
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
              label="Area (sq ft) *"
              value={formData.features.areaInSquarFoot}
              onChange={(e) => handleFeaturesChange('areaInSquarFoot', e.target.value)}
              required
              isDisabled={isSubmitting}
              error={errors.areaInSquarFoot}
            />
          </Grid>
          <Box mb={4}>
            <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
              Amenities
            </Box>
            <CheckboxGroup
              colorScheme="purple"
              value={formData.features.amenities}
              onChange={(values) => handleFeaturesChange('amenities', values)}
            >
              <Stack direction="row" wrap="wrap" spacing={2}>
                {amenitiesOptions.map((amenity) => (
                  <Checkbox key={amenity} value={amenity} isDisabled={isSubmitting}>
                    {amenity}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
            <Flex mt={2} gap={2} wrap="wrap">
              {formData.features.amenities.map((amenity) => (
                <Tag key={amenity} colorScheme="purple" borderRadius="full" px={3} py={1} fontSize="sm">
                  <TagLabel>{amenity}</TagLabel>
                  <TagCloseButton onClick={() => handleAmenityRemove(amenity)} />
                </Tag>
              ))}
            </Flex>
          </Box>

          {/* Section: Listed Date & Published */}
          <Flex align="center" mb={2} gap={2}>
            <FaCalendarAlt color="#8B5CF6" />
            <Heading size="md" color="gray.900">Additional Details</Heading>
          </Flex>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} mb={6}>
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Listed Date *
              </Box>
              <Input
                type="date"
                value={formData.listedDate}
                onChange={(e) => handleInputChange('listedDate', e.target.value)}
                isDisabled={isSubmitting}
                required
                min={dayjs().subtract(50, 'year').format('YYYY-MM-DD')}
                max={dayjs().add(2, 'year').format('YYYY-MM-DD')}
              />
            </Box>
            <Box>
              <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                Published
              </Box>
              <Select
                value={formData.published ? 'true' : 'false'}
                onChange={(e) => handleInputChange('published', e.target.value === 'true')}
                isDisabled={isSubmitting}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </Box>
          </Grid>

          {/* Sticky Submit Bar for Mobile */}
          <Flex
            justify="end"
            gap={3}
            position={{ base: 'sticky', md: 'static' }}
            bottom={0}
            bg={{ base: 'white', md: 'transparent' }}
            py={{ base: 3, md: 0 }}
            zIndex={10}
            borderTop={{ base: '1px solid #eee', md: 'none' }}
            mt={4}
          >
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
              isDisabled={isSubmitting || !validateForm()}
              leftIcon={<FaCheckCircle />}
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