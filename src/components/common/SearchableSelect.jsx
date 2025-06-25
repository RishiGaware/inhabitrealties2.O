import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Input,
  List,
  ListItem,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  VStack,
  HStack,
  Icon,
  useOutsideClick,
} from '@chakra-ui/react';
import { ChevronDownIcon, CheckIcon, SearchIcon } from '@chakra-ui/icons';

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
  const containerRef = useRef(null);

  // Find selected option based on value
  useEffect(() => {
    if (value && options.length > 0) {
      const found = options.find(option => option.value === value);
      setSelectedOption(found || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  // Auto-close when clicking outside
  useOutsideClick({
    ref: containerRef,
    handler: () => {
      if (isOpen) {
        setIsOpen(false);
        setSearchTerm('');
      }
    },
  });

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
      } else {
        setSearchTerm('');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const displayValue = selectedOption ? selectedOption.label : '';

  return (
    <Box position="relative" ref={containerRef}>
      {label && (
        <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
          {label}
          {isRequired && <Text as="span" color="red.500"> *</Text>}
        </Text>
      )}
      
      <Popover
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSearchTerm('');
        }}
        placement="bottom-start"
        closeOnBlur={false}
        autoFocus={false}
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
            _hover={{ 
              borderColor: error ? 'red.400' : 'gray.400',
              bg: 'gray.50'
            }}
            _focus={{ 
              borderColor: error ? 'red.500' : 'blue.500', 
              boxShadow: error ? '0 0 0 1px #f56565' : '0 0 0 1px #3182ce',
              bg: 'white'
            }}
            _active={{
              bg: 'gray.100'
            }}
            transition="all 0.2s"
            h="40px"
            fontSize="sm"
          >
            <Text
              color={displayValue ? 'gray.900' : 'gray.500'}
              textAlign="left"
              noOfLines={1}
              fontWeight={displayValue ? 'medium' : 'normal'}
            >
              {displayValue || placeholder}
            </Text>
            <Icon 
              as={ChevronDownIcon} 
              transition="transform 0.2s"
              transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
              color="gray.500"
            />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          w="full" 
          maxW="400px"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          <PopoverBody p={0}>
            <VStack spacing={0} maxH={maxHeight} overflowY="auto">
              {/* Search Input */}
              <Box 
                p={3} 
                borderBottom="1px solid" 
                borderColor="gray.200"
                bg="gray.50"
                position="sticky"
                top={0}
                zIndex={1}
              >
                <HStack spacing={2}>
                  <Icon as={SearchIcon} color="gray.400" boxSize={4} />
                  <Input
                    ref={inputRef}
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    size="sm"
                    border="none"
                    bg="white"
                    _focus={{ 
                      boxShadow: 'none',
                      bg: 'white'
                    }}
                    _placeholder={{ color: 'gray.400' }}
                    fontSize="sm"
                  />
                </HStack>
              </Box>
              
              {/* Options List */}
              <List spacing={0} w="full">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <ListItem
                      key={option.value}
                      px={3}
                      py={2.5}
                      cursor="pointer"
                      _hover={{ 
                        bg: 'blue.50',
                        color: 'blue.700'
                      }}
                      _active={{
                        bg: 'blue.100'
                      }}
                      onClick={() => handleSelect(option)}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      transition="all 0.15s"
                      borderBottom={index < filteredOptions.length - 1 ? "1px solid" : "none"}
                      borderColor="gray.100"
                    >
                      <Text 
                        fontSize="sm" 
                        fontWeight={selectedOption?.value === option.value ? 'medium' : 'normal'}
                        color={selectedOption?.value === option.value ? 'blue.700' : 'inherit'}
                      >
                        {option.label}
                      </Text>
                      {selectedOption?.value === option.value && (
                        <CheckIcon color="blue.500" boxSize={4} />
                      )}
                    </ListItem>
                  ))
                ) : (
                  <ListItem px={3} py={4}>
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      {searchTerm ? 'No options found' : 'No options available'}
                    </Text>
                  </ListItem>
                )}
              </List>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      
      {error && (
        <Text fontSize="xs" color="red.500" mt={1} fontWeight="medium">
          ⚠ {error}
        </Text>
      )}
    </Box>
  );
};

export default SearchableSelect; 