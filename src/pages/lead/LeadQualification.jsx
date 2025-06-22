import React, { useState } from 'react';
import { Box, HStack, Text, useDisclosure } from '@chakra-ui/react';
import LeadTable from '../../components/leads/LeadTable';
import LeadFilters from '../../components/leads/LeadFilters';
import FloatingInput from '../../components/common/FloatingInput';
import FloatingSelect from '../../components/common/FloatingSelect';
import CommonPagination from '../../components/common/pagination/CommonPagination';
import TableContainer from '../../components/common/Table/TableContainer';

const LeadQualification = () => {
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

  const [qualificationForm, setQualificationForm] = useState({
    status: '',
    notes: '',
    nextFollowUp: ''
  });

  const [errors, setErrors] = useState({});

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
  ]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    setQualificationForm({
      status: lead.status,
      notes: lead.qualificationNotes || '',
      nextFollowUp: lead.nextFollowUp ? new Date(lead.nextFollowUp).toISOString().split('T')[0] : ''
    });
    onFormOpen();
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!qualificationForm.status) {
      newErrors.status = 'Status is required';
    }
    
    if (!qualificationForm.notes.trim()) {
      newErrors.notes = 'Notes are required';
    }
    
    if (!qualificationForm.nextFollowUp) {
      newErrors.nextFollowUp = 'Follow-up date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // TODO: Implement API call to update lead qualification
      console.log('Updating lead qualification:', {
        leadId: selectedLead.leadId,
        ...qualificationForm
      });
      setIsLoading(false);
      onFormClose();
      setSelectedLead(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQualificationForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
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

  const statuses = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal',
    'Negotiation',
    'Won',
    'Lost'
  ];

  return (
    <Box p={6}>
      <HStack justify="space-between" mb={6}>
        <Text variant="pageTitle">Lead Qualification</Text>
        <Text className="text-[11px] sm:text-[13px] text-gray-500">
          Qualify and update lead status with notes and follow-up dates.
        </Text>
      </HStack>

      <LeadFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <TableContainer>
        <LeadTable
          leads={paginatedLeads}
          onView={handleView}
          onEdit={handleView}
          isLoading={isLoading}
        />
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </TableContainer>

      {/* Qualification Modal */}
      {isFormOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                Qualify Lead: {selectedLead.name}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Status */}
                <FloatingSelect
                  id="status"
                  name="status"
                  label="Status"
                  value={qualificationForm.status}
                  onChange={handleChange}
                  error={errors.status}
                  required
                  options={statuses}
                  placeholder="Select Status"
                />

                {/* Notes */}
                <FloatingInput
                  type="textarea"
                  id="notes"
                  name="notes"
                  label="Qualification Notes"
                  value={qualificationForm.notes}
                  onChange={handleChange}
                  error={errors.notes}
                  required
                />

                {/* Next Follow-up Date */}
                <FloatingInput
                  type="date"
                  id="nextFollowUp"
                  name="nextFollowUp"
                  label="Next Follow-up Date"
                  value={qualificationForm.nextFollowUp}
                  onChange={handleChange}
                  error={errors.nextFollowUp}
                  required
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onFormClose}
                    className="px-4 py-2 text-[11px] sm:text-[13px] text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-[11px] sm:text-[13px] text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update Qualification
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default LeadQualification; 