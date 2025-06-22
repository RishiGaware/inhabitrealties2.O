import React, { useState } from 'react';
import { Box, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import LeadTable from '../../components/leads/LeadTable';
import LeadFilters from '../../components/leads/LeadFilters';
import LeadForm from '../../components/leads/LeadForm';
import CommonPagination from '../../components/common/pagination/CommonPagination';

const ViewLeads = () => {
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

  const handleDelete = (lead) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      // TODO: Implement API call to delete lead
      console.log('Deleting lead:', lead);
    }
  };

  const handleFormSubmit = (formData) => {
    setIsLoading(true);
    // TODO: Implement API call to update lead
    console.log('Form submitted:', formData);
    setIsLoading(false);
    onFormClose();
    setSelectedLead(null);
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
  const totalPages = Math.ceil(filteredLeads.length / pageSize);
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
      <HStack justify="space-between" mb={6}>
        <Text variant="pageTitle">View Leads</Text>
        <button
          onClick={() => {
            setSelectedLead(null);
            onFormOpen();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 text-[11px] sm:text-[13px]"
        >
          <FaPlus size={10} className="shrink-0" />
          <span className="hidden xs:inline">Add Lead</span>
          <span className="xs:hidden">Add</span>
        </button>
      </HStack>

      <LeadFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

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
      />

      {/* Edit Lead Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                {selectedLead ? 'Edit Lead' : 'Add Lead'}
              </h3>
              <LeadForm
                initialData={selectedLead}
                onSubmit={handleFormSubmit}
                onCancel={onFormClose}
              />
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default ViewLeads; 