import React, { useState } from 'react';
import {
  Box,
  Grid,
  HStack,
  Text,
  Icon,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
} from '@chakra-ui/react';
import { FiFile, FiUpload, FiDownload, FiTrash2 } from 'react-icons/fi';
import DocumentUpload from '../../components/common/DocumentUpload';

const Documents = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('');

  // Sample data - replace with API call
  const [documents] = useState([
    {
      documentId: "DOC001",
      customerId: "CUST001",
      type: "Aadhar Card",
      fileUrl: "https://example.com/docs/aadhar_ravi.pdf",
      uploadedBy: "admin01",
      uploadedAt: "2025-06-02T13:00:00Z"
    }
  ]);

  const handleFileSelect = (file) => {
    console.log('Selected file:', file);
    // TODO: Implement file upload logic
    onClose();
  };

  const documentTypes = [
    'Aadhar Card',
    'PAN Card',
    'Sale Agreement',
    'Property Documents',
    'Bank Statements'
  ];

  // Sample customers - replace with API call
  const customers = [
    { id: 'CUST001', name: 'Ravi Patel' }
  ];

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="medium">
          Documents
        </Text>
        <Button
          leftIcon={<Icon as={FiUpload} />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Upload Document
        </Button>
      </HStack>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {documents.map((doc) => (
          <Box
            key={doc.documentId}
            p={4}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <HStack spacing={4} mb={3}>
              <Icon as={FiFile} w={6} h={6} color="blue.500" />
              <Box flex="1">
                <Text fontWeight="medium" fontSize="sm">
                  {doc.type}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                </Text>
              </Box>
            </HStack>
            <HStack spacing={2} justify="flex-end">
              <Button
                size="sm"
                leftIcon={<Icon as={FiDownload} />}
                variant="outline"
                colorScheme="blue"
                onClick={() => window.open(doc.fileUrl, '_blank')}
              >
                Download
              </Button>
              <Button
                size="sm"
                leftIcon={<Icon as={FiTrash2} />}
                variant="outline"
                colorScheme="red"
              >
                Delete
              </Button>
            </HStack>
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Select
              placeholder="Select Customer"
              mb={4}
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Select>

            <Select
              placeholder="Select Document Type"
              mb={4}
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value)}
            >
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>

            <DocumentUpload
              onFileSelect={handleFileSelect}
              acceptedTypes=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              label="Upload Document (PDF, JPG, PNG)"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Documents; 