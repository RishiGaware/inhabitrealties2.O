import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Input,
  List,
  ListItem,
  Text,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon, CheckIcon } from '@chakra-ui/icons';

const SearchableSelect = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  label,
  error,
  isRequired = false,
  isDisabled = false,
  maxHeight = '200px',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef(null);
  const popoverRef = useRef(null);

  // Find selected option based on value
  useEffect(() => {
    if (value && options.length > 0) {
      const found = options.find(option => option.value === value);
      setSelectedOption(found || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option.value);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }
  };

  const displayValue = selectedOption ? selectedOption.label : '';

  return (
    <Box position="relative">
      {label && (
        <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
          {label}
          {isRequired && <Text as="span" color="red.500"> *</Text>}
        </Text>
      )}
      
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-start"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button
            ref={popoverRef}
            w="full"
            justifyContent="space-between"
            variant="outline"
            onClick={handleToggle}
            isDisabled={isDisabled}
            borderColor={error ? 'red.300' : 'gray.300'}
            _hover={{ borderColor: error ? 'red.400' : 'gray.400' }}
            _focus={{ borderColor: error ? 'red.500' : 'blue.500', boxShadow: 'outline' }}
          >
            <Text
              color={displayValue ? 'gray.900' : 'gray.500'}
              textAlign="left"
              noOfLines={1}
            >
              {displayValue || placeholder}
            </Text>
            <Icon as={ChevronDownIcon} />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent w="full" maxW="400px">
          <PopoverBody p={0}>
            <VStack spacing={0} maxH={maxHeight} overflowY="auto">
              {/* Search Input */}
              <Box p={3} borderBottom="1px solid" borderColor="gray.200">
                <Input
                  ref={inputRef}
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleInputChange}
                  size="sm"
                  border="none"
                  _focus={{ boxShadow: 'none' }}
                  _placeholder={{ color: 'gray.400' }}
                />
              </Box>
              
              {/* Options List */}
              <List spacing={0} w="full">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <ListItem
                      key={option.value}
                      px={3}
                      py={2}
                      cursor="pointer"
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => handleSelect(option)}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text fontSize="sm">{option.label}</Text>
                      {selectedOption?.value === option.value && (
                        <CheckIcon color="blue.500" boxSize={4} />
                      )}
                    </ListItem>
                  ))
                ) : (
                  <ListItem px={3} py={2}>
                    <Text fontSize="sm" color="gray.500">
                      No options found
                    </Text>
                  </ListItem>
                )}
              </List>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      
      {error && (
        <Text fontSize="xs" color="red.500" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default SearchableSelect; 