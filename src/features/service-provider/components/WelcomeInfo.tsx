import { useEffect, useState } from 'react';
import { Wrench, CalendarDays, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { getAuthHeaders } from '../../../services/authService';
import { Loader } from '../../../components/Loader';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { toast } from 'sonner';

const availabilityColors: Record<string, string> = {
  available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  busy: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  unavailable: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

interface ProviderInfo {
  provider: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    service_category: string;
    joinDate: string;
    createdAt: string;
    availability: string;
    profileImage?: string;
  };
  stats: {
    completionRate: string;
    rating?: number;
  };
}

export default function WelcomeInfo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [providerInfo, setProviderInfo] = useState<ProviderInfo>({
    provider: {
      _id: '',
      name: '',
      email: '',
      phone: '',
      city: '',
      service_category: '',
      joinDate: '',
      createdAt: '',
      availability: 'available'
    },
    stats: {
      completionRate: '0',
    }
  });

  useEffect(() => {
    const fetchProviderInfo = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('https://nyumba-smart-server.onrender.com/api/providers/info', {
          headers: getAuthHeaders(),
        });
        setProviderInfo(response.data.data);
      } catch (error) {
        console.error("Failed to load provider information:", error);
        setError('Failed to load provider information');
        toast.error('Failed to load provider information');
      } finally {
        setLoading(false);
      }
    };

    fetchProviderInfo();
  }, []);

  const handleAvailability = async (newStatus: string) => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.put(
        `/api/providers/${providerInfo.provider._id}/availability`,
        { availability: newStatus },
        { headers: getAuthHeaders() }
      );

      setProviderInfo(prev => ({
        ...prev,
        provider: { ...prev.provider, availability: newStatus }
      }));
      toast.success('Availability updated successfully');
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error('Failed to update availability');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader /></div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!providerInfo) return <div className="text-center capitalize p-4">No service provider information available...</div>;

  const memberSince = new Date(providerInfo.provider.joinDate || providerInfo.provider.createdAt).toLocaleDateString();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-gray-900/50 rounded-lg shadow-md">
        <div className="px-6 py-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  className="h-16 w-16 rounded-full object-cover border-2 border-primary-500"
                  src={providerInfo.provider.profileImage || "https://randomuser.me/api/portraits/women/44.jpg"}
                  alt="User profile"
                />
                <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${availabilityColors[providerInfo.provider.availability]}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Welcome, {providerInfo.provider.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="capitalize dark:bg-primary-600 dark:text-white">
                    {providerInfo.provider.service_category}
                  </Badge>
                  {/* <Badge className={availabilityColors[providerInfo.provider.availability]}>
                    {providerInfo.provider.availability}
                  </Badge> */}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                value={providerInfo.provider.availability}
                onValueChange={handleAvailability}
                disabled={loading}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="dark:bg-white dark:text-black bg-black hover:bg-black/90 hover:text-white text-white">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wrench className="h-4 w-4 text-primary-600" />
              Service Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">
              {providerInfo.provider.service_category}
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary-600" />
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{memberSince}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary-600" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {providerInfo.stats.completionRate}%
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
