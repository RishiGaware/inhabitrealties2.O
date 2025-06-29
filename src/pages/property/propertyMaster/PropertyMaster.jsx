import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBed, FaBath, FaRuler, FaEye } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { Box, Heading, Flex, Grid, IconButton, useDisclosure } from '@chakra-ui/react';
import PropertyFormPopup from './PropertyFormPopup';
import PropertyPreview from './PropertyPreview';
import CommonCard from '../../../components/common/Card/CommonCard';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import Loader from '../../../components/common/Loader';
import { usePropertyTypeContext } from '../../../context/PropertyTypeContext';
import { 
  fetchProperties, 
  createProperty, 
  editProperty, 
  deleteProperty 
} from '../../../services/propertyService';
import { showSuccessToast, showErrorToast } from '../../../utils/toastUtils';

const PropertyMaster = () => {
  const [selectedType, setSelectedType] = useState('ALL');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApiCallInProgress, setIsApiCallInProgress] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // Get property type context
  const propertyTypeContext = usePropertyTypeContext();
  const { propertyTypes, getAllPropertyTypes, loading: propertyTypesLoading } = propertyTypeContext;

  // Fetch properties on component mount
  useEffect(() => {
    fetchAllProperties();
    getAllPropertyTypes();
  }, [getAllPropertyTypes]);

  const fetchAllProperties = async () => {
    setLoading(true);
    try {
      const response = await fetchProperties();
      console.log('PropertyMaster: Fetch properties response:', response);
      setProperties(response.data || []);
    } catch (error) {
      console.error('PropertyMaster: Fetch properties error:', error);
      showErrorToast('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (propertyData) => {
    if (isApiCallInProgress || isSubmitting) {
      console.log('API call already in progress, ignoring duplicate request');
      return;
    }

    setIsSubmitting(true);
    setIsApiCallInProgress(true);

    try {
      // Format data for backend API
      const formattedData = {
        name: propertyData.name?.trim(),
        propertyTypeId: propertyData.propertyTypeId,
        description: propertyData.description?.trim(),
        propertyAddress: {
          street: propertyData.propertyAddress?.street?.trim(),
          area: propertyData.propertyAddress?.area?.trim(),
          city: propertyData.propertyAddress?.city?.trim(),
          state: propertyData.propertyAddress?.state?.trim(),
          zipOrPinCode: propertyData.propertyAddress?.zipOrPinCode?.trim(),
          country: propertyData.propertyAddress?.country?.trim(),
          location: {
            lat: propertyData.propertyAddress?.location?.lat ? parseFloat(propertyData.propertyAddress.location.lat) : null,
            lng: propertyData.propertyAddress?.location?.lng ? parseFloat(propertyData.propertyAddress.location.lng) : null
          }
        },
        owner: propertyData.owner?.trim(),
        price: propertyData.price ? parseFloat(propertyData.price) : 0,
        propertyStatus: propertyData.propertyStatus,
        features: {
          bedRooms: propertyData.features?.bedRooms ? parseInt(propertyData.features.bedRooms) : 0,
          bathRooms: propertyData.features?.bathRooms ? parseInt(propertyData.features.bathRooms) : 0,
          areaInSquarFoot: propertyData.features?.areaInSquarFoot ? parseFloat(propertyData.features.areaInSquarFoot) : 0,
          amenities: propertyData.features?.amenities || []
        },
        listedDate: propertyData.listedDate || new Date().toISOString(),
        published: propertyData.published !== undefined ? propertyData.published : true
      };

      console.log('PropertyMaster: Sending formatted data to backend:', formattedData);
      const response = await createProperty(formattedData);
      console.log('PropertyMaster: Add property response:', response);
      
      // Add the new property to local state
      const newProperty = {
        ...formattedData,
        _id: response.data?._id || Date.now().toString(),
        images: response.data?.images || ['default-property.jpg'],
        createdAt: response.data?.createdAt || new Date().toISOString(),
      };
      
      setProperties(prevProperties => [...prevProperties, newProperty]);
      setIsModalOpen(false);
      
      const successMessage = response?.message || 'Property added successfully';
      showSuccessToast(successMessage);
    } catch (error) {
      console.error('PropertyMaster: Add property error:', error);
      let errorMessage = 'Failed to add property';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      showErrorToast(errorMessage);
    } finally {
      setIsSubmitting(false);
      setIsApiCallInProgress(false);
    }
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleUpdateProperty = async (updatedData) => {
    if (isApiCallInProgress || isSubmitting) {
      console.log('API call already in progress, ignoring duplicate request');
      return;
    }

    setIsSubmitting(true);
    setIsApiCallInProgress(true);

    try {
      // Format data for backend API
      const formattedData = {
        name: updatedData.name?.trim(),
        propertyTypeId: updatedData.propertyTypeId,
        description: updatedData.description?.trim(),
        propertyAddress: {
          street: updatedData.propertyAddress?.street?.trim(),
          area: updatedData.propertyAddress?.area?.trim(),
          city: updatedData.propertyAddress?.city?.trim(),
          state: updatedData.propertyAddress?.state?.trim(),
          zipOrPinCode: updatedData.propertyAddress?.zipOrPinCode?.trim(),
          country: updatedData.propertyAddress?.country?.trim(),
          location: {
            lat: updatedData.propertyAddress?.location?.lat ? parseFloat(updatedData.propertyAddress.location.lat) : null,
            lng: updatedData.propertyAddress?.location?.lng ? parseFloat(updatedData.propertyAddress.location.lng) : null
          }
        },
        owner: updatedData.owner?.trim(),
        price: updatedData.price ? parseFloat(updatedData.price) : 0,
        propertyStatus: updatedData.propertyStatus,
        features: {
          bedRooms: updatedData.features?.bedRooms ? parseInt(updatedData.features.bedRooms) : 0,
          bathRooms: updatedData.features?.bathRooms ? parseInt(updatedData.features.bathRooms) : 0,
          areaInSquarFoot: updatedData.features?.areaInSquarFoot ? parseFloat(updatedData.features.areaInSquarFoot) : 0,
          amenities: updatedData.features?.amenities || []
        },
        listedDate: updatedData.listedDate || selectedProperty.listedDate,
        published: updatedData.published !== undefined ? updatedData.published : true
      };

      console.log('PropertyMaster: Sending formatted update data to backend:', formattedData);
      const response = await editProperty(selectedProperty._id, formattedData);
      console.log('PropertyMaster: Update property response:', response);
      
      // Update the property in local state
      setProperties(prevProperties => 
        prevProperties.map(property => 
          property._id === selectedProperty._id 
            ? { ...property, ...formattedData, updatedAt: new Date().toISOString() }
            : property
        )
      );
      
      setSelectedProperty(null);
      setIsModalOpen(false);
      
      const successMessage = response?.message || 'Property updated successfully';
      showSuccessToast(successMessage);
    } catch (error) {
      console.error('PropertyMaster: Update property error:', error);
      let errorMessage = 'Failed to update property';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      showErrorToast(errorMessage);
    } finally {
      setIsSubmitting(false);
      setIsApiCallInProgress(false);
    }
  };

  const handleDeleteProperty = (property) => {
    setPropertyToDelete(property);
    onDeleteOpen();
  };

  const confirmDelete = async () => {
    if (propertyToDelete && !isApiCallInProgress) {
      setIsApiCallInProgress(true);
      try {
        const response = await deleteProperty(propertyToDelete._id);
        console.log('PropertyMaster: Delete property response:', response);
        
        // Remove the property from local state
        setProperties(prevProperties => 
          prevProperties.filter(property => property._id !== propertyToDelete._id)
        );
        
        onDeleteClose();
        setPropertyToDelete(null);
        
        const successMessage = response?.message || 'Property deleted successfully';
        showSuccessToast(successMessage);
      } catch (error) {
        console.error('PropertyMaster: Delete property error:', error);
        showErrorToast('Failed to delete property');
      } finally {
        setIsApiCallInProgress(false);
      }
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

  if (loading || propertyTypesLoading) {
    return (
      <Box p={5}>
        <Loader size="xl" />
      </Box>
    );
  }

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
                  href={`https://www.google.com/maps/search/?api=1&query=${property.propertyAddress?.location?.lat},${property.propertyAddress?.location?.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ color: 'brand.500' }}
                  isTruncated
                >
                  {`${property.propertyAddress?.area}, ${property.propertyAddress?.city}`}
                </Box>
              </Flex>
              <Flex justify="space-between" color="gray.600" fontSize="xs" mb={2}>
                <Flex align="center" gap={1}>
                  <FaBed size={10} />
                  <span>{property.features?.bedRooms || 0}</span>
                </Flex>
                <Flex align="center" gap={1}>
                  <FaBath size={10} />
                  <span>{property.features?.bathRooms || 0}</span>
                </Flex>
                <Flex align="center" gap={1}>
                  <FaRuler size={10} />
                  <span>{property.features?.areaInSquarFoot || 0}</span>
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
                  onClick={() => handleDeleteProperty(property)}
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
        isSubmitting={isSubmitting}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={confirmDelete}
        title="Delete Property"
        message={`Are you sure you want to delete the property "${propertyToDelete?.name}"?`}
      />
    </Box>
  );
};

export default PropertyMaster; 