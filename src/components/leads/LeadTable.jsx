import React from 'react';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import { EditIcon, ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import CommonTable from '../common/Table/CommonTable';

const LeadTable = ({ leads = [], onView, onEdit, onDelete, isLoading }) => {
  // Table columns configuration
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'source', label: 'Source' },
    { key: 'interestedIn', label: 'Interested In' },
    { 
      key: 'budget', 
      label: 'Budget',
      render: (value) => `₹${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <Text
          color={getStatusColor(value)}
          fontWeight="medium"
          fontSize="sm"
        >
          {value}
        </Text>
      )
    },
    {
      key: 'nextFollowUp',
      label: 'Next Follow-up',
      render: (value) => value ? new Date(value).toLocaleDateString() : '-'
    }
  ];

  // Get status color based on lead status
  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'blue.500';
      case 'Contacted':
        return 'purple.500';
      case 'Qualified':
        return 'green.500';
      case 'Proposal':
        return 'orange.500';
      case 'Negotiation':
        return 'yellow.600';
      case 'Won':
        return 'green.600';
      case 'Lost':
        return 'red.500';
      default:
        return 'gray.500';
    }
  };

  // Row actions
  const renderRowActions = (lead) => (
    <HStack spacing={2}>
      <IconButton
        aria-label="View lead"
        icon={<ViewIcon />}
        size="xs"
        colorScheme="blue"
        variant="outline"
        onClick={() => onView(lead)}
      />
      <IconButton
        aria-label="Edit lead"
        icon={<EditIcon />}
        size="xs"
        colorScheme="brand"
        variant="outline"
        onClick={() => onEdit(lead)}
      />
      {onDelete && (
        <IconButton
          aria-label="Delete lead"
          icon={<DeleteIcon />}
          size="xs"
          colorScheme="red"
          variant="outline"
          onClick={() => onDelete(lead)}
        />
      )}
    </HStack>
  );

  return (
    <CommonTable
      columns={columns}
      data={leads}
      isLoading={isLoading}
      rowActions={renderRowActions}
      emptyStateMessage="No leads found"
    />
  );
};

export default LeadTable; 