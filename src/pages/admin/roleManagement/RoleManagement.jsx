import { useState } from 'react';
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  VStack,
  HStack,
  Text,
  useToast,
  IconButton,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, SearchIcon, AddIcon } from '@chakra-ui/icons';
import CommonTable from '../../../components/common/Table/CommonTable';
import CommonPagination from '../../../components/common/pagination/CommonPagination.jsx';
import TableContainer from '../../../components/common/Table/TableContainer';
import FloatingInput from '../../../components/common/FloatingInput';
import CommonButton from '../../../components/common/Button/CommonButton';

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
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
    status: true,
  });

  const toast = useToast();

  // Modal controls
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // Filter roles based on search
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / pageSize);
  const paginatedRoles = filteredRoles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Role name is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    return errors;
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      status: role.status,
    });
    setIsEditing(true);
    setFormErrors({});
    onFormOpen();
  };

  const handleDelete = (role) => {
    setSelectedRole(role);
    onDeleteOpen();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    const roleData = {
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (isEditing) {
      setRoles(roles.map(role =>
        role._id === selectedRole._id ? { ...role, ...roleData } : role
      ));
      toast({
        title: 'Role updated',
        status: 'success',
        duration: 3000,
      });
    } else {
      const newRole = {
        _id: Date.now().toString(),
        ...roleData,
      };
      setRoles([...roles, newRole]);
      toast({
        title: 'Role created',
        status: 'success',
        duration: 3000,
      });
    }

    setIsLoading(false);
    onFormClose();
    setSelectedRole(null);
    setIsEditing(false);
    setFormErrors({});
    setFormData({
      name: '',
      description: '',
      permissions: [],
      status: true,
    });
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    setRoles(roles.filter(role => role._id !== selectedRole._id));
    toast({
      title: 'Role deleted',
      status: 'success',
      duration: 3000,
    });
    setIsLoading(false);
    onDeleteClose();
    setSelectedRole(null);
  };

  // Table columns configuration
  const columns = [
    { key: 'name', label: 'Role Name' },
    { key: 'description', label: 'Description' },
    { 
      key: 'permissions', 
      label: 'Permissions',
      render: (permissions) => permissions.join(', ')
    },
    { key: 'createdAt', label: 'Created Date' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <Text
          color={value ? 'light.success' : 'light.danger'}
          fontWeight="medium"
          fontSize="sm"
        >
          {value ? 'Active' : 'Inactive'}
        </Text>
      )
    },
  ];

  // Row actions
  const renderRowActions = (role) => (
    <HStack spacing={2}>
      <IconButton
        aria-label="Edit role"
        icon={<EditIcon />}
        size="xs"
        colorScheme="brand"
        variant="outline"
        onClick={() => handleEdit(role)}
      />
      <IconButton
        aria-label="Delete role"
        icon={<DeleteIcon />}
        size="xs"
        colorScheme="red"
        variant="outline"
        onClick={() => handleDelete(role)}
      />
    </HStack>
  );

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text variant="pageTitle">
          Role Management
        </Text>
        <CommonButton
          leftIcon={<AddIcon />}
          onClick={() => {
            setSelectedRole(null);
            setIsEditing(false);
            setFormErrors({});
            setFormData({
              name: '',
              description: '',
              permissions: [],
              status: true,
            });
            onFormOpen();
          }}
        >
          Add New Role
        </CommonButton>
      </HStack>

      {/* Search */}
      <HStack spacing={4} mb={6}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <FloatingInput
            type="text"
            id="search"
            name="search"
            label="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </HStack>

      <TableContainer>
        <CommonTable
          columns={columns}
          data={paginatedRoles}
          isLoading={isLoading}
          rowActions={renderRowActions}
          emptyStateMessage="No roles found"
        />
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </TableContainer>

      {/* Add/Edit Role Modal */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text variant="sectionTitle">
              {isEditing ? 'Edit Role' : 'Add New Role'}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleFormSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired isInvalid={formErrors.name}>
                  <FloatingInput
                    type="text"
                    id="name"
                    name="name"
                    label="Role Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={formErrors.name}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={formErrors.description}>
                  <FloatingInput
                    type="text"
                    id="description"
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    error={formErrors.description}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <CommonButton
                variant="secondary"
                mr={3}
                onClick={onFormClose}
              >
                Cancel
              </CommonButton>
              <CommonButton
                type="submit"
                isLoading={isLoading}
              >
                {isEditing ? 'Update' : 'Create'}
              </CommonButton>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text variant="sectionTitle">Delete Role</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete the role{' '}
              <Text as="span" fontWeight="bold">
                {selectedRole?.name}
              </Text>
              ? This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <CommonButton
              variant="secondary"
              mr={3}
              onClick={onDeleteClose}
            >
              Cancel
            </CommonButton>
            <CommonButton
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={isLoading}
            >
              Delete
            </CommonButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RoleManagement; 