import React, { useState } from 'react';
import { Box, Heading, Flex, Button, Tag, Text } from '@chakra-ui/react';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CommonCard from '../../components/common/Card/CommonCard';
import CommonTable from '../../components/common/Table/CommonTable';

const LeadQualification = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      source: 'Website',
      interestedIn: '3BHK Apartment',
      budget: '50-70 Lakhs',
      status: 'New',
      qualificationNotes: ''
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '0987654321',
      source: 'Facebook',
      interestedIn: '2BHK Flat',
      budget: '30-45 Lakhs',
      status: 'Contacted',
      qualificationNotes: 'Interested in 2BHK, budget aligned'
    }
  ]);

  const handleQualify = (leadId, status) => {
    setLeads(leads.map(lead => 
      lead._id === leadId 
        ? { ...lead, status: status === 'qualified' ? 'Qualified' : 'Lost' }
        : lead
    ));
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'source', label: 'Source' },
    { key: 'interestedIn', label: 'Interested In' },
    { key: 'budget', label: 'Budget' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <Tag colorScheme={status === 'Qualified' ? 'green' : status === 'Lost' ? 'red' : 'orange'}>
          {status}
        </Tag>
      )
    }
  ];

  const renderRowActions = (lead) => (
    <Flex gap={2}>
      <Button
        size="sm"
        colorScheme="green"
        leftIcon={<FaCheck />}
        onClick={() => handleQualify(lead._id, 'qualified')}
        isDisabled={lead.status === 'Qualified'}
      >
        Qualify
      </Button>
      <Button
        size="sm"
        colorScheme="red"
        leftIcon={<FaTimes />}
        onClick={() => handleQualify(lead._id, 'lost')}
        isDisabled={lead.status === 'Lost'}
      >
        Reject
      </Button>
    </Flex>
  );

  return (
    <Box p={5}>
      <Flex align="center" mb={6}>
        <Button
          leftIcon={<FaArrowLeft />}
          variant="ghost"
          colorScheme="gray"
          onClick={() => navigate('/lead/view')}
          mr={4}
        >
          Back
        </Button>
        <Heading as="h1" variant="pageTitle">
          Lead Qualification
        </Heading>
      </Flex>

      <CommonCard p={6}>
        <Box mb={4}>
          <Text color="gray.600" fontSize="sm">
            Review and qualify leads based on their information and requirements
          </Text>
        </Box>
        
        <CommonTable
          columns={columns}
          data={leads}
          rowActions={renderRowActions}
        />
      </CommonCard>
    </Box>
  );
};

export default LeadQualification; 