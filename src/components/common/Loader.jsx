import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const Loader = ({ size = 'xl', label = 'Loading...' }) => {
  return (
    <Flex justify="center" align="center" direction="column">
      <Spinner
        thickness="3px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.primary"
        size={size}
      />
      {label && (
        <Text mt={4} fontSize="lg" fontWeight="medium" color="brand.dark">
          {label}
        </Text>
      )}
    </Flex>
  );
};

export default Loader; 