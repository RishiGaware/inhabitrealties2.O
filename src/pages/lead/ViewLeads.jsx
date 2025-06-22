import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Tag,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CommonTable from '../../components/common/Table/CommonTable';
import FormModal from '../../components/common/FormModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import FloatingInput from '../../components/common/floatingInput/FloatingInput';

const ViewLeads = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);

  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    // Mock data for leads
    const mockLeads = [
      { _id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', status: 'New' },
      { _id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', status: 'Contacted' },
    ];
    setLeads(mockLeads);
  }, []);

  useEffect(() => {
    if (selectedLead) {
      setFormData(selectedLead);
    } else {
      setFormData({ name: '', email: '', phone: '', status: 'New' });
    }
  }, [selectedLead]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (selectedLead) {
      setLeads(leads.map(lead => lead._id === selectedLead._id ? formData : lead));
    } else {
      setLeads([...leads, { ...formData, _id: Date.now().toString() }]);
    }
    onFormClose();
  };

  const handleAddNew = () => {
    setSelectedLead(null);
    onFormOpen();
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    onFormOpen();
  };

  const handleDelete = (lead) => {
    setLeadToDelete(lead);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    setLeads(leads.filter(lead => lead._id !== leadToDelete._id));
    onDeleteClose();
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => <Tag>{status}</Tag>
    },
  ];

  const renderRowActions = (lead) => (
    <HStack spacing={2}>
      <IconButton icon={<FaEdit />} size="sm" variant="outline" colorScheme="brand" onClick={() => handleEdit(lead)} />
      <IconButton icon={<FaTrash />} size="sm" variant="outline" colorScheme="red" onClick={() => handleDelete(lead)} />
    </HStack>
  );

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" variant="pageTitle">
          Lead Management
        </Heading>
        {isMobile ? (
          <IconButton icon={<FaPlus />} colorScheme="brand" onClick={handleAddNew} />
        ) : (
          <Button leftIcon={<FaPlus />} colorScheme="brand" onClick={handleAddNew}>
            Add New Lead
          </Button>
        )}
      </Flex>

      <Box bg="white" p={6} borderRadius="lg" shadow="sm">
        <CommonTable
          columns={columns}
          data={leads}
          rowActions={renderRowActions}
        />
      </Box>

      <FormModal
        isOpen={isFormOpen}
        onClose={onFormClose}
        title={selectedLead ? 'Edit Lead' : 'Add Lead'}
        onSave={handleSave}
      >
        <VStack spacing={4}>
          <FloatingInput name="name" label="Name" value={formData.name || ''} onChange={handleInputChange} />
          <FloatingInput name="email" label="Email" value={formData.email || ''} onChange={handleInputChange} />
          <FloatingInput name="phone" label="Phone" value={formData.phone || ''} onChange={handleInputChange} />
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={formData.status || ''} onChange={handleInputChange}>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </Select>
          </FormControl>
        </VStack>
      </FormModal>

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={confirmDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete the lead for ${leadToDelete?.name}?`}
      />
    </Box>
  );
};

export default ViewLeads; 