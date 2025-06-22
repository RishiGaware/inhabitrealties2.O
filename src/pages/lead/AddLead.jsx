import React, { useState } from 'react';
import { Box, Heading, Text, Button, useToast, VStack } from '@chakra-ui/react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LeadForm from '../../components/leads/LeadForm';

const AddLead = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to create lead
      console.log('Creating new lead:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Lead Created Successfully',
        description: `Lead for ${formData.name} has been added to the system.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Navigate back to lead management
      navigate('/leads');
    } catch (error) {
      console.error('Error creating lead:', error);
      toast({
        title: 'Error Creating Lead',
        description: 'There was an error creating the lead. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/leads');
  };

  return (
    <Box p={6} maxW="4xl" mx="auto">
      {/* Header */}
      <Box mb={6}>
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          colorScheme="gray"
          onClick={handleCancel}
          mb={4}
        >
          Back to Lead Management
        </Button>
        
        <Heading size="lg" mb={2} color="gray.800">
          Add New Lead
        </Heading>
        <Text color="gray.600" fontSize="md">
          Capture prospect information and create a new lead in the system
        </Text>
      </Box>

      {/* Form Container */}
      <Box
        bg="white"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        p={6}
        shadow="sm"
      >
        <VStack spacing={6} align="stretch">
          <LeadForm
            initialData={null}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
          
          {/* Action Buttons */}
          <Box display="flex" justifyContent="flex-end" gap={3} pt={4} borderTop="1px" borderColor="gray.100">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              leftIcon={<FaSave />}
              colorScheme="blue"
              type="submit"
              isLoading={isLoading}
              loadingText="Creating Lead..."
            >
              Create Lead
            </Button>
          </Box>
        </VStack>
      </Box>

      {/* Help Section */}
      <Box mt={6} p={4} bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
        <Heading size="sm" mb={2} color="blue.800">
          Tips for Better Lead Capture
        </Heading>
        <VStack align="start" spacing={2}>
          <Text fontSize="sm" color="blue.700">
            • Ensure all required fields are filled accurately
          </Text>
          <Text fontSize="sm" color="blue.700">
            • Use a valid email address for follow-up communications
          </Text>
          <Text fontSize="sm" color="blue.700">
            • Provide detailed information about their property interests
          </Text>
          <Text fontSize="sm" color="blue.700">
            • Set realistic budget expectations to improve qualification
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddLead; 