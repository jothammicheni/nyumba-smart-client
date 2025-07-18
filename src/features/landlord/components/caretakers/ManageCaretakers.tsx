import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuthHeaders } from '../../../../services/authService';

interface Property {
  name: string;
  location: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'caretaker' | 'agent';
  caretakerPermissions: string[];
  propertyAccessIds: string[];
  properties?: Property[];
}

const ManageCaretakers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredRole, setFilteredRole] = useState<'caretaker' | 'agent'>('caretaker');
  const [showDeleteModal, setShowDeleteModal] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://nyumba-smart-server.onrender.com/api/users/caretakers',{ 
          headers:getAuthHeaders(),
        });
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setUsers(data.filter((u: User) => u.role === 'caretaker' || u.role === 'agent'));
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://nyumba-smart-server.onrender.com/api/users/${id}`);
      setUsers(prev => prev.filter(user => user._id !== id));
      setShowDeleteModal(null);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete user');
    }
  };

  const visibleUsers = users.filter(user => user.role === filteredRole);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Manage {filteredRole === 'caretaker' ? 'Caretakers' : 'Agents'}
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilteredRole('caretaker')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filteredRole === 'caretaker' ? 'bg-blue-600 text-white' : 'bg-white border text-blue-600'
          }`}
        >
          View Caretakers
        </button>
        <button
          onClick={() => setFilteredRole('agent')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filteredRole === 'agent' ? 'bg-blue-600 text-white' : 'bg-white border text-blue-600'
          }`}
        >
          View Agents
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleUsers.map(user => (
          <div
            key={user._id}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-sm md:text-base"
          >
            <h2 className="text-lg font-semibold text-gray-800 break-words">{user.name}</h2>
            <p className="text-gray-600 break-words">Phone: {user.phone}</p>

            <p className="text-gray-600">Permissions: 
              <span className="text-gray-800 ml-1">
                {user.caretakerPermissions?.length ? user.caretakerPermissions.join(', ') : 'None'}
              </span>
            </p>

            <div className="text-gray-600">
              <p className="font-medium">Properties:</p>
              <ul className="list-disc ml-5">
                {user.properties && user.properties.length > 0 ? (
                  user.properties.map((prop, i) => (
                    <li key={i}>{prop.name} ({prop.location})</li>
                  ))
                ) : (
                  <li>No properties</li>
                )}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => navigate(`/landlord/dashboard/manage/agents&caretakers/edit/${user._id}`)}
                className="px-3 py-1 rounded-md text-xs md:text-sm bg-yellow-400 hover:bg-yellow-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(user)}
                className="px-3 py-1 rounded-md text-xs md:text-sm bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
            <p className="text-gray-700 text-sm">
              Are you sure you want to delete <span className="font-semibold">{showDeleteModal.name}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal._id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCaretakers;
