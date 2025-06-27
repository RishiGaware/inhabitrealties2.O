import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Flex, Button, useBreakpointValue, IconButton, Avatar, Badge, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, InputGroup, InputLeftElement, Input, Stack, SimpleGrid, useTheme, Tooltip, VStack, Icon, Circle, FormControl, FormLabel, Select, Textarea } from '@chakra-ui/react';
import { AddIcon, SearchIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useLeadsContext } from '../../context/LeadsContext';
import FormModal from '../../components/common/FormModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import { fetchLeads } from '../../services/leadmanagement/leadsService';
import { FiUser, FiMail, FiPhone, FiHome, FiFlag, FiRepeat, FiLink, FiUsers, FiUserCheck, FiUserPlus, FiEdit2, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Loader from '../../components/common/Loader';

const Leads = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedLeadDetails, setSelectedLeadDetails] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLeads, setFilteredLeads] = useState([]);

  const { leads: contextLeads, addLead, updateLead, removeLead, getAllLeads, loading } = useLeadsContext();

  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const theme = useTheme();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    propertyId: '',
    leadStatusId: '',
    followUpStatusId: '',
    referanceFromId: '',
    assignedToUserId: '',
    note: '',
  });

  useEffect(() => {
    const getLeads = async () => {
      try {
        const data = await fetchLeads();
        setFilteredLeads(data.data); // assuming API returns { data: [...] }
      } catch {/* ignore error */}
    };
    getLeads();
  }, []);

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedLeadDetails(null);
  };

  const handleAddNew = () => {
    setSelectedLead(null);
    setIsEditMode(false);
    setIsOpen(true);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleDelete = (lead) => {
    setLeadToDelete(lead);
    setIsDeleteOpen(true);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = contextLeads.filter(lead =>
      lead.userId.firstName.toLowerCase().includes(term.toLowerCase()) ||
      lead.userId.lastName.toLowerCase().includes(term.toLowerCase()) ||
      lead.userId.email.toLowerCase().includes(term.toLowerCase()) ||
      lead.userId.phoneNumber.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLeads(filtered);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditMode && selectedLead) {
        await updateLead(selectedLead._id, formData);
      } else {
        await addLead(formData);
      }
      setIsOpen(false);
      setSelectedLead(null);
      setIsEditMode(false);
      getAllLeads();
    } catch {/* ignore error */}
  };

  const confirmDelete = async () => {
    if (leadToDelete) {
      await removeLead(leadToDelete._id);
      setIsDeleteOpen(false);
      setLeadToDelete(null);
      getAllLeads();
    }
  };

  const onDeleteClose = () => {
    setIsDeleteOpen(false);
    setLeadToDelete(null);
  };

  return (
    <Box p={5}>
      {loading && (
        <Loader size="xl" label="Loading leads..." />
      )}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" variant="pageTitle">
          Leads
        </Heading>
        {isMobile ? (
          <IconButton
            aria-label="Add New Lead"
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
            Add Lead
          </Button>
        )}
      </Flex>

      <Box mb={6} maxW="400px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </Box>

      <Text fontWeight="bold" mb={2}>{filteredLeads.length} leads found</Text>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        minChildWidth="250px"
        spacing={{ base: 3, sm: 4, md: 6 }}
        mb={8}
      >
        {filteredLeads.length === 0 ? (
          <Text color="gray.400">No leads match your search.</Text>
        ) : (
          filteredLeads.map((lead) => {
            const user = lead.userId || {};
            return (
              <Box
                key={lead._id}
                bg="white"
                borderRadius="2xl"
                boxShadow="md"
                mb={4}
                borderLeft="6px solid"
                borderColor="brand.500"
                w="100%"
                minW={0}
                maxW="100%"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="flex-start"
                minH={{ base: '220px', md: '240px' }}
                position="relative"
                p={{ base: 3, md: 5 }}
              >
                <Flex
                  direction="column"
                  align="center"
                  gap={2}
                  w="100%"
                  mb={2}
                  flexWrap="wrap"
                >
                  <Avatar
                    name={`${user.firstName || ''} ${user.lastName || ''}`}
                    bg="gray.100"
                    color={theme.colors.brand[600] || 'purple.600'}
                    size={{ base: 'lg', md: 'xl' }}
                    src={user.avatarUrl}
                    border={`3px solid ${theme.colors.brand[200] || '#E9D8FD'}`}
                    boxShadow="md"
                    mb={{ base: 2, md: 0 }}
                  />
                  <Text
                    fontWeight="bold"
                    fontSize={{ base: 'md', md: 'lg' }}
                    color={theme.colors.brand[700] || 'purple.700'}
                    textTransform="capitalize"
                    isTruncated
                    maxW="100%"
                    whiteSpace="normal"
                    wordBreak="break-word"
                  >
                    {user.firstName} {user.lastName}
                  </Text>
                  <Flex
                    direction="column"
                    align={{ base: 'center', md: 'flex-start' }}
                    gap={1}
                    fontSize={{ base: 'sm', md: 'md' }}
                    color="gray.500"
                    mt={1}
                    wrap="wrap"
                    w="100%"
                  >
                    <Text as="span" display="flex" alignItems="center" gap={1} isTruncated maxW="100%" whiteSpace="normal" wordBreak="break-word">📧 <span>{user.email}</span></Text>
                    <Text as="span" display="flex" alignItems="center" gap={1} isTruncated maxW="100%" whiteSpace="normal" wordBreak="break-word">📞 <span>{user.phoneNumber}</span></Text>
                  </Flex>
                </Flex>
                <Flex gap={1} flexWrap="wrap" w="100%" mt={2}>
                  {lead.followUpStatus?.name && (
                    <Badge colorScheme="yellow" variant="subtle" borderRadius="full" px={3} py={1} fontSize="xs" fontWeight="bold" whiteSpace="normal" wordBreak="break-word">
                      {lead.followUpStatus.name}
                    </Badge>
                  )}
                  {lead.leadStatus?.name && (
                    <Badge colorScheme="brand" variant="subtle" borderRadius="full" px={3} py={1} fontSize="xs" fontWeight="bold" whiteSpace="normal" wordBreak="break-word">
                      {lead.leadStatus.name}
                    </Badge>
                  )}
                  {lead.referanceFrom?.name && (
                    <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={3} py={1} fontSize="xs" fontWeight="bold" whiteSpace="normal" wordBreak="break-word">
                      {lead.referanceFrom.name}
                    </Badge>
                  )}
                </Flex>
                <Flex
                  direction="row"
                  gap={2}
                  alignSelf="flex-end"
                  mt="auto"
                  opacity={{ base: 1, md: 0.7 }}
                  _hover={{ opacity: 1 }}
                  transition="opacity 0.2s"
                  position="absolute"
                  top={3}
                  right={3}
                >
                  <Tooltip label="Edit Lead" hasArrow placement="top">
                    <IconButton
                      aria-label="Edit Lead"
                      icon={<EditIcon />}
                      size={{ base: 'sm', md: 'sm' }}
                      colorScheme="brand"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(lead);
                      }}
                      _hover={{ bg: theme.colors.brand[50] || 'purple.50', color: theme.colors.brand[700] || 'purple.700' }}
                    />
                  </Tooltip>
                  <Tooltip label="Delete Lead" hasArrow placement="top">
                    <IconButton
                      aria-label="Delete Lead"
                      icon={<DeleteIcon />}
                      size={{ base: 'sm', md: 'sm' }}
                      colorScheme="red"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(lead);
                      }}
                      _hover={{ bg: 'red.50', color: 'red.700' }}
                    />
                  </Tooltip>
                </Flex>
              </Box>
            );
          })
        )}
      </SimpleGrid>

      {/* Lead Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={closeDetails} size="md" isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent
          maxW={{ base: '98vw', sm: '95vw', md: '600px', lg: '700px' }}
          w="100%"
          minH="400px"
          borderRadius="2xl"
          boxShadow="2xl"
          p={0}
          position="relative"
          bgGradient="linear(to-br, brand.50 60%, white 100%)"
        >
          {selectedLeadDetails && (
            <>
              {/* Floating Avatar */}
              <Flex direction="column" align="center" mt={-16} mb={2} zIndex={2} position="relative">
                <Box
                  as={motion.div}
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar
                    name={`${selectedLeadDetails.userId?.firstName || ''} ${selectedLeadDetails.userId?.lastName || ''}`}
                    size={{ base: '2xl', md: '3xl' }}
                    bg="white"
                    color="brand.600"
                    borderWidth="6px"
                    borderColor="brand.400"
                    boxShadow="0 0 0 6px rgba(128,0,255,0.15), 0 8px 32px 0 rgba(31,38,135,0.15)"
                    mb={2}
                    zIndex={3}
                    position="relative"
                  />
                </Box>
                <Text fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }} mt={2} color="brand.700">
                  {selectedLeadDetails.userId?.firstName} {selectedLeadDetails.userId?.lastName}
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">{selectedLeadDetails.userId?.email}</Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">{selectedLeadDetails.userId?.phoneNumber}</Text>
                <Flex gap={2} mt={2} flexWrap="wrap" justify="center">
                  {selectedLeadDetails.leadStatus?.name && (
                    <Badge colorScheme="yellow" variant="solid" borderRadius="full" px={4} py={2} fontSize="md" fontWeight="bold" letterSpacing="wide">
                      {selectedLeadDetails.leadStatus.name}
                    </Badge>
                  )}
                  {selectedLeadDetails.followUpStatus?.name && (
                    <Badge colorScheme="blue" variant="solid" borderRadius="full" px={4} py={2} fontSize="md" fontWeight="bold" letterSpacing="wide">
                      {selectedLeadDetails.followUpStatus.name}
                    </Badge>
                  )}
                </Flex>
              </Flex>
              <Box w="100%" h="2px" bgGradient="linear(to-r, brand.100, gray.100, brand.100)" opacity={0.5} mb={2} />
              {/* Timeline Sections */}
              <ModalBody bg="transparent" px={0} py={0}>
                <VStack spacing={0} align="stretch" w="100%" position="relative">
                  {/* Timeline vertical line */}
                  <Box position="absolute" left="36px" top={0} bottom={0} w="2px" bgGradient="linear(to-b, brand.200, gray.200)" zIndex={0} />
                  {/* Timeline Items */}
                  {/* Contact Information */}
                  <Flex align="flex-start" position="relative" zIndex={1}>
                    <Box mt={6} ml={6} mr={4} position="relative">
                      <Circle size="48px" bg="white" boxShadow="0 0 0 4px #805ad5, 0 2px 8px rgba(128,90,213,0.15)" border="3px solid" borderColor="brand.400" display="flex" alignItems="center" justifyContent="center">
                        <Icon as={FiUser} color="brand.500" boxSize={7} />
                      </Circle>
                    </Box>
                    <Box
                      as={motion.div}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      bg="rgba(255,255,255,0.7)"
                      borderRadius="xl"
                      boxShadow="lg"
                      backdropFilter="blur(8px)"
                      p={{ base: 5, md: 7 }}
                      mt={6}
                      mb={6}
                      flex="1"
                      ml={2}
                    >
                      <Heading size="md" color="brand.700" fontWeight="bold" mb={2}>Contact Information</Heading>
                      <Flex align="center" gap={3} mb={2}><Icon as={FiMail} color="gray.500" boxSize={5} /><Text fontWeight="medium">Email:</Text><Text>{selectedLeadDetails.userId?.email}</Text></Flex>
                      <Flex align="center" gap={3}><Icon as={FiPhone} color="gray.500" boxSize={5} /><Text fontWeight="medium">Phone:</Text><Text>{selectedLeadDetails.userId?.phoneNumber}</Text></Flex>
                    </Box>
                  </Flex>
                  {/* Interested Property */}
                  <Flex align="flex-start" position="relative" zIndex={1}>
                    <Box mt={0} ml={6} mr={4} position="relative">
                      <Circle size="48px" bg="white" boxShadow="0 0 0 4px #805ad5, 0 2px 8px rgba(128,90,213,0.15)" border="3px solid" borderColor="brand.400" display="flex" alignItems="center" justifyContent="center">
                        <Icon as={FiHome} color="brand.500" boxSize={7} />
                      </Circle>
                    </Box>
                    <Box
                      as={motion.div}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      bg="rgba(255,255,255,0.7)"
                      borderRadius="xl"
                      boxShadow="lg"
                      backdropFilter="blur(8px)"
                      p={{ base: 5, md: 7 }}
                      mb={6}
                      flex="1"
                      ml={2}
                    >
                      <Heading size="md" color="brand.700" fontWeight="bold" mb={2}>Interested Property</Heading>
                      <Flex align="center" gap={3}><Icon as={FiHome} color="gray.500" boxSize={5} /><Text fontWeight="medium">Property ID:</Text><Text>{selectedLeadDetails.leadInterestedPropertyId || 'N/A'}</Text></Flex>
                    </Box>
                  </Flex>
                  {/* Referral Information */}
                  <Flex align="flex-start" position="relative" zIndex={1}>
                    <Box mt={0} ml={6} mr={4} position="relative">
                      <Circle size="48px" bg="white" boxShadow="0 0 0 4px #805ad5, 0 2px 8px rgba(128,90,213,0.15)" border="3px solid" borderColor="brand.400" display="flex" alignItems="center" justifyContent="center">
                        <Icon as={FiUsers} color="brand.500" boxSize={7} />
                      </Circle>
                    </Box>
                    <Box
                      as={motion.div}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      bg="rgba(255,255,255,0.7)"
                      borderRadius="xl"
                      boxShadow="lg"
                      backdropFilter="blur(8px)"
                      p={{ base: 5, md: 7 }}
                      mb={6}
                      flex="1"
                      ml={2}
                    >
                      <Heading size="md" color="brand.700" fontWeight="bold" mb={2}>Referral Information</Heading>
                      <Flex align="center" gap={3}><Icon as={FiUserPlus} color="gray.500" boxSize={5} /><Text fontWeight="medium">Reference Source:</Text><Text>{selectedLeadDetails.referanceFrom?.name || 'N/A'}</Text></Flex>
                    </Box>
                  </Flex>
                  {/* Assignment Information */}
                  <Flex align="flex-start" position="relative" zIndex={1}>
                    <Box mt={0} ml={6} mr={4} position="relative">
                      <Circle size="48px" bg="white" boxShadow="0 0 0 4px #805ad5, 0 2px 8px rgba(128,90,213,0.15)" border="3px solid" borderColor="brand.400" display="flex" alignItems="center" justifyContent="center">
                        <Icon as={FiUserCheck} color="brand.500" boxSize={7} />
                      </Circle>
                    </Box>
                    <Box
                      as={motion.div}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      bg="rgba(255,255,255,0.7)"
                      borderRadius="xl"
                      boxShadow="lg"
                      backdropFilter="blur(8px)"
                      p={{ base: 5, md: 7 }}
                      mb={6}
                      flex="1"
                      ml={2}
                    >
                      <Heading size="md" color="brand.700" fontWeight="bold" mb={2}>Assignment Information</Heading>
                      <Flex align="center" gap={3}><Icon as={FiUser} color="gray.500" boxSize={5} /><Text fontWeight="medium">Assigned To:</Text><Text>{selectedLeadDetails.assignedToUserId?.firstName} {selectedLeadDetails.assignedToUserId?.lastName}</Text></Flex>
                    </Box>
                  </Flex>
                  {/* Notes */}
                  <Flex align="flex-start" position="relative" zIndex={1}>
                    <Box mt={0} ml={6} mr={4} position="relative">
                      <Circle size="48px" bg="white" boxShadow="0 0 0 4px #805ad5, 0 2px 8px rgba(128,90,213,0.15)" border="3px solid" borderColor="brand.400" display="flex" alignItems="center" justifyContent="center">
                        <Icon as={FiInfo} color="brand.500" boxSize={7} />
                      </Circle>
                    </Box>
                    <Box
                      as={motion.div}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      bg="rgba(255,255,255,0.7)"
                      borderRadius="xl"
                      boxShadow="lg"
                      backdropFilter="blur(8px)"
                      p={{ base: 5, md: 7 }}
                      mb={8}
                      flex="1"
                      ml={2}
                    >
                      <Heading size="md" color="brand.700" fontWeight="bold" mb={2}>Notes</Heading>
                      <Text>{selectedLeadDetails.note || 'N/A'}</Text>
                    </Box>
                  </Flex>
                </VStack>
              </ModalBody>
              <ModalFooter bg="gray.50" borderBottomRadius="2xl">
                <Button onClick={closeDetails} colorScheme="brand" borderRadius="full" px={8} py={2} fontWeight="bold">Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Add/Edit Modal and DeleteConfirmationModal remain unchanged */}
      <FormModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedLead(null);
          setIsEditMode(false);
        }}
        title={isEditMode ? 'Edit Lead' : 'Add New Lead'}
        onSave={handleFormSubmit}
        size="xl"
        initialData={isEditMode && selectedLead ? selectedLead : {}}
        modalProps={{
          isCentered: true,
          borderRadius: '2xl',
          boxShadow: '2xl',
          px: { base: 2, md: 8 },
          py: { base: 4, md: 8 },
          bg: 'white',
          border: `2px solid ${theme.colors.brand[100] || '#E9D8FD'}`,
        }}
        buttonProps={{
          colorScheme: 'brand',
          borderRadius: 'full',
          fontWeight: 'bold',
          fontSize: { base: 'md', md: 'lg' },
          px: 8,
          py: 2,
          mt: 4,
        }}
        buttonLabel={isEditMode ? 'Update' : 'Add Lead'}
      >
        <VStack spacing={4} align="stretch">
          <Flex gap={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input name="firstName" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input name="lastName" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
            </FormControl>
          </Flex>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Interested Property</FormLabel>
            <Select name="propertyId" value={formData.propertyId} onChange={e => setFormData({ ...formData, propertyId: e.target.value })}>
              {/* Map property options */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Lead Status</FormLabel>
            <Select name="leadStatusId" value={formData.leadStatusId} onChange={e => setFormData({ ...formData, leadStatusId: e.target.value })}>
              {/* Map status options */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Follow Up Status</FormLabel>
            <Select name="followUpStatusId" value={formData.followUpStatusId} onChange={e => setFormData({ ...formData, followUpStatusId: e.target.value })}>
              {/* Map follow up status options */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Assigned To</FormLabel>
            <Select name="assignedToUserId" value={formData.assignedToUserId} onChange={e => setFormData({ ...formData, assignedToUserId: e.target.value })}>
              {/* Map user options */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea name="note" value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })} />
          </FormControl>
        </VStack>
      </FormModal>

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={confirmDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete the lead "${leadToDelete?.userId?.firstName} ${leadToDelete?.userId?.lastName}"?`}
      />

      {/* Section Card */}
      <Box
        bg="white"
        borderRadius="2xl"
        boxShadow="md"
        p={{ base: 4, md: 6 }}
        mb={6}
        borderLeft="6px solid"
        borderColor="brand.500"
      >
        <Flex align="center" mb={2}>
          <Icon as={FiUser} color="brand.500" mr={2} />
          <Heading size="md" color="brand.700">Contact Information</Heading>
        </Flex>
        {/* ...fields or info rows... */}
      </Box>
    </Box>
  );
};

export default Leads;