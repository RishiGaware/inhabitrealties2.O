import React, { useState } from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CommonCard from '../../components/common/Card/CommonCard';
import FloatingInput from '../../components/common/floatingInput/FloatingInput';

const AddLead = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    interestedIn: '',
    budget: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    navigate('/lead/view');
  };

  return (
    <Box p={5}>
      <Flex align="center" mb={6}>
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          colorScheme="gray"
          onClick={() => navigate('/lead/view')}
          mr={4}
        >
          Back
        </Button>
        <Heading as="h1" variant="pageTitle">
          Add New Lead
        </Heading>
      </Flex>

      <CommonCard p={6}>
        <Box as="form" onSubmit={handleSubmit}>
          <Box mb={6}>
            <Heading size="md" color="gray.900" mb={4}>
              Lead Information
            </Heading>
            <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <FloatingInput
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <FloatingInput
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <FloatingInput
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <FloatingInput
                name="source"
                label="Lead Source"
                value={formData.source}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>

          <Box mb={6}>
            <Heading size="md" color="gray.900" mb={4}>
              Property Interest
            </Heading>
            <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <FloatingInput
                name="interestedIn"
                label="Interested In"
                value={formData.interestedIn}
                onChange={handleInputChange}
                required
              />
              <FloatingInput
                name="budget"
                label="Budget Range"
                value={formData.budget}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>

          <Box mb={6}>
            <Heading size="md" color="gray.900" mb={4}>
              Additional Notes
            </Heading>
            <FloatingInput
              name="notes"
              label="Notes"
              value={formData.notes}
              onChange={handleInputChange}
              as="textarea"
              rows={4}
            />
          </Box>

          <Flex justify="end" gap={3}>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/lead/view')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="brand"
            >
              Add Lead
            </Button>
          </Flex>
        </Box>
      </CommonCard>
    </Box>
  );
};

export default AddLead; 