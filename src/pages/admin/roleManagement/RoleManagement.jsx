import { useState } from 'react';
import {
  Box,
  useDisclosure,
  FormControl,
  VStack,
  HStack,
  Text,
  useToast,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Flex,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, SearchIcon, AddIcon } from '@chakra-ui/icons';
import CommonTable from '../../../components/common/Table/CommonTable';
import CommonPagination from '../../../components/common/pagination/CommonPagination.jsx';
import TableContainer from '../../../components/common/Table/TableContainer';
import FormModal from '../../../components/common/FormModal';
import FloatingInput from '../../../components/common/FloatingInput';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

// Dummy data for roles
const dummyRoles = [
  {
    _id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '2',
    name: 'Property Manager',
    description: 'Manage properties and listings',
    permissions: ['properties.manage', 'listings.manage'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '3',
    name: 'Sales Agent',
    description: 'Handle sales and client interactions',
    permissions: ['leads.manage', 'clients.view'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '2',
    name: 'Property Manager',
    description: 'Manage properties and listings',
    permissions: ['properties.manage', 'listings.manage'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '3',
    name: 'Sales Agent',
    description: 'Handle sales and client interactions',
    permissions: ['leads.manage', 'clients.view'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '2',
    name: 'Property Manager',
    description: 'Manage properties and listings',
    permissions: ['properties.manage', 'listings.manage'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '3',
    name: 'Sales Agent',
    description: 'Handle sales and client interactions',
    permissions: ['leads.manage', 'clients.view'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '2',
    name: 'Property Manager',
    description: 'Manage properties and listings',
    permissions: ['properties.manage', 'listings.manage'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '3',
    name: 'Sales Agent',
    description: 'Handle sales and client interactions',
    permissions: ['leads.manage', 'clients.view'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '2',
    name: 'Property Manager',
    description: 'Manage properties and listings',
    permissions: ['properties.manage', 'listings.manage'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '3',
    name: 'Sales Agent',
    description: 'Handle sales and client interactions',
    permissions: ['leads.manage', 'clients.view'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '2',
    name: 'Property Manager',
    description: 'Manage properties and listings',
    permissions: ['properties.manage', 'listings.manage'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '3',
    name: 'Sales Agent',
    description: 'Handle sales and client interactions',
    permissions: ['leads.manage', 'clients.view'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '2',
    name: 'Property Manager',
    description: 'Manage properties and listings',
    permissions: ['properties.manage', 'listings.manage'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '3',
    name: 'Sales Agent',
    description: 'Handle sales and client interactions',
    permissions: ['leads.manage', 'clients.view'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '2',
    name: 'Property Manager',
    description: 'Manage properties and listings',
    permissions: ['properties.manage', 'listings.manage'],
    createdAt: '2024-03-20',
    status: true,
  },
  {
    _id: '3',
    name: 'Sales Agent',
    description: 'Handle sales and client interactions',
    permissions: ['leads.manage', 'clients.view'],
    createdAt: '2024-03-20',
    status: true,
  },
];

const RoleManagement = () => {
  const [roles, setRoles] = useState(dummyRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoles, setFilteredRoles] = useState(dummyRoles);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [roleToDelete, setRoleToDelete] = useState(null);

  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filtered = roles.filter(role =>
      role.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRoles(filtered);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Role name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddNew = () => {
    setSelectedRole(null);
    setFormData({});
    onOpen();
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions.join(','),
    });
    onOpen();
  };

  const handleDelete = (role) => {
    setRoleToDelete(role);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    console.log('Deleting role:', roleToDelete);
    setRoles(roles.filter((r) => r._id !== roleToDelete._id));
    setFilteredRoles(filteredRoles.filter((r) => r._id !== roleToDelete._id));
    onDeleteClose();
    setRoleToDelete(null);
    toast({
      title: 'Role Deleted',
      description: `Role "${roleToDelete.name}" has been deleted.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const roleData = { ...formData, permissions: formData.permissions.split(',') };

      if (selectedRole) {
        setRoles(
          roles.map(r =>
            r._id === selectedRole._id ? { ...selectedRole, ...roleData } : r
          )
        );
        toast({
          title: 'Role Updated',
          status: 'success',
        });
      } else {
        setRoles([...roles, { ...roleData, _id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0], status: true }]);
        toast({
          title: 'Role Created',
          status: 'success',
        });
      }

      setIsSubmitting(false);
      setSelectedRole(null);
      setFormData({});
    }, 1000);
  };

  const columns = [
    { key: 'name', label: 'Role Name' },
    { key: 'description', label: 'Description' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'createdAt', label: 'Created Date' },
    { key: 'status', label: 'Status', render: (s) => (s ? 'Active' : 'Inactive') },
  ];

  const renderRowActions = (role) => (
    <HStack spacing={2}>
      <IconButton
        aria-label="Edit role"
        icon={<EditIcon />}
        size="sm"
        onClick={() => handleEdit(role)}
        colorScheme="brand"
        variant="outline"
      />
      <IconButton
        aria-label="Delete role"
        icon={<DeleteIcon />}
        size="sm"
        onClick={() => handleDelete(role)}
        colorScheme="red"
        variant="outline"
      />
    </HStack>
  );

  const totalPages = Math.ceil(filteredRoles.length / pageSize);

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" variant="pageTitle">
          Role Management
        </Heading>
        {isMobile ? (
          <IconButton
            aria-label="Add New Role"
            icon={<AddIcon />}
            colorScheme="brand"
            onClick={handleAddNew}
          />
        ) : (
          <Button
            leftIcon={<AddIcon />}
            colorScheme="brand"
            onClick={handleAddNew}
          >
            Add New Role
          </Button>
        )}
      </Flex>

      <Box mb={6} maxW="400px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </Box>

      <TableContainer>
        <CommonTable
          columns={columns}
          data={filteredRoles}
          rowActions={renderRowActions}
          emptyStateMessage="No roles match your search."
        />
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalItems={filteredRoles.length}
        />
      </TableContainer>

      <FormModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectedRole(null);
        }}
        title={selectedRole ? 'Edit Role' : 'Add New Role'}
        onSave={handleFormSubmit}
        isSubmitting={isSubmitting}
      >
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FloatingInput
              id="name"
              name="name"
              label="Role Name"
              value={formData.name || ''}
              onChange={handleInputChange}
              error={errors.name}
            />
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <FloatingInput
              id="description"
              name="description"
              label="Description"
              value={formData.description || ''}
              onChange={handleInputChange}
              error={errors.description}
            />
          </FormControl>
          <FormControl>
            <FloatingInput
              id="permissions"
              name="permissions"
              label="Permissions (comma-separated)"
              value={formData.permissions || ''}
              onChange={handleInputChange}
            />
          </FormControl>
        </VStack>
      </FormModal>

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={confirmDelete}
        title="Delete Role"
        message={`Are you sure you want to delete the role "${roleToDelete?.name}"?`}
      />
    </Box>
  );
};

export default RoleManagement; 