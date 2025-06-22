import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Box, Heading, Flex, Grid, IconButton } from '@chakra-ui/react';
import CommonCard from '../../../components/common/Card/CommonCard';
import FloatingInput from '../../../components/common/floatingInput/FloatingInput';

const PropertyTypes = () => {
  const [propertyTypes, setPropertyTypes] = useState([
    {
      _id: "6816f1f6ba050a75d9b2a072",
      typeName: "HOUSE",
      description: "A type of house which contains 1R, 1RK, 1BHK, 2BHK, 3BHK, 4BHK and more",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop",
      published: true
    },
    {
      _id: "6816f1f6ba050a75d9b2a073",
      typeName: "APARTMENT",
      description: "Modern apartments with all amenities including gym, swimming pool, and security",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
      published: true
    },
    {
      _id: "6816f1f6ba050a75d9b2a074",
      typeName: "VILLA",
      description: "Luxury villas with private gardens, pools and premium finishes",
      imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1000&auto=format&fit=crop",
      published: true
    },
    {
      _id: "6816f1f6ba050a75d9b2a075",
      typeName: "COMMERCIAL",
      description: "Commercial properties including office spaces, shops, and warehouses",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
      published: true
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    typeName: '',
    description: '',
    image: null,
    published: true
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPropertyType = {
      _id: Date.now().toString(),
      typeName: formData.typeName,
      description: formData.description,
      imageUrl: previewImage || 'default-property-type.jpg',
      published: formData.published
    };
    setPropertyTypes([...propertyTypes, newPropertyType]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      typeName: '',
      description: '',
      image: null,
      published: true
    });
    setPreviewImage(null);
  };

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" variant="pageTitle">
          Property Types
        </Heading>
        <IconButton
          icon={<FaPlus />}
          colorScheme="brand"
          onClick={() => setIsModalOpen(true)}
        />
      </Flex>

      {/* Property Types Grid */}
      <Grid 
        templateColumns={{ 
          base: 'repeat(1, 1fr)', 
          sm: 'repeat(2, 1fr)', 
          lg: 'repeat(3, 1fr)', 
          xl: 'repeat(4, 1fr)', 
          '2xl': 'repeat(5, 1fr)' 
        }} 
        gap={4}
      >
        {propertyTypes.map((type) => (
          <CommonCard key={type._id} overflow="hidden">
            <Box h="40" overflow="hidden">
              <img
                src={type.imageUrl}
                alt={type.typeName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
            <Box p={3}>
              <Box fontSize="sm" fontWeight="medium" color="gray.900" mb={1}>
                {type.typeName}
              </Box>
              <Box fontSize="sm" color="gray.600" mb={3}>
                {type.description}
              </Box>
              <Flex justify="end" gap={2}>
                <IconButton
                  icon={<FaEdit />}
                  size="xs"
                  variant="ghost"
                  colorScheme="brand"
                />
                <IconButton
                  icon={<FaTrash />}
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                />
              </Flex>
            </Box>
          </CommonCard>
        ))}
      </Grid>

      {/* Add/Edit Modal */}
      {isModalOpen && (
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
          <Box
            position="relative"
            bg="white"
            borderRadius="lg"
            p={6}
            w="full"
            maxW="md"
            shadow="xl"
          >
            <Box
              as="button"
              position="absolute"
              top={4}
              right={4}
              color="gray.500"
              _hover={{ color: 'gray.700' }}
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              <FaPlus style={{ transform: 'rotate(45deg)' }} size={20} />
            </Box>

            <Box mb={6}>
              <Heading size="md" color="gray.900">
                Add Property Type
              </Heading>
            </Box>
            
            <Box as="form" onSubmit={handleSubmit}>
              <Box mb={4}>
                <FloatingInput
                  type="text"
                  id="typeName"
                  name="typeName"
                  label="Type Name"
                  value={formData.typeName}
                  onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
                  required
                />
              </Box>
              <Box mb={4}>
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
              <Box mb={4}>
                <Box as="label" display="block" color="gray.700" fontSize="sm" fontWeight="medium" mb={2}>
                  Image
                </Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    width: '100%',
                    fontSize: '13px'
                  }}
                />
                {previewImage && (
                  <Box mt={2}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '128px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </Box>
                )}
              </Box>
              <Flex justify="end" gap={2}>
                <Box
                  as="button"
                  type="button"
                  px={4}
                  py={2}
                  color="gray.600"
                  _hover={{ color: 'gray.800' }}
                  fontSize="sm"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Box>
                <Box
                  as="button"
                  type="submit"
                  px={4}
                  py={2}
                  bg="brand.500"
                  color="white"
                  borderRadius="lg"
                  _hover={{ bg: 'brand.600' }}
                  fontSize="sm"
                >
                  Save
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PropertyTypes; 