import { useEffect, useState } from 'react';
import {
  Box,
  useDisclosure,
  FormControl,
  VStack,
  HStack,
  Text,
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
import { useUserContext } from '../../../context/UserContext';

const UserManagement = () => {
  const { users, getAllUsers, addUser, updateUser, removeUser } = useUserContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    let filtered = users;
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchTerm, roleFilter]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

  const confirmDelete = async () => {
    if (userToDelete) {
      await removeUser(userToDelete._id);
      onDeleteClose();
      setUserToDelete(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    if (selectedUser) {
      await updateUser(selectedUser._id, formData);
    } else {
      await addUser(formData);
    }
    setIsSubmitting(false);
    setSelectedUser(null);
    setFormData({});
    onClose();
    setCurrentPage(1);
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