import React from 'react';
import { Box, Grid, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { FaUsers, FaPlus, FaEye, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LeadManagement = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const leadModules = [
    {
      title: 'Add Lead',
      description: 'Create new leads and capture prospect information',
      icon: FaPlus,
      color: 'blue.500',
      path: '/leads/add',
      stats: 'New'
    },
    {
      title: 'View Leads',
      description: 'Browse and manage all leads in the system',
      icon: FaEye,
      color: 'green.500',
      path: '/leads/view',
      stats: 'All Leads'
    },
    {
      title: 'Lead Qualification',
      description: 'Qualify leads and update their status',
      icon: FaCheckCircle,
      color: 'purple.500',
      path: '/leads/qualification',
      stats: 'Qualify'
    },
    {
      title: 'Lead Analytics',
      description: 'View lead performance and conversion metrics',
      icon: FaUsers,
      color: 'orange.500',
      path: '/leads/analytics',
      stats: 'Reports'
    }
  ];

  return (
    <Box p={6}>
      <Box mb={8}>
        <Heading size="lg" mb={2} color="gray.800">
          Lead Management
        </Heading>
        <Text color="gray.600" fontSize="md">
          Manage your leads, track conversions, and optimize your sales pipeline
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
      >
        {leadModules.map((module, index) => {
          const IconComponent = module.icon;
          return (
            <Box
              key={index}
              bg={cardBg}
              p={6}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                borderColor: module.color
              }}
              onClick={() => navigate(module.path)}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={4}
              >
                <Box
                  p={3}
                  borderRadius="full"
                  bg={`${module.color}20`}
                  color={module.color}
                >
                  <IconComponent size={24} />
                </Box>
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  color={module.color}
                  bg={`${module.color}10`}
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {module.stats}
                </Text>
              </Box>
              
              <Heading size="md" mb={2} color="gray.800">
                {module.title}
              </Heading>
              
              <Text color="gray.600" fontSize="sm" lineHeight="1.5">
                {module.description}
              </Text>
            </Box>
          );
        })}
      </Grid>

      {/* Quick Stats Section */}
      <Box mt={8} bg={cardBg} p={6} borderRadius="lg" border="1px" borderColor={borderColor}>
        <Heading size="md" mb={4} color="gray.800">
          Quick Overview
        </Heading>
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
          <Box textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">24</Text>
            <Text fontSize="sm" color="gray.600">New Leads</Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="green.500">156</Text>
            <Text fontSize="sm" color="gray.600">Total Leads</Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="purple.500">12</Text>
            <Text fontSize="sm" color="gray.600">Qualified</Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="orange.500">8</Text>
            <Text fontSize="sm" color="gray.600">Converted</Text>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default LeadManagement; 