import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const ServerError = ({ onRetry }) => (
  <Box textAlign="center" py={20} px={4}>
    <Heading as="h1" size="2xl" mb={4} color="red.500">500</Heading>
    <Text fontSize="xl" mb={4} fontWeight="bold">Server Error</Text>
    <Text color="gray.500" mb={8}>Sorry, our server is currently unavailable. Please try again later.</Text>
    {onRetry && <Button colorScheme="brand" onClick={onRetry}>Retry</Button>}
  </Box>
);

export default ServerError; 