/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { X, User, Home, Key } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Label } from "../../../../components/ui/label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  propertyOptions: { id: string; name: string }[];
}

const PERMISSIONS = ["property", "finance", "tenants", "maintenance", "reports"];

const AddCaretakerModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, propertyOptions }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    property: "",
    permissions: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        propertyAccessIds: formData.property === "all" ? [] : [formData.property],
        hasFullAccess: formData.property === "all",
      };

      await onSubmit(payload);
      toast.success("Caretaker added successfully!");
      
      // Reset and close
      setFormData({ name: "", email: "", phone: "", password: "", property: "", permissions: [] });
      onClose();
    } catch (err) {
      console.error("Submit error", err);
      toast.error("Failed to add caretaker");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Toaster position="top-right" richColors/>
      <Card className="w-full max-w-lg dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-3">
            {/* <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg">
              <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div> */}
            <div>
              <CardTitle className="text-xl font-bold">Add New Caretaker</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage property access and permissions
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
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
                    placeholder="John Doe"
                    className="bg-white dark:bg-gray-950/50"
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
                    placeholder="caretaker@example.com"
                    className="bg-white dark:bg-gray-950/50"
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
                    placeholder="0712345678"
                    className="bg-white dark:bg-gray-950/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-white dark:bg-gray-950/50"
                  />
                </div>
              </div>
            </div>

            {/* Property Access */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Home className="h-4 w-4 text-gray-500" />
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
                <Key className="h-4 w-4 text-gray-500" />
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
              <Button type="submit" disabled={isSubmitting} className="hover:text-white hover:bg-primary-600">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  "Add Caretaker"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCaretakerModal;