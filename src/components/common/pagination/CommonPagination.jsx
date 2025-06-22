import React from 'react';
import {
  HStack,
  Button,
  Text,
  Select,
  Flex,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';

const CommonPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align={{ base: 'center', md: 'center' }}
      spacing={{ base: 4, md: 0 }}
      px={4}
      w="100%"
    >
      <Text 
        fontSize={{ base: 'xs', md: 'sm' }} 
        color="gray.600"
        textAlign={{ base: 'center', md: 'left' }}
        display={{ base: 'none', sm: 'block' }}
      >
        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalPages * pageSize)} of {totalPages * pageSize} entries
      </Text>

      <Stack
        direction={{ base: 'column', sm: 'row' }}
        spacing={4}
        align="center"
        w={{ base: '100%', md: 'auto' }}
      >
        <HStack 
          spacing={2} 
          justify={{ base: 'center', md: 'flex-start' }}
          w={{ base: '100%', sm: 'auto' }}
        >
          <Button
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            variant="outline"
            colorScheme="brand"
            w={{ base: '40%', sm: 'auto' }}
            minW={{ base: 'auto', sm: '80px' }}
            fontSize={{ base: 'xs', md: 'sm' }}
          >
            {isMobile ? 'Prev' : 'Previous'}
          </Button>
          <Text 
            fontSize={{ base: 'xs', md: 'sm' }} 
            color="gray.600"
            whiteSpace="nowrap"
          >
            {isMobile ? `${currentPage}/${totalPages}` : `Page ${currentPage} of ${totalPages}`}
          </Text>
          <Button
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            variant="outline"
            colorScheme="brand"
            w={{ base: '40%', sm: 'auto' }}
            minW={{ base: 'auto', sm: '80px' }}
            fontSize={{ base: 'xs', md: 'sm' }}
          >
            Next
          </Button>
        </HStack>
        
        <HStack 
          spacing={2}
          justify={{ base: 'center', md: 'flex-start' }}
          w={{ base: '100%', sm: 'auto' }}
        >
          <Text 
            fontSize={{ base: 'xs', md: 'sm' }} 
            color="gray.600"
            display={{ base: 'none', sm: 'block' }}
          >
            Show:
          </Text>
          <Select
            size="sm"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            width={{ base: '100%', sm: 'auto' }}
            fontSize={{ base: 'xs', md: 'sm' }}
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </Select>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CommonPagination; 