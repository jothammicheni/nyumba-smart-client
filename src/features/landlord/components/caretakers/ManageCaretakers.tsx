import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit2, Trash2, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { getAuthHeaders } from '../../../../services/authService';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Badge } from '../../../../components/ui/badge';
import { toast } from 'sonner';

interface Property {
  name: string;
  location: string;
}

interface UserData {
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
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredRole, setFilteredRole] = useState<'caretaker' | 'agent'>('caretaker');
  const [showDeleteModal, setShowDeleteModal] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/caretakers', { 
          headers: getAuthHeaders(),
        });
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setUsers(data.filter((u: UserData) => u.role === 'caretaker' || u.role === 'agent'));
      } catch (err) {
        console.error('Failed to fetch users', err);
        toast.error('Failed to load users data');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: getAuthHeaders()
      });
      setUsers(prev => prev.filter(user => user._id !== id));
      setShowDeleteModal(null);
      toast.success('User deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete user');
    }
  };

  const visibleUsers = users.filter(user => user.role === filteredRole);

  return (
    <div className="container mx-auto p-4 space-y-6 h-full dark:bg-black/10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Manage {filteredRole === 'caretaker' ? 'Caretakers' : 'Agents'}
          </h1>
          <p className="text-muted-foreground">
            View and manage all {filteredRole === 'caretaker' ? 'caretakers' : 'agents'} in your properties
          </p>
        </div>

        <Select 
          value={filteredRole}
          onValueChange={(value: 'caretaker' | 'agent') => setFilteredRole(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="caretaker">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Caretakers</span>
              </div>
            </SelectItem>
            <SelectItem value="agent">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Agents</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleUsers.map(user => (
          <Card key={user._id} className="transition shadow-lg dark:bg-gray-900">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-100 dark:bg-primary-600/30 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary-600 dark:text-primary-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
                <Badge variant={user.role === 'caretaker' ? 'default' : 'outline'} className='bg-gray-950 dark:bg-white'>
                  {user.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium">Permissions</p>
                <div className="flex flex-wrap gap-1">
                  {user.caretakerPermissions?.length > 0 ? (
                    user.caretakerPermissions.map(permission => (
                      <Badge key={permission} variant="default" className="capitalize bg-gray-950 dark:bg-white">
                        {permission}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No permissions</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Properties</p>
                {user.properties && user.properties.length > 0 ? (
                  <div className="space-y-1">
                    {user.properties.slice(0, 2).map((prop, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-muted-foreground mr-1" />
                        <span>{prop.name}</span>
                      </div>
                    ))}
                    {user.properties.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{user.properties.length - 2} more properties
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No properties assigned</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/landlord/dashboard/manage/agents&caretakers/edit/${user._id}`)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteModal(user)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-sm dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Confirm Deletion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete <span className="font-semibold text-foreground">{showDeleteModal.name}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(null)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(showDeleteModal._id)}
                >
                  Confirm Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ManageCaretakers;