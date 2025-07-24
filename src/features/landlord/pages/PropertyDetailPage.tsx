/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building,
  ArrowLeft,
  Plus,
  Trash2,
  Pencil,
  Megaphone,
  User,
  AlertTriangle,
  RefreshCw,
  // Loader2,
} from "lucide-react";
import {
  getProperty,
  createRoom,
  deleteRoom,
  assignTenant,
  removeTenant,
} from "../../../services/propertyService.js";
import AddRoomModal from "../components/AddRoomModal.js";
import AssignTenantModal from "../components/AssignTenantModal.js";
import AdvertisePropertyModal from "../components/AdvertisePropertyModal.js";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Toaster, toast } from "sonner";
import { getAuthHeaders } from "../../../services/authService.js";
import axios from "axios";
import TenantInfoModal from "../components/TenantInfoModal.js";

interface Room {
  _id: string;
  room_number: string;
  status: string;
  tenant?: any;
  tenantInfo?: {
    name: string;
    email: string;
    phone:string;
  };
}

interface Property {
  _id: string;
  name: string;
  city: string;
  area: string;
  rooms: Room[];
}

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdvertiseModalOpen, setIsAdvertiseModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isAssignTenantModalOpen, setIsAssignTenantModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");
 const [showModal, setShowModal] = useState(false)
const [selectedTenant, setSelectedTenant] = useState<{
  roomNumber: string
  name: string
  email: string
  phone?: string
} | null>(null)
// const openTenantModal = (tenantInfo: { name: string; email: string; phone?: string }) => {
//   setSelectedTenant(tenantInfo)
// }

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getProperty(id!);
      setProperty(response.data);
      console.log("Fetched property:", response.data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to fetch property details";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (roomData: any): Promise<boolean> => {
    try {
      await createRoom(id!, roomData);
      setIsAddRoomModalOpen(false);
      fetchProperty();
      toast.success("Room added successfully!");
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to add room";
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(roomId);
        fetchProperty();
        toast.success("Room deleted successfully");
      } catch (err: any) {
        const errorMsg = err.response?.data?.error || "Failed to delete room";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const handleAssignTenant = async (userId: string) => {
    try {
      await assignTenant(selectedRoomId, userId);
      setIsAssignTenantModalOpen(false);
      fetchProperty();
      toast.success("Tenant assigned successfully");
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Failed to assign tenant";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleRemoveTenant = async (roomId: string) => {
    if (window.confirm("Are you sure you want to remove this tenant?")) {
      try {
        await removeTenant(roomId);
        fetchProperty();
        toast.success("Tenant removed successfully");
      } catch (err: any) {
        const errorMsg = err.response?.data?.error || "Failed to remove tenant";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/landlord/properties/${property?._id}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${property?.name}"?`);
    if (!confirmDelete) return;

    toast.loading("Deleting property...");

    try {
      await axios.delete(
        `https://nyumba-smart-server.onrender.com/api/properties/${property?._id}`,
        { headers: getAuthHeaders() }
      );
      toast.dismiss();
      toast.success("Property deleted successfully!");
      navigate("/landlord/properties");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to delete property. Try again.");
      console.error("Delete error:", error);
    }
  };

  const openAssignTenantModal = (roomId: string) => {
    setSelectedRoomId(roomId);
    setIsAssignTenantModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      vacant: "success",
      occupied: "default",
      maintenance: "warning",
      reserved: "outline"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"} className="capitalize">
        {status}
      </Badge>
    );
  };

  if (loading && !property) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-4">
          <div className="h-8 bg-muted/10 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-muted/10 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <Button 
          variant="outline" 
          onClick={() => navigate("/landlord/dashboard/properties")}
          className="bg-primary-600 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <Button 
          variant="outline" 
          onClick={() => navigate("/landlord/properties")}
          className="bg-primary-600 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>
        <Card className="dark:bg-gray-900/50 shadow-md text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto text-warning" />
          <h3 className="mt-4 text-lg font-medium">Property not found</h3>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 space-y-2 animate-fade-in">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate("/landlord/properties")}
          className="w-full sm:w-auto bg-primary-600 text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>
      </div>

      {/* Property Header */}
      <Card className="dark:bg-gray-900/50 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                <Building className="h-6 w-6 text-primary-600 dark:text-primary-600" />
              </div>
              <div>
                <CardTitle>{property.name}</CardTitle>
                <CardDescription>
                  {property.area}, {property.city}
                </CardDescription>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleEdit}
                variant="outline"
                className="bg-black text-white dark:bg-white dark:text-black"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button
                onClick={() => setIsAdvertiseModalOpen(true)}
                variant="outline"
                className="bg-black text-white dark:bg-white dark:text-black"
                className="bg-warning text-warning-foreground bg-yellow-400"
              >
                <Megaphone className="h-4 w-4 mr-2 " />
                Advertise
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{property.rooms.length}</div>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Vacant Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {property.rooms.filter((room) => room.status === "vacant").length}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Section */}
      <Card className="dark:bg-gray-900/50 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Rooms</CardTitle>
              <CardDescription>Manage rooms in this property</CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={fetchProperty}
                className=" text-black"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={() => setIsAddRoomModalOpen(true)}
                className="bg-primary-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </div>
          </div>
        </CardHeader>
        
<CardContent>
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room</TableHead>
          <TableHead>Tenant</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {property.rooms.map((room) => (
          <TableRow key={room._id}>
            <TableCell className="font-medium">
              <div>{room.room_number}</div>
              <div className="mt-1">{getStatusBadge(room.status)}</div>
            </TableCell>

<TableCell>
  {room.status === "occupied" && room.tenantInfo ? (
    <Button
       className=" text-green-600 hover:text-green-800"
      variant="ghost"
      size="sm"
    onClick={() => {
  setSelectedTenant({
    roomNumber: room.room_number ?? "N/A",
    name: room?.tenantInfo?.name ?? "N/A",
    email: room?.tenantInfo?.email ?? "N/A",
    phone: room?.tenantInfo?.phone ?? "N/A",
  })
  setShowModal(true)
}}

    >
      View
    </Button>
  ) : (
    <span className="text-muted-foreground">No tenant</span>
  )}
</TableCell>



            <TableCell className="text-right space-x-2">
              {room.status === "occupied" ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveTenant(room._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openAssignTenantModal(room._id)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Assign
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteRoom(room._id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  {property.rooms.length === 0 && (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No rooms found for this property</p>
    </div>
  )}
</CardContent>


      </Card>

      {/* Modals */}
      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
        onSubmit={handleAddRoom}
        propertyId={id!}
      />

      <AssignTenantModal
        isOpen={isAssignTenantModalOpen}
        onClose={() => setIsAssignTenantModalOpen(false)}
        onSubmit={handleAssignTenant}
        roomId={selectedRoomId}
      />

      {property && (
        <AdvertisePropertyModal
          isOpen={isAdvertiseModalOpen}
          onClose={() => setIsAdvertiseModalOpen(false)}
          property={{
            _id: property._id,
            name: property.name,
            city: property.city,
            area: property.area,
          }}
          onSuccess={() => toast.success("Property listed successfully!")}
        />
        
      )}

      <TenantInfoModal
  open={showModal}
  onClose={() => setShowModal(false)}
  tenantInfo={selectedTenant}
/>
    </div>
  );
};

export default PropertyDetailPage;
