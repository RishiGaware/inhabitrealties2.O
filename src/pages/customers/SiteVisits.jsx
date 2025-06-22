import React, { useState } from 'react';
import {
  Box,
  HStack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { FiCalendar, FiPlus, FiCheck, FiX } from 'react-icons/fi';

const SiteVisits = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLead, setSelectedLead] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [visitDate, setVisitDate] = useState('');

  // Sample data - replace with API call
  const [visits] = useState([
    {
      visitId: "VISIT123",
      leadId: "LEAD123",
      propertyId: "PROP1001",
      scheduledDate: "2025-06-03T10:30:00Z",
      status: "Scheduled",
      visited: false,
      notes: "Requested morning slot"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'blue';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Sample data - replace with API calls
  const leads = [
    { id: 'LEAD123', name: 'Ravi Patel' }
  ];

  const properties = [
    { id: 'PROP1001', name: '3BHK Apartment - Green Valley' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement visit scheduling logic
    console.log('Scheduling visit:', {
      leadId: selectedLead,
      propertyId: selectedProperty,
      scheduledDate: visitDate
    });
    onClose();
  };

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="medium">
          Site Visits
        </Text>
        <Button
          leftIcon={<Icon as={FiPlus} />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Schedule Visit
        </Button>
      </HStack>

      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        overflow="hidden"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>Visit ID</Th>
              <Th>Lead</Th>
              <Th>Property</Th>
              <Th>Scheduled Date</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {visits.map((visit) => (
              <Tr key={visit.visitId}>
                <Td>{visit.visitId}</Td>
                <Td>{visit.leadId}</Td>
                <Td>{visit.propertyId}</Td>
                <Td>
                  {new Date(visit.scheduledDate).toLocaleString()}
                </Td>
                <Td>
                  <Badge colorScheme={getStatusColor(visit.status)}>
                    {visit.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      leftIcon={<Icon as={FiCheck} />}
                      colorScheme="green"
                      variant="outline"
                      isDisabled={visit.visited}
                    >
                      Mark Visited
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<Icon as={FiX} />}
                      colorScheme="red"
                      variant="outline"
                      isDisabled={visit.visited}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule Site Visit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Lead</FormLabel>
                <Select
                  placeholder="Select Lead"
                  value={selectedLead}
                  onChange={(e) => setSelectedLead(e.target.value)}
                  required
                >
                  {leads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Property</FormLabel>
                <Select
                  placeholder="Select Property"
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  required
                >
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Visit Date & Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  required
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" mr={3}>
                Schedule
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SiteVisits; 