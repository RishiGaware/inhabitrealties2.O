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
  FormLabel,
  Input,
  Select,
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
import CommonPagination from '../../../components/common/pagination/CommonPagination';
import TableContainer from '../../../components/common/Table/TableContainer';
import FloatingInput from '../../../components/common/FloatingInput';
import CommonButton from '../../../components/common/Button/CommonButton';

// Dummy data based on the schema
const dummyUsers = [
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    createdByUserId: 'admin1',
    updatedByUserId: 'admin1',
    published: true,
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();

  // Modal controls
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.includes(searchQuery);
    
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Table columns configuration
  const columns = [
    { key: 'email', label: 'Email' },
    { 
      key: 'name', 
      label: 'Name',
      render: (_, row) => `${row.firstName} ${row.lastName}`
    },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'role', label: 'Role' },
    { 
      key: 'published', 
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
  const renderRowActions = (user) => (
    <HStack spacing={2}>
      <IconButton
        aria-label="Edit user"
        icon={<EditIcon />}
        size="xs"
        colorScheme="brand"
        variant="outline"
        onClick={() => handleEdit(user)}
      />
      <IconButton
        aria-label="Delete user"
        icon={<DeleteIcon />}
        size="xs"
        colorScheme="red"
        variant="outline"
        onClick={() => handleDelete(user)}
      />
    </HStack>
  );

  const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (!formData.get('email') || !emailRegex.test(formData.get('email'))) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.get('firstName') || formData.get('firstName').length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    if (!formData.get('lastName') || formData.get('lastName').length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    if (!formData.get('phoneNumber') || !phoneRegex.test(formData.get('phoneNumber'))) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!isEditing && !formData.get('password')) {
      errors.password = 'Password is required for new users';
    }
    if (formData.get('password') && formData.get('password').length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setFormErrors({});
    onFormOpen();
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    const userData = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phoneNumber: formData.get('phoneNumber'),
      role: formData.get('role'),
      published: formData.get('published') === 'true',
      createdByUserId: 'admin1',
      updatedByUserId: 'admin1',
    };

    if (isEditing) {
      // Update existing user
      setUsers(users.map(user => 
        user._id === selectedUser._id ? { ...user, ...userData } : user
      ));
      toast({
        title: 'User updated',
        status: 'success',
        duration: 3000,
      });
    } else {
      // Create new user
      const newUser = {
        _id: Date.now().toString(),
        ...userData,
        password: formData.get('password'), // In real app, this would be hashed
      };
      setUsers([...users, newUser]);
      toast({
        title: 'User created',
        status: 'success',
        duration: 3000,
      });
    }

    setIsLoading(false);
    onFormClose();
    setSelectedUser(null);
    setIsEditing(false);
    setFormErrors({});
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    setUsers(users.filter(user => user._id !== selectedUser._id));
    toast({
      title: 'User deleted',
      status: 'success',
      duration: 3000,
    });
    setIsLoading(false);
    onDeleteClose();
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prevUser => ({ ...prevUser, [name]: value }));
    setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text variant="pageTitle">
          User Management
        </Text>
        <CommonButton
          leftIcon={<AddIcon />}
          onClick={() => {
            setSelectedUser(null);
            setIsEditing(false);
            setFormErrors({});
            onFormOpen();
          }}
        >
          Add New User
        </CommonButton>
      </HStack>

      {/* Search and Filter */}
      <HStack spacing={4} mb={6}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <FloatingInput
            type="text"
            id="search"
            name="search"
            label="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Select
          size="sm"
          placeholder="Filter by role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          maxW="200px"
        >
          <option value="ADMIN">Admin</option>
          <option value="SALES">Sales</option>
          <option value="EXECUTIVE">Executive</option>
          <option value="USER">User</option>
        </Select>
      </HStack>

      <TableContainer>
        <CommonTable
          columns={columns}
          data={paginatedUsers}
          isLoading={isLoading}
          rowActions={renderRowActions}
          emptyStateMessage="No users found"
                    />
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </TableContainer>

      {/* Add/Edit User Form Modal */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text variant="sectionTitle">
            {isEditing ? 'Edit User' : 'Add New User'}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleFormSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired isInvalid={formErrors.email}>
                  <FloatingInput
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    value={selectedUser?.email || ''}
                    onChange={handleInputChange}
                    error={formErrors.email}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={formErrors.firstName}>
                  <FloatingInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={selectedUser?.firstName || ''}
                    onChange={handleInputChange}
                    error={formErrors.firstName}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={formErrors.lastName}>
                  <FloatingInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={selectedUser?.lastName || ''}
                    onChange={handleInputChange}
                    error={formErrors.lastName}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={formErrors.phoneNumber}>
                  <FloatingInput
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    value={selectedUser?.phoneNumber || ''}
                    onChange={handleInputChange}
                    error={formErrors.phoneNumber}
                  />
                </FormControl>
                {!isEditing && (
                  <FormControl isRequired isInvalid={formErrors.password}>
                    <FloatingInput
                      type="password"
                      id="password"
                      name="password"
                      label="Password"
                      onChange={handleInputChange}
                      error={formErrors.password}
                      showPassword={false}
                    />
                  </FormControl>
                )}
                <FormControl isRequired>
                  <Select name="role" defaultValue={selectedUser?.role}>
                    <option value="ADMIN">Admin</option>
                    <option value="SALES">Sales</option>
                    <option value="EXECUTIVE">Executive</option>
                    <option value="USER">User</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <Select
                    name="published"
                    defaultValue={selectedUser?.published?.toString()}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </Select>
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
            <Text variant="sectionTitle">Delete User</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete the user{' '}
              <Text as="span" fontWeight="bold">
                {selectedUser?.firstName} {selectedUser?.lastName}
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

export default UserManagement; 