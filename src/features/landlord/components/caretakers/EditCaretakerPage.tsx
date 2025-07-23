/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Home, Key, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Label } from "../../../../components/ui/label";
import { getProperties } from "../../../../services/propertyService";
import { getUserById, updateUser } from "../../../../services/caretakerService";
import { Loader } from "../../../../components/Loader";

const PERMISSIONS = ["property", "finance", "tenants", "maintenance", "reports"];

const EditCaretakerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [propertyOptions, setPropertyOptions] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    property: "",
    permissions: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propsRes, userRes] = await Promise.all([
          getProperties(),
          getUserById(id as string),
        ]);

        const propsArray = propsRes.data;
        if (!Array.isArray(propsArray)) throw new Error("Unexpected props shape");
        setPropertyOptions(propsArray.map((p: any) => ({ id: p._id, name: p.name })));

        const user = userRes.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          password: "",
          property: user.hasFullAccess ? "all" : (user.propertyAccessIds?.[0] || ""),
          permissions: user.caretakerPermissions || [],
        });
      } catch (err) {
        console.error("Load error", err);
        toast.error("Failed to load caretaker info");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        propertyAccessIds: formData.property === "all" ? [] : [formData.property],
        hasFullAccess: formData.property === "all",
        caretakerPermissions: formData.permissions,
      };

      if (formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      await updateUser(id as string, payload);
      toast.success("Caretaker updated successfully!");
      setTimeout(() => navigate(-1), 1000);
    } catch (err) {
      console.error("Update error", err);
      toast.error("Failed to update caretaker");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <Loader />

  return (
    <div className="container mx-auto p-4 max-w-3xl bg-">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 dark:border hover:bg-primary-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Caretakers
      </Button>

      <Card className="dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-3">
            {/* <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg">
              <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div> */}
            <div>
              <CardTitle className="text-xl font-bold">Edit Caretaker</CardTitle>
              <p className="text-sm text-muted-foreground">
                Update caretaker details and permissions
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mt-3 border-t border-primary-600/30 pt-3">
                <Label className="text-sm font-medium">Personal Information</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-950/50"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-950/50"
                    placeholder="caretaker@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-950/50"
                    placeholder="0712345678"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">New Password (Optional)</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-950/50"
                    placeholder="Leave blank to keep current"
                  />
                </div>
              </div>
            </div>

            {/* Property Access */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Label className="text-sm font-medium">Property Access</Label>
              </div>
              
              <Select
                name="property"
                required
                value={formData.property}
                onValueChange={(value) => setFormData({...formData, property: value})}
              >
                <SelectTrigger className="bg-white dark:bg-gray-950/50">
                  <SelectValue placeholder="Select property access" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <span>All Properties (Full Access)</span>
                    </div>
                  </SelectItem>
                  {propertyOptions.map(prop => (
                    <SelectItem key={prop.id} value={prop.id}>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span>{prop.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Permissions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Label className="text-sm font-medium">Permissions</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {PERMISSIONS.map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={formData.permissions.includes(permission)}
                      onCheckedChange={() => handleCheckboxChange(permission)}
                    />
                    <Label htmlFor={permission} className="text-sm font-normal">
                      {permission.charAt(0).toUpperCase() + permission.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSaving} className="hover:bg-primary-600 hover:text-white">
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Update Caretaker Details"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCaretakerPage;