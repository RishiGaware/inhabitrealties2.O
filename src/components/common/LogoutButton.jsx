import React from 'react';
import {
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { FaSignOutAlt, FaExclamationTriangle, FaTimes, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const LogoutButton = ({ variant = 'ghost', size = 'md', ...props }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Show success message
    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Close the dialog
    onClose();
    
    // Navigate to login page
    navigate('/login');
  };

  return (
    <>
      <Button
        leftIcon={<FaSignOutAlt />}
        onClick={onOpen}
        variant={variant}
        size={size}
        colorScheme="red"
        _hover={{
          bg: 'red.50',
          color: 'red.600',
          transform: 'translateY(-1px)',
          boxShadow: 'lg',
        }}
        transition="all 0.2s"
        {...props}
      >
        Logout
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
        />
        <AlertDialogContent
          mx={4}
          bg="white"
          borderRadius="2xl"
          boxShadow="2xl"
          border="1px"
          borderColor="gray.100"
          overflow="hidden"
          _dark={{
            bg: 'gray.800',
            borderColor: 'gray.700',
          }}
          maxW="500px"
        >
          {/* Modern Header */}
          <Box
            bgGradient="linear(135deg, purple.500 0%, blue.600 100%)"
            p={8}
            position="relative"
            overflow="hidden"
          >
            {/* Decorative Elements */}
            <Box
              position="absolute"
              top="-20px"
              right="-20px"
              w="100px"
              h="100px"
              bg="white"
              opacity="0.1"
              borderRadius="full"
            />
            <Box
              position="absolute"
              bottom="-30px"
              left="-30px"
              w="80px"
              h="80px"
              bg="white"
              opacity="0.05"
              borderRadius="full"
            />
            
            <VStack spacing={4} align="center" position="relative" zIndex={1}>
              <Box
                p={4}
                bg="white"
                borderRadius="full"
                boxShadow="xl"
                mb={2}
              >
                <Icon as={FaShieldAlt} color="purple.500" boxSize={8} />
              </Box>
              <VStack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold" color="white" textAlign="center">
                  Secure Logout
                </Text>
                <Text color="purple.100" fontSize="md" textAlign="center">
                  Protect your account and data
                </Text>
              </VStack>
            </VStack>
          </Box>

          <AlertDialogBody p={8}>
            <VStack spacing={6} align="start">
              <Box
                p={4}
                bg="blue.50"
                borderRadius="xl"
                border="1px"
                borderColor="blue.200"
                w="full"
                _dark={{
                  bg: 'blue.900',
                  borderColor: 'blue.700',
                }}
              >
                <HStack spacing={3}>
                  <Box
                    p={2}
                    bg="blue.100"
                    borderRadius="full"
                    _dark={{ bg: 'blue.800' }}
                  >
                    <Icon as={FaExclamationTriangle} color="blue.600" boxSize={4} />
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="md" fontWeight="semibold" color="blue.800" _dark={{ color: 'blue.200' }}>
                      Session Security
                    </Text>
                    <Text fontSize="sm" color="blue.700" _dark={{ color: 'blue.300' }}>
                      Your current session will be securely terminated and all data will be cleared from this device.
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              <VStack spacing={3} align="start" w="full">
                <Text fontSize="lg" fontWeight="semibold" color="gray.800" _dark={{ color: 'white' }}>
                  What happens when you logout?
                </Text>
                <VStack spacing={2} align="start" w="full">
                  <HStack spacing={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                      All active sessions will be terminated
                    </Text>
                  </HStack>
                  <HStack spacing={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                      Local data will be securely cleared
                    </Text>
                  </HStack>
                  <HStack spacing={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                      You'll need to log in again to access your account
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </AlertDialogBody>

          <Divider />

          <AlertDialogFooter p={6}>
            <HStack spacing={4} w="full">
              <Button
                ref={cancelRef}
                onClick={onClose}
                variant="outline"
                flex={1}
                leftIcon={<FaTimes />}
                size="lg"
                borderRadius="xl"
                _hover={{
                  bg: 'gray.50',
                  transform: 'translateY(-1px)',
                  boxShadow: 'md',
                }}
                transition="all 0.2s"
              >
                Stay Logged In
              </Button>
              <Button
                colorScheme="purple"
                onClick={handleLogout}
                flex={1}
                leftIcon={<FaSignOutAlt />}
                size="lg"
                borderRadius="xl"
                bgGradient="linear(135deg, purple.500 0%, blue.600 100%)"
                _hover={{
                  bgGradient: "linear(135deg, purple.600 0%, blue.700 100%)",
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.2s"
              >
                Logout Securely
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LogoutButton; 