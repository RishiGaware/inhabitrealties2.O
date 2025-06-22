import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';

const LeadManagement = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/lead/view');
  }, [navigate]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Spinner size="xl" />
    </Box>
  );
};

export default LeadManagement; 