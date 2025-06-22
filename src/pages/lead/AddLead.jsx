import React from 'react';
import LeadForm from '../../components/leads/LeadForm';

const AddLead = () => {
  const handleSubmit = (formData) => {
    // TODO: Implement API call to save lead
    console.log('Saving lead:', formData);
  };

  const handleCancel = () => {
    // TODO: Implement navigation back to leads list
    console.log('Cancelling...');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">Add New Lead</h2>
        <p className="mt-1 text-[11px] sm:text-[13px] text-gray-500">
          Enter the details of the new lead below.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <LeadForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AddLead; 