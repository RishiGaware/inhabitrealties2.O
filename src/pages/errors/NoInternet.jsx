import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const NoInternet = ({ onRetry }) => (
  <Box textAlign="center" py={20} px={4}>
    <Heading as="h1" size="2xl" mb={4} color="orange.400">No Internet</Heading>
    <Text fontSize="xl" mb={4} fontWeight="bold">No Internet Connection</Text>
    <Text color="gray.500" mb={8}>It looks like you are offline. Please check your network and try again.</Text>
    {onRetry && <Button colorScheme="brand" onClick={onRetry}>Retry</Button>}
  </Box>
);

export default NoInternet; 