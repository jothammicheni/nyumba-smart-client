import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../../../services/authService';
import { Briefcase, CheckCircle, Clock, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';

interface Job {
  id: number;
  client: string;
  address: string;
  service: string;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  amount: number;
}

interface ProviderStats {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  pendingTasks?: number;
}

export default function Tasks() {
  const [loading, setLoading] = useState(true);
  const [providerStats, setProviderStats] = useState<ProviderStats>({
    totalTasks: 0,
    completedTasks: 0,
    completionRate: 0,
    pendingTasks: 0
  });

  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch stats
        const statsResponse = await axios.get('/api/providers/info', {
          headers: getAuthHeaders(),
        });
        setProviderStats(statsResponse.data.data.stats);

        const mockActiveJobs: Job[] = [
          {
            id: 1,
            client: "Sunshine Apartments",
            address: "123 Moi Avenue, Nairobi",
            service: "WiFi Installation",
            date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            status: "scheduled",
            amount: 15000,
          },
          {
            id: 2,
            client: "Green Valley Residences",
            address: "456 Kenyatta Road, Nairobi",
            service: "Network Troubleshooting",
            date: new Date().toISOString(), // Today
            status: "in-progress",
            amount: 5000,
          },
        ];

        const mockCompletedJobs: Job[] = [
          {
            id: 1,
            client: "Mountain View Apartments",
            address: "321 Mombasa Road, Nairobi",
            service: "WiFi Installation",
            date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
            status: "completed",
            amount: 15000,
          },
          {
            id: 2,
            client: "Serene Gardens",
            address: "654 Ngong Road, Nairobi",
            service: "Router Replacement",
            date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
            status: "completed",
            amount: 8000,
          },
        ];

        setActiveJobs(mockActiveJobs);
        setCompletedJobs(mockCompletedJobs);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('Failed to load job data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const handleJobAction = (jobId: number, action: 'start' | 'complete') => {
    toast.info(`Job ${jobId} ${action === 'start' ? 'started' : 'completed'}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className='dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              All assigned jobs
            </p>
          </CardContent>
        </Card>

        <Card className='dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {providerStats.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className='dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {providerStats.totalTasks - providerStats.completedTasks}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs */}
      <Card className='dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription className='text-sm my-2'>Your current and upcoming assignments</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className='dark:bg-primary-600/20 hover:dark:bg-primary-600/30'>
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeJobs.length > 0 ? (
              activeJobs.map((job) => (
                <div key={job.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/50">
                      <Calendar className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{job.service}</h3>
                        <Badge variant={job.status === 'scheduled' ? 'secondary' : 'default'}>
                          {job.status === 'scheduled' ? 'Scheduled' : 'In Progress'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.client}</p>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold">{formatCurrency(job.amount)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(job.date)}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => handleJobAction(job.id, job.status === 'scheduled' ? 'start' : 'complete')}
                    >
                      {job.status === 'scheduled' ? 'Start Job' : 'Complete Job'}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No active jobs at the moment
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Completed Jobs */}
      <Card className='dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Completed Jobs</CardTitle>
              <CardDescription className='text-sm my-2'>Your recently finished assignments</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className='dark:bg-primary-600/20 hover:dark:bg-primary-600/30'>
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedJobs.length > 0 ? (
              completedJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{job.service}</h3>
                      <p className="text-sm text-muted-foreground">{job.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(job.amount)}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(job.date)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No completed jobs to show
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
