import React, { useState } from 'react';
import { Box, HStack, Text, useDisclosure, Button, useToast } from '@chakra-ui/react';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LeadTable from '../../components/leads/LeadTable';
import LeadFilters from '../../components/leads/LeadFilters';
import LeadForm from '../../components/leads/LeadForm';
import CommonPagination from '../../components/common/pagination/CommonPagination';
import TableContainer from '../../components/common/Table/TableContainer';

const ViewLeads = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    source: '',
    date: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();

  // Sample data - replace with API call
  const [leads] = useState([
    {
      leadId: "LEAD123",
      name: "Ravi Patel",
      email: "ravi@example.com",
      phone: "+919876543210",
      source: "Facebook Ads",
      interestedIn: "3BHK Apartment",
      budget: 6500000,
      status: "New",
      createdAt: "2025-06-02T10:00:00Z",
      assignedTo: "sales_user_01",
      qualificationNotes: "",
      nextFollowUp: null
    },
    {
      leadId: "LEAD124",
      name: "Sneha Shah",
      email: "sneha@example.com",
      phone: "+919876543211",
      source: "Website",
      interestedIn: "2BHK Flat",
      budget: 4500000,
      status: "Qualified",
      createdAt: "2025-06-01T14:30:00Z",
      assignedTo: "sales_user_02",
      qualificationNotes: "Interested in 2BHK, budget aligned",
      nextFollowUp: "2025-06-05T10:00:00Z"
    },
    {
      leadId: "LEAD125",
      name: "Amit Kumar",
      email: "amit@example.com",
      phone: "+919876543212",
      source: "Direct",
      interestedIn: "Villa",
      budget: 12000000,
      status: "Contacted",
      createdAt: "2025-05-30T09:15:00Z",
      assignedTo: "sales_user_01",
      qualificationNotes: "High-value prospect, needs follow-up",
      nextFollowUp: "2025-06-03T14:00:00Z"
    }
  ]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    onFormOpen();
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    onFormOpen();
  };

  const handleDelete = async (lead) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setIsLoading(true);
      try {
        // TODO: Implement API call to delete lead
        console.log('Deleting lead:', lead);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: 'Lead Deleted',
          description: `Lead for ${lead.name} has been deleted successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error deleting lead:', error);
        toast({
          title: 'Error Deleting Lead',
          description: 'There was an error deleting the lead. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to update lead
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: selectedLead ? 'Lead Updated' : 'Lead Created',
        description: `Lead for ${formData.name} has been ${selectedLead ? 'updated' : 'created'} successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      onFormClose();
      setSelectedLead(null);
    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: 'Error Saving Lead',
        description: 'There was an error saving the lead. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter leads based on search and filters
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !filters.search || 
      lead.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.phone.includes(filters.search);
    
    const matchesStatus = !filters.status || lead.status === filters.status;
    const matchesSource = !filters.source || lead.source === filters.source;
    const matchesDate = !filters.date || 
      new Date(lead.createdAt).toISOString().split('T')[0] === filters.date;

    return matchesSearch && matchesStatus && matchesSource && matchesDate;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const paginatedLeads = filteredLeads.slice(
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

  return (
    <Box p={6}>
      {/* Header */}
      <HStack justify="space-between" mb={6}>
        <Box>
          <Button
            leftIcon={<FaArrowLeft />}
            variant="ghost"
            colorScheme="gray"
            onClick={() => navigate('/leads')}
            mb={2}
          >
            Back to Lead Management
          </Button>
          <Text variant="pageTitle">View Leads</Text>
        </Box>
        <Button
          leftIcon={<FaPlus />}
          colorScheme="blue"
          onClick={() => {
            setSelectedLead(null);
            onFormOpen();
          }}
        >
          Add Lead
        </Button>
      </HStack>

      {/* Filters */}
      <LeadFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Table with Pagination */}
      <TableContainer>
        <LeadTable
          leads={paginatedLeads}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalItems={filteredLeads.length}
        />
      </TableContainer>

      {/* Edit Lead Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                {selectedLead ? 'Edit Lead' : 'Add Lead'}
              </h3>
              <LeadForm
                initialData={selectedLead}
                onSubmit={handleFormSubmit}
                onCancel={onFormClose}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default ViewLeads; 