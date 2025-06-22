import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import FloatingInput from '../../../components/common/FloatingInput';

const PropertyTypes = () => {
  const [propertyTypes, setPropertyTypes] = useState([
    {
      _id: "6816f1f6ba050a75d9b2a072",
      typeName: "HOUSE",
      description: "A type of house which contains 1R, 1RK, 1BHK, 2BHK, 3BHK, 4BHK and more",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop",
      published: true
    },
    {
      _id: "6816f1f6ba050a75d9b2a073",
          typeName: "APARTMENT",
      description: "Modern apartments with all amenities including gym, swimming pool, and security",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
      published: true
    },
    {
      _id: "6816f1f6ba050a75d9b2a074",
      typeName: "VILLA",
      description: "Luxury villas with private gardens, pools and premium finishes",
      imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1000&auto=format&fit=crop",
          published: true
        },
        {
      _id: "6816f1f6ba050a75d9b2a075",
      typeName: "COMMERCIAL",
      description: "Commercial properties including office spaces, shops, and warehouses",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
          published: true
        }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    typeName: '',
    description: '',
    image: null,
    published: true
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the new property type to the existing list
    const newPropertyType = {
      _id: Date.now().toString(),
      typeName: formData.typeName,
      description: formData.description,
      imageUrl: previewImage || 'default-property-type.jpg',
      published: formData.published
    };
    setPropertyTypes([...propertyTypes, newPropertyType]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      typeName: '',
      description: '',
      image: null,
      published: true
    });
    setPreviewImage(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium text-gray-900">Property Types</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[13px]"
        >
          <FaPlus size={12} /> Add Property Type
        </button>
      </div>

      {/* Property Types Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {propertyTypes.map((type) => (
          <div key={type._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 overflow-hidden">
              <img
                src={type.imageUrl}
                alt={type.typeName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-[13px] font-medium text-gray-900">{type.typeName}</h3>
              <p className="text-[13px] text-gray-600 mt-1">{type.description}</p>
              <div className="mt-3 flex justify-end gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEdit size={14} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add Property Type</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <FloatingInput
                  type="text"
                  id="typeName"
                  name="typeName"
                  label="Type Name"
                  value={formData.typeName}
                  onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <FloatingInput
                  type="text"
                  id="description"
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-[13px] font-medium mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-[13px]"
                />
                {previewImage && (
                  <div className="mt-2">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-[13px]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  </div>
);
};

export default PropertyTypes; 