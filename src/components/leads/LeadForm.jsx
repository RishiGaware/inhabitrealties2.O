import React, { useState, useEffect } from 'react';
import FloatingInput from '../../components/common/FloatingInput';
import FloatingSelect from '../../components/common/FloatingSelect';

const LeadForm = ({ initialData, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    interestedIn: '',
    budget: '',
    status: 'New',
    assignedTo: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    
    if (!formData.source) {
      newErrors.source = 'Source is required';
    }
    
    if (!formData.interestedIn) {
      newErrors.interestedIn = 'Interest is required';
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    }
    
    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assignment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && !isLoading) {
      onSubmit(formData);
    }
  };

  const sources = [
    'Facebook Ads',
    'Google Ads',
    'Website',
    'Direct',
    'Referral',
    'Other'
  ];

  const propertyTypes = [
    '1BHK Apartment',
    '2BHK Apartment',
    '3BHK Apartment',
    'Villa',
    'Commercial Space'
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <FloatingInput
          type="text"
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          disabled={isLoading}
        />

        {/* Email */}
        <FloatingInput
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          disabled={isLoading}
        />

        {/* Phone */}
        <FloatingInput
          type="tel"
          id="phone"
          name="phone"
          label="Phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
          disabled={isLoading}
        />

        {/* Source */}
        <FloatingSelect
          id="source"
          name="source"
          label="Source"
          value={formData.source}
          onChange={handleChange}
          error={errors.source}
          required
          options={sources}
          placeholder="Select Source"
          disabled={isLoading}
        />

        {/* Interested In */}
        <FloatingSelect
          id="interestedIn"
          name="interestedIn"
          label="Interested In"
          value={formData.interestedIn}
          onChange={handleChange}
          error={errors.interestedIn}
          required
          options={propertyTypes}
          placeholder="Select Property Type"
          disabled={isLoading}
        />

        {/* Budget */}
        <FloatingInput
          type="number"
          id="budget"
          name="budget"
          label="Budget"
          value={formData.budget}
          onChange={handleChange}
          error={errors.budget}
          required
          disabled={isLoading}
        />

        {/* Status */}
        <FloatingSelect
          id="status"
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleChange}
          required
          options={statuses}
          disabled={isLoading}
        />

        {/* Assigned To */}
        <FloatingInput
          type="text"
          id="assignedTo"
          name="assignedTo"
          label="Assigned To"
          value={formData.assignedTo}
          onChange={handleChange}
          error={errors.assignedTo}
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-[11px] sm:text-[13px] text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-[11px] sm:text-[13px] text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {initialData ? 'Update Lead' : 'Add Lead'}
        </button>
      </div>
    </form>
  );
};

export default LeadForm; 