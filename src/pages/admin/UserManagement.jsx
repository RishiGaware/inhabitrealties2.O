import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
  Switch,
  VStack,
  HStack,
  Text,
  useToast,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Dummy data based on the schema
const dummyUsers = [
  {
    _id: "1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1234567890",
    role: "ADMIN",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: true,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "2",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "+1987654321",
    role: "SALES",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: true,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "3",
    email: "mike.johnson@example.com",
    firstName: "Mike",
    lastName: "Johnson",
    phoneNumber: "+1122334455",
    role: "EXECUTIVE",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: false,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "4",
    email: "sarah.wilson@example.com",
    firstName: "Sarah",
    lastName: "Wilson",
    phoneNumber: "+1555666777",
    role: "USER",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: true,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "5",
    email: "david.brown@example.com",
    firstName: "David",
    lastName: "Brown",
    phoneNumber: "+1888999000",
    role: "SALES",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: true,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "6",
    email: "emma.davis@example.com",
    firstName: "Emma",
    lastName: "Davis",
    phoneNumber: "+1777888999",
    role: "EXECUTIVE",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: false,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "7",
    email: "james.miller@example.com",
    firstName: "James",
    lastName: "Miller",
    phoneNumber: "+1666777888",
    role: "USER",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: true,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "8",
    email: "lisa.taylor@example.com",
    firstName: "Lisa",
    lastName: "Taylor",
    phoneNumber: "+1444555666",
    role: "SALES",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: true,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "9",
    email: "robert.anderson@example.com",
    firstName: "Robert",
    lastName: "Anderson",
    phoneNumber: "+1333444555",
    role: "ADMIN",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: true,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
  {
    _id: "10",
    email: "anna.white@example.com",
    firstName: "Anna",
    lastName: "White",
    phoneNumber: "+1222333444",
    role: "USER",
    createdByUserId: "admin1",
    updatedByUserId: "admin1",
    published: false,
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
  },
];

const UserManagement = () => {
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "",
    published: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const toast = useToast();

  // Calculate pagination
  const totalPages = Math.ceil(dummyUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = dummyUsers.slice(startIndex, endIndex);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call
    toast({
      title: selectedUser ? "User updated" : "User created",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onFormClose();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      published: user.published,
    });
    onFormOpen();
  };

  const handleDelete = () => {
    // Here you would typically make an API call
    toast({
      title: "User deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onDeleteClose();
  };

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="light.darkText">
          User Management
        </Text>
        <Button
          colorScheme="brand"
          onClick={() => {
            setSelectedUser(null);
            setFormData({
              email: "",
              firstName: "",
              lastName: "",
              phoneNumber: "",
              role: "",
              published: true,
            });
            onFormOpen();
          }}
        >
          Add User
        </Button>
      </HStack>

      {/* Users Table */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers.map((user) => (
              <Tr key={user._id}>
                <Td>{user.email}</Td>
                <Td>{`${user.firstName} ${user.lastName}`}</Td>
                <Td>{user.phoneNumber}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <Switch
                    colorScheme="brand"
                    isChecked={user.published}
                    isReadOnly
                  />
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Edit user"
                      icon={<FiEdit2 />}
                      size="sm"
                      colorScheme="brand"
                      variant="ghost"
                      onClick={() => handleEdit(user)}
                    />
                    <IconButton
                      aria-label="Delete user"
                      icon={<FiTrash2 />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => {
                        setSelectedUser(user);
                        onDeleteOpen();
                      }}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination Controls */}
      <Flex justify="center" align="center" mt={6} gap={4}>
        <Button
          leftIcon={<FiChevronLeft />}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage === 1}
          variant="outline"
          colorScheme="brand"
        >
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          rightIcon={<FiChevronRight />}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          isDisabled={currentPage === totalPages}
          variant="outline"
          colorScheme="brand"
        >
          Next
        </Button>
      </Flex>

      {/* Add/Edit User Form Modal */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedUser ? "Edit User" : "Add New User"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SALES">Sales</option>
                    <option value="EXECUTIVE">Executive</option>
                    <option value="USER">User</option>
                  </Select>
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Published</FormLabel>
                  <Switch
                    name="published"
                    isChecked={formData.published}
                    onChange={handleInputChange}
                    colorScheme="brand"
                  />
                </FormControl>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onFormClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={handleSubmit}>
              {selectedUser ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete the user{" "}
              {selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}`}?
              This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserManagement; 