import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const GenericError = ({ message = 'Something went wrong.', onRetry }) => (
  <Box textAlign="center" py={20} px={4}>
    <Heading as="h1" size="2xl" mb={4} color="gray.600">Error</Heading>
    <Text fontSize="xl" mb={4} fontWeight="bold">Oops!</Text>
    <Text color="gray.500" mb={8}>{message}</Text>
    {onRetry && <Button colorScheme="brand" onClick={onRetry}>Retry</Button>}
  </Box>
);

export default GenericError; 