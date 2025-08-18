/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  MoreHorizontal,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Star,
  MapPin,
  ArrowUpDown,
  Banknote,
  CheckCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Link } from "react-router-dom";
import serviceGigService from "../../../services/serviceGigService";
import { Toaster } from "sonner";
import { Skeleton } from "../../../components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  "pending-review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

export default function ManageGigsPage() {
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteGigId, setDeleteGigId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || gig.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sorting function
  const sortedGigs = [...filteredGigs].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Existing useEffect and handler functions remain unchanged
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await serviceGigService.getGigsByProvider("me", {
          status: statusFilter !== "all" ? statusFilter : undefined,
        });
        setGigs(response.data);
      } catch (error) {
        console.error("Failed to fetch gigs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [statusFilter]);

  const handleDeleteGig = async (gigId: string) => {
    try {
      await serviceGigService.deleteGig(gigId);
      setGigs((prev) => prev.filter((gig) => gig._id !== gigId));
      setDeleteGigId(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleStatusChange = async (gigId: string, newStatus: string) => {
    try {
      await serviceGigService.updateGigStatus(gigId, newStatus as any);
      setGigs((prev) =>
        prev.map((gig) =>
          gig._id === gigId ? { ...gig, status: newStatus } : gig
        )
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  // Formatting functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Card View Component
  const GigCard = ({ gig }: { gig: any }) => (
    <Card className="hover:shadow-lg transition-shadow dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-shrink-0 w-full sm:w-40 h-32 rounded-lg overflow-hidden">
            <img
              src={gig.image || "/placeholder.svg"}
              alt={gig.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {gig.isFeatured && (
              <Badge className="absolute top-2 left-2 bg-primary-600 hover:bg-primary-700 text-xs">
                Featured
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {gig.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Created: {formatDate(gig.createdAt)}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to={`/service-provider/dashboard/manage/gigs/view/${gig._id}`} className="flex items-center w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Gig
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/service-provider/dashboard/manage/gigs/edit/${gig._id}`} className="flex items-center w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/service-provider/dashboard/manage/gigs/analytics/${gig._id}`} className="flex items-center w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                    onClick={() => setDeleteGigId(gig._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {gig.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className={statusColors[gig.status as keyof typeof statusColors]}>
                {gig.status.replace("-", " ")}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {gig.category}
              </Badge>
              {gig.location?.city && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {gig.location.city}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{gig.rating?.toFixed(1) || '0.0'}</span>
                  <span className="text-muted-foreground">({gig.reviewCount || 0})</span>
                </div>
                <div className="text-muted-foreground">{gig.views || 0} views</div>
                <div className="text-muted-foreground">{gig.orders || 0} orders</div>
              </div>

              <div className="flex items-center gap-4">
                <Select
                  value={gig.status}
                  onValueChange={(value) => handleStatusChange(gig._id, value)}
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending-review">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-lg font-bold text-primary-600 dark:text-primary-500">
                  {formatCurrency(gig.price)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Table View Component
  const GigTable = () => (
    <Card className="dark:bg-gray-900/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Service</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => requestSort('status')}
            >
              <div className="flex items-center gap-1">
                Status
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => requestSort('rating')}
            >
              <div className="flex items-center gap-1">
                Rating
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => requestSort('views')}
            >
              <div className="flex items-center gap-1">
                Views
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => requestSort('orders')}
            >
              <div className="flex items-center gap-1">
                Orders
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => requestSort('price')}
            >
              <div className="flex items-center gap-1">
                Price
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedGigs.map((gig) => (
            <TableRow key={gig._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <img
                    src={gig.image || "/placeholder.svg"}
                    alt={gig.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-medium line-clamp-1">{gig.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(gig.createdAt)}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={statusColors[gig.status as keyof typeof statusColors]}>
                  {gig.status.replace("-", " ")}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">{gig.category}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{gig.rating?.toFixed(1) || '0.0'}</span>
                  <span className="text-muted-foreground text-xs">({gig.reviewCount || 0})</span>
                </div>
              </TableCell>
              <TableCell>{gig.views || 0}</TableCell>
              <TableCell>{gig.orders || 0}</TableCell>
              <TableCell className="font-medium text-primary-600 dark:text-primary-500">
                {formatCurrency(gig.price)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/gig/${gig._id}`} className="flex items-center w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/edit/${gig._id}`} className="flex items-center w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                      onClick={() => setDeleteGigId(gig._id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-10 w-10 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter Skeleton */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-48" />
              </div>
            </CardContent>
          </Card>

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Skeleton className="w-full sm:w-40 h-32 rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                      <div className="flex justify-between pt-2">
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-8 w-32" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900/50">
      <Toaster position="top-right" richColors />
      <div className="p-2 bg-transparent">
        <span className="text-2xl font-bold text-primary-600 dark:text-primary-500">
          Provider ServiceHub
        </span>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">

              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-gigs"
                  className="text-primary-600 dark:text-primary-500 font-medium"
                >
                  My Gigs
                </Link>
                <Link
                  to="/orders"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  Orders
                </Link>
              </nav>
            </div>
            <Link to="/service-provider/dashboard/manage/gigs/create-gig">
              <Button className="dark:bg-white bg-primary-600 dark:hover:bg-white/90">
                <Plus className="h-4 w-4 mr-2" />
                Create New Gig
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Your Gigs
          </h1>
          <p className="text-gray-600 text-md dark:text-gray-400">
            Track performance, edit details, and manage your service listings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Gigs</CardTitle>
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary-600 dark:text-primary-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gigs.length}</div>
              <p className="text-xs text-muted-foreground">
                All your service listings
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Gigs</CardTitle>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                {gigs.filter((g) => g.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently visible to clients
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Eye className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                {gigs.reduce((sum, gig) => sum + (gig.views || 0), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                All-time view count
              </p>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Banknote className="h-5 w-5 text-purple-600 dark:text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-500">
                {formatCurrency(
                  gigs.reduce((sum, gig) => sum + (gig.price * (gig.orders || 0)), 0)
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Estimated from orders
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and View Toggle */}
        <Card className="mb-6 dark:bg-gray-950 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search your gigs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 dark:bg-gray-950"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 dark:bg-gray-950">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending-review">Pending Review</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === "cards" ? "table" : "cards")}
                className="hidden sm:flex dark:bg-gray-950"
              >
                {viewMode === "cards" ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Table View
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Card View
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredGigs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No gigs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "You haven't created any gigs yet"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Link to="service-provider/dashboard/manage/gigs/create-gig">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Gig
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {filteredGigs.length > 0 && (
          <>
            {viewMode === "cards" ? (
              <div className="space-y-4">
                {sortedGigs.map((gig) => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </div>
            ) : (
              <GigTable />
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteGigId}
        onOpenChange={() => setDeleteGigId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Gig</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this gig? This action cannot be
              undone and will remove all associated data including reviews and
              orders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteGigId && handleDeleteGig(deleteGigId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Gig
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </div>
  );
}
