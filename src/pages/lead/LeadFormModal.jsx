import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Text,
} from '@chakra-ui/react';
import SearchableSelect from '../../components/common/SearchableSelect';

const LeadFormModal = ({
  isOpen,
  onClose,
  onSave,
  isEditMode = false,
  initialData = {},
  userOptions = [],
  propertyOptions = [],
  leadStatusOptions = [],
  followUpStatusOptions = [],
  referenceSources = [],
  ...modalProps
}) => {
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
  const [referenceType, setReferenceType] = useState('internal');
  const [referanceFromExternalName, setReferanceFromExternalName] = useState('');

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || '',
        propertyId: initialData.propertyId || '',
        leadStatusId: initialData.leadStatusId || '',
        followUpStatusId: initialData.followUpStatusId || '',
        referanceFromId: initialData.referanceFromId || '',
        assignedToUserId: initialData.assignedToUserId || '',
        note: initialData.note || '',
      });
      if (initialData.referanceFromExternalName) {
        setReferenceType('external');
        setReferanceFromExternalName(initialData.referanceFromExternalName);
      } else {
        setReferenceType('internal');
        setReferanceFromExternalName('');
      }
    } else {
      setFormData({
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
      setReferenceType('internal');
      setReferanceFromExternalName('');
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reference From options: users + sources
  const referenceFromOptions = [
    ...userOptions.map(u => ({ label: `${u.firstName} ${u.lastName} (${u.email})`, value: u._id })),
    ...referenceSources.map(s => ({ label: s.name, value: s._id }))
  ];
  // Fallback for current value if not in options
  const referenceFromFallback = formData.referanceFromId &&
    !referenceFromOptions.some(opt => opt.value === formData.referanceFromId)
    ? [{ label: initialData?.referanceFrom?.name || 'Current Reference', value: formData.referanceFromId }]
    : [];

  // For Assigned To fallback
  const assignedUserOption = formData.assignedToUserId &&
    !userOptions.some(u => u._id === formData.assignedToUserId)
    ? [{
        label: initialData?.assignedToUserId?.firstName
          ? `${initialData.assignedToUserId.firstName} ${initialData.assignedToUserId.lastName} (${initialData.assignedToUserId.email})`
          : 'Current User',
        value: formData.assignedToUserId
      }]
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass formData, referenceType, referanceFromExternalName to parent
    onSave({
      ...formData,
      referenceType,
      referanceFromExternalName,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? 'Edit Lead' : 'Add New Lead'}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Flex gap={4}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </FormControl>
              </Flex>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input name="email" value={formData.email} onChange={handleInputChange} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Interested Property</FormLabel>
                <SearchableSelect
                  options={propertyOptions}
                  value={formData.propertyId}
                  onChange={val => setFormData(f => ({ ...f, propertyId: val }))}
                  placeholder="Select Property"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Lead Status</FormLabel>
                <SearchableSelect
                  options={leadStatusOptions.map(s => ({ label: s.name, value: s._id }))}
                  value={formData.leadStatusId}
                  onChange={val => setFormData(f => ({ ...f, leadStatusId: val }))}
                  placeholder="Select Lead Status"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Follow Up Status</FormLabel>
                <SearchableSelect
                  options={followUpStatusOptions.map(s => ({ label: s.name, value: s._id }))}
                  value={formData.followUpStatusId}
                  onChange={val => setFormData(f => ({ ...f, followUpStatusId: val }))}
                  placeholder="Select Follow Up Status"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Assigned To</FormLabel>
                <SearchableSelect
                  options={[
                    ...userOptions.map(u => ({ label: `${u.firstName} ${u.lastName} (${u.email})`, value: u._id })),
                    ...assignedUserOption
                  ]}
                  value={formData.assignedToUserId}
                  onChange={val => setFormData(f => ({ ...f, assignedToUserId: val }))}
                  placeholder="Select User"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Reference From Type</FormLabel>
                <Select value={referenceType} onChange={e => setReferenceType(e.target.value)}>
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                </Select>
              </FormControl>
              {referenceType === 'internal' ? (
                <FormControl>
                  <FormLabel>Reference From (User/Source)</FormLabel>
                  <SearchableSelect
                    options={[
                      ...referenceFromOptions,
                      ...referenceFromFallback
                    ]}
                    value={formData.referanceFromId}
                    onChange={val => setFormData(f => ({ ...f, referanceFromId: val }))}
                    placeholder="Select Reference"
                  />
                </FormControl>
              ) : (
                <FormControl>
                  <FormLabel>Reference From (External Name)</FormLabel>
                  <Input
                    value={referanceFromExternalName}
                    onChange={e => setReferanceFromExternalName(e.target.value)}
                    placeholder="Enter external reference name"
                  />
                  <Text fontSize="xs" color="gray.500">Not required</Text>
                </FormControl>
              )}
              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea name="note" value={formData.note} onChange={handleInputChange} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand" type="submit">
              {isEditMode ? 'Update' : 'Add Lead'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default LeadFormModal; 