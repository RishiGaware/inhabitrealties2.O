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
  VStack,
} from '@chakra-ui/react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import CommonTable from '../../components/common/Table/CommonTable';
import FormModal from '../../components/common/FormModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import FloatingInput from '../../components/common/floatingInput/FloatingInput';

const CustomerProfiles = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    // Mock data for customers
    const mockCustomers = [
      { _id: '1', name: 'Ravi Patel', email: 'ravi@example.com', phone: '9876543210', registeredOn: '2023-01-15' },
      { _id: '2', name: 'Sneha Shah', email: 'sneha@example.com', phone: '9876543211', registeredOn: '2023-02-20' },
    ];
    setCustomers(mockCustomers);
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      setFormData(selectedCustomer);
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
  }, [selectedCustomer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (selectedCustomer) {
      setCustomers(customers.map(c => c._id === selectedCustomer._id ? formData : c));
    } else {
      setCustomers([...customers, { ...formData, _id: Date.now().toString(), registeredOn: new Date().toISOString().split('T')[0] }]);
    }
    onFormClose();
  };

  const handleAddNew = () => {
    setSelectedCustomer(null);
    onFormOpen();
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    onFormOpen();
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    setCustomers(customers.filter(c => c._id !== customerToDelete._id));
    onDeleteClose();
  };

  const handleViewDetails = (customer) => {
    // This could navigate to a detailed view or open a larger modal
    console.log('Viewing details for:', customer);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'registeredOn', label: 'Registered On' },
  ];

  const renderRowActions = (customer) => (
    <HStack spacing={2}>
      <IconButton icon={<FaEye />} size="sm" onClick={() => handleViewDetails(customer)} />
      <IconButton icon={<FaEdit />} size="sm" variant="outline" colorScheme="brand" onClick={() => handleEdit(customer)} />
      <IconButton icon={<FaTrash />} size="sm" variant="outline" colorScheme="red" onClick={() => handleDelete(customer)} />
    </HStack>
  );

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" variant="pageTitle">
          Customer Management
        </Heading>
        {isMobile ? (
          <IconButton icon={<FaPlus />} colorScheme="brand" onClick={handleAddNew} />
        ) : (
          <Button leftIcon={<FaPlus />} colorScheme="brand" onClick={handleAddNew}>
            Add New Customer
          </Button>
        )}
      </Flex>

      <Box bg="white" p={6} borderRadius="lg" shadow="sm">
        <CommonTable
          columns={columns}
          data={customers}
          rowActions={renderRowActions}
        />
      </Box>

      <FormModal
        isOpen={isFormOpen}
        onClose={onFormClose}
        title={selectedCustomer ? 'Edit Customer' : 'Add Customer'}
        onSave={handleSave}
      >
        <VStack spacing={4}>
          <FloatingInput name="name" label="Name" value={formData.name || ''} onChange={handleInputChange} />
          <FloatingInput name="email" label="Email" value={formData.email || ''} onChange={handleInputChange} />
          <FloatingInput name="phone" label="Phone" value={formData.phone || ''} onChange={handleInputChange} />
        </VStack>
      </FormModal>

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={confirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${customerToDelete?.name}?`}
      />
    </Box>
  );
};

export default CustomerProfiles; 