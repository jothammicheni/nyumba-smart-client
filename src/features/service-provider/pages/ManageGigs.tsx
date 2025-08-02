/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
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

// Mock data

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  "pending-review": "bg-yellow-100 text-yellow-800",
};

export default function ManageGigsPage() {
  const [gigs, setGigs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteGigId, setDeleteGigId] = useState<string | null>(null);

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch = gig.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || gig.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  //fetch all gigs for provider
  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await serviceGigService.getGigsByProvider("me", {
          status: statusFilter !== "all" ? statusFilter : undefined,
        });
        setGigs(response.data);
      } catch (error) {
        console.error("Failed to fetch gigs:", error);
      }
    };

    fetchGigs();
  }, [statusFilter]);

  //delete gig
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

  const GigCard = ({ gig }: { gig: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative">
            <img
              src={gig.image || "/placeholder.svg"}
              alt={gig.title}
              width={150}
              height={100}
              className="w-24 h-16 object-cover rounded-lg"
            />
            {gig.isFeatured && (
              <Badge className="absolute -top-2 -right-2 bg-primary-600 text-xs">
                Featured
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 truncate pr-2">
                {gig.title}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/gig/${gig.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Gig
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/edit/${gig.id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/analytics/${gig.id}`}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setDeleteGigId(gig.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {gig.description}
            </p>

            <div className="flex items-center gap-4 mb-3">
              <Badge
                className={
                  statusColors[gig.status as keyof typeof statusColors]
                }
              >
                {gig.status.replace("-", " ")}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {gig.category}
              </Badge>
              {/* <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-3 w-3" />
                {gig.location.city}
              </div> */}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{gig.rating}</span>
                  <span>({gig.reviewCount})</span>
                </div>
                <span>{gig.views} views</span>
                <span>{gig.orders} orders</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary-600">
                  ${gig.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                ServiceHub
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600"
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-gigs"
                  className="text-primary-600 font-medium"
                >
                  My Gigs
                </Link>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-primary-600"
                >
                  Orders
                </Link>
              </nav>
            </div>
            <Link to="/service-provider/dashboard/manage/gigs/create-gig">
              <Button className="bg-primary-600 hover:bg-primary-700">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Your Gigs
          </h1>
          <p className="text-gray-600">
            Track performance, edit details, and manage your service listings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Gigs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {gigs.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Gigs</p>
                  <p className="text-2xl font-bold text-green-600">
                    {gigs.filter((g) => g.status === "active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {gigs
                      .reduce((sum, gig) => sum + gig.views, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {gigs.reduce((sum, gig) => sum + gig.orders, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search your gigs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending-review">Pending Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Gigs List */}
        <div className="space-y-4">
          {filteredGigs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No gigs found
                </h3>
                <p className="text-gray-600 mb-6">
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
          ) : (
            filteredGigs.map((gig) => <GigCard key={gig.id} gig={gig} />)
          )}
        </div>
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
