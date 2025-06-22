import React from 'react';
import FloatingInput from '../common/FloatingInput';
import FloatingSelect from '../common/FloatingSelect';

const LeadFilters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  const sources = [
    'Facebook Ads',
    'Google Ads',
    'Website',
    'Direct',
    'Referral',
    'Other'
  ];

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
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <FloatingInput
          type="text"
          id="search"
          name="search"
          label="Search leads..."
          value={filters.search}
          onChange={handleChange}
          placeholder="Name, email or phone"
        />

        {/* Status Filter */}
        <FloatingSelect
          id="status"
          name="status"
          label="Status"
          value={filters.status}
          onChange={handleChange}
          options={statuses}
          placeholder="All Statuses"
        />

        {/* Source Filter */}
        <FloatingSelect
          id="source"
          name="source"
          label="Source"
          value={filters.source}
          onChange={handleChange}
          options={sources}
          placeholder="All Sources"
        />

        {/* Date Filter */}
        <FloatingInput
          type="date"
          id="date"
          name="date"
          label="Filter by date"
          value={filters.date}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default LeadFilters; 