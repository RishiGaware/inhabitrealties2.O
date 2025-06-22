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
  Select,
  Flex,
  useBreakpointValue,
  Heading,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, SearchIcon, AddIcon } from '@chakra-ui/icons';
import CommonTable from '../../../components/common/Table/CommonTable';
import CommonPagination from '../../../components/common/pagination/CommonPagination';
import TableContainer from '../../../components/common/Table/TableContainer';
import FormModal from '../../../components/common/FormModal';
import FloatingInput from '../../../components/common/FloatingInput';
import FloatingSelect from '../../../components/common/FloatingSelect';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

const dummyUsers = [
  {
    _id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'ADMIN',
    published: true,
  },
  {
    _id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'SALES',
    published: true,
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(dummyUsers);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState(null);

  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    const filtered = dummyUsers.filter(user => {
      const matchesSearch =
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.firstName.toLowerCase().includes(value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(value.toLowerCase());
      const matchesRole = roleFilter ? user.role === roleFilter : true;
      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setFormData({});
    onOpen();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
    onOpen();
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    onDeleteOpen();
  };

  const confirmDelete = () => {
    if (window.confirm(`Are you sure you want to delete the user "${userToDelete.firstName} ${userToDelete.lastName}"?`)) {
      setUsers(users.filter(u => u._id !== userToDelete._id));
      setFilteredUsers(filteredUsers.filter(u => u._id !== userToDelete._id));
      toast({
        title: 'User Deleted',
        description: `User "${userToDelete.firstName} ${userToDelete.lastName}" has been deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
      setUserToDelete(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      if (selectedUser) {
        setUsers(
          users.map(u =>
            u._id === selectedUser._id ? { ...selectedUser, ...formData } : u
          )
        );
        setFilteredUsers(users.map(u =>
          u._id === selectedUser._id ? { ...selectedUser, ...formData } : u
        ));
        toast({ title: 'User Updated', status: 'success' });
      } else {
        setUsers([...users, { ...formData, _id: Date.now().toString(), published: true }]);
        setFilteredUsers([...filteredUsers, { ...formData, _id: Date.now().toString(), published: true }]);
        toast({ title: 'User Created', status: 'success' });
      }

      setIsSubmitting(false);
      setSelectedUser(null);
      setFormData({});
      setCurrentPage(1);
    }, 1000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredUsers.length / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const columns = [
    { key: 'name', label: 'Name', render: (_, row) => `${row.firstName} ${row.lastName}` },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'role', label: 'Role' },
    { key: 'published', label: 'Status', render: (s) => (s ? 'Active' : 'Inactive') },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <Flex>
          <IconButton
            icon={<EditIcon />}
            variant="outline"
            colorScheme="brand"
            aria-label="Edit user"
            mr={2}
            onClick={() => handleEdit(row.original)}
          />
          <IconButton
            icon={<DeleteIcon />}
            variant="outline"
            colorScheme="red"
            aria-label="Delete user"
            onClick={() => handleDelete(row.original)}
          />
        </Flex>
      ),
    },
  ];

  const renderRowActions = (user) => (
    <HStack spacing={2}>
      <IconButton
        aria-label="Edit user"
        icon={<EditIcon />}
        size="sm"
        onClick={() => handleEdit(user)}
        colorScheme="brand"
        variant="outline"
      />
      <IconButton
        aria-label="Delete user"
        icon={<DeleteIcon />}
        size="sm"
        onClick={() => handleDelete(user)}
        colorScheme="red"
        variant="outline"
      />
    </HStack>
  );

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" variant="pageTitle">
          User Management
        </Heading>
        {isMobile ? (
          <IconButton
            aria-label="Add New User"
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
            Add New User
          </Button>
        )}
      </Flex>

      <HStack spacing={4} mb={6}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none"><SearchIcon color="gray.300" /></InputLeftElement>
          <Input placeholder="Search users..." value={searchTerm} onChange={handleSearch} />
        </InputGroup>
        <Select
          maxW="200px"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          placeholder="Filter by role"
        >
          <option value="ADMIN">Admin</option>
          <option value="SALES">Sales</option>
        </Select>
      </HStack>

      <TableContainer>
        <CommonTable
          columns={columns}
          data={filteredUsers.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          rowActions={renderRowActions}
          emptyStateMessage="No users match your search."
        />
        <CommonPagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / pageSize)}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalItems={filteredUsers.length}
        />
      </TableContainer>

      <FormModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectedUser(null);
          setFormData({});
        }}
        title={selectedUser ? 'Edit User' : 'Add New User'}
        onSave={handleFormSubmit}
        isSubmitting={isSubmitting}
      >
        <VStack spacing={4}>
          <HStack>
            <FormControl isInvalid={!!errors.firstName}><FloatingInput id="firstName" name="firstName" label="First Name" value={formData.firstName || ''} onChange={handleInputChange} error={errors.firstName} /></FormControl>
            <FormControl isInvalid={!!errors.lastName}><FloatingInput id="lastName" name="lastName" label="Last Name" value={formData.lastName || ''} onChange={handleInputChange} error={errors.lastName} /></FormControl>
          </HStack>
          <FormControl isInvalid={!!errors.email}><FloatingInput id="email" name="email" label="Email" type="email" value={formData.email || ''} onChange={handleInputChange} error={errors.email} /></FormControl>
          <FormControl><FloatingInput id="phoneNumber" name="phoneNumber" label="Phone Number" value={formData.phoneNumber || ''} onChange={handleInputChange} /></FormControl>
          <FormControl isInvalid={!!errors.role}>
            <FloatingSelect
              id="role"
              name="role"
              label="Role"
              value={formData.role || ''}
              onChange={handleInputChange}
              error={errors.role}
              options={['ADMIN', 'SALES', 'MANAGER']}
              placeholder="Select a role"
            />
          </FormControl>
        </VStack>
      </FormModal>

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.firstName} ${userToDelete?.lastName}?`}
      />
    </Box>
  );
};

export default UserManagement; 