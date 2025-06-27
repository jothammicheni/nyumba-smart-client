/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Modal component: AdvertisePropertyModal.tsx
import React, { useState } from 'react';
import { uploadListing } from '../../../services/listingService.js'; // Adjust the import path as necessary

interface Props {
  isOpen: boolean;
  onClose: () => void;
  property: {
    _id: string;
    name: string;
    city: string;
    area: string;
  };
  onSuccess: () => void;
}

const AdvertisePropertyModal: React.FC<Props> = ({ isOpen, onClose, property, onSuccess }) => {
  const [type, setType] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3);
      setImages(files);
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (!type || !price || !deposit || !bathrooms) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('property_id', property._id);
    formData.append('property_name', property.name);
    formData.append('city', property.city);
    formData.append('area', property.area);
    formData.append('type', type);
    formData.append('bathrooms', bathrooms);
    formData.append('price', price);
    formData.append('deposit', deposit);
    images.forEach((img, idx) => {
      formData.append(`images`, img);
    });

    try {
      setLoading(true);
      const response = await uploadListing(formData);
      if (response.success) {
        onSuccess();
        onClose();
      } else {
        setError(response.message || 'Failed to upload listing');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error uploading listing');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Advertise Property</h2>

        {error && <div className="text-red-500 mb-3 text-sm">{error}</div>}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mb-3 w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Property Type</option>
          <option value="Single">Single</option>
          <option value="Bedseater">Bedseater</option>
          <option value="1 Bedroom">1 Bedroom</option>
          <option value="2 Bedroom">2 Bedroom</option>
          <option value="3 Bedroom">3 Bedroom</option>
          <option value="4 Bedroom">4 Bedroom</option>
        </select>

        <select
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          className="mb-3 w-full border rounded px-3 py-2 text-sm dark:bg-white-700 dark:text-white"
        >
          <option value="">Select Bathrooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (Ksh)"
          className="mb-3 w-full border  rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        />
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          placeholder="Deposit (Ksh)"
          className="mb-3 w-full border rounded px-3 border-primary-500 py-2 text-sm dark:bg-gray-700 dark:text-white"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="mb-4 w-full text-sm text-gray-700 dark:text-white"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 text-sm">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 rounded bg-primary-600 text-white text-sm">
            {loading ? 'Posting...' : 'Post Listing'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvertisePropertyModal;
