import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ variant = 'ghost', size = 'md', ...props }) => {
  const navigate = useNavigate();
  const toast = useToast();

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
    
    // Navigate to login page
    navigate('/login');
  };

  return (
    <Button
      leftIcon={<FaSignOutAlt />}
      onClick={handleLogout}
      variant={variant}
      size={size}
      colorScheme="red"
      {...props}
    >
      Logout
    </Button>
  );
};

export default LogoutButton; 