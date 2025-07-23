"use client"

import React, { useEffect, useState } from "react"
import { User, Lock, Bell, Eye, EyeOff, AlertTriangle, Settings as SettingsIcon } from "lucide-react"
import { toast } from "sonner"
import { settingsService } from "../../../services/settingsService.js"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Switch } from "../../../components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/tabs"
import { Skeleton } from "../../../components/ui/skeleton.js"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import { PasswordStrengthMeter } from "../../../components/ui/password-strength.js"

type Section = "profile" | "account" | "notifications" | "paymentPhone"

interface UserSettings {
  name: string
  email: string
  phone: string
  payoutPhone?: string
}

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("profile")
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    phone: false,
    general: true
  })

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    paymentPhone: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({
    password: "",
    paymentPhone: ""
  })

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  })

  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    push: false
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsService.getCurrentUserSettings()
        setSettings(data)
        setFormData({
          name: data.name,
          email: data.email,
          paymentPhone: data.payoutPhone || "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
        // Simulate fetching notification preferences
        setNotifications({
          email: true,
          sms: false,
          push: true
        })
      } catch {
        toast.error("Failed to load settings")
      } finally {
        setLoading(prev => ({ ...prev, general: false }))
      }
    }

    fetchSettings()
  }, [])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(prev => ({ ...prev, profile: true }))
    try {
      await settingsService.updateProfile({ 
        name: formData.name, 
        email: formData.email 
      })
      toast.success("Profile updated successfully")
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setLoading(prev => ({ ...prev, profile: false }))
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ ...errors, password: "" })

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ ...errors, password: "Passwords don't match" })
      return
    }

    if (formData.newPassword.length < 8) {
      setErrors({ ...errors, password: "Password must be at least 8 characters" })
      return
    }

    setLoading(prev => ({ ...prev, password: true }))
    try {
      await settingsService.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      })
      toast.success("Password updated successfully")
      setFormData({ ...formData, oldPassword: "", newPassword: "", confirmPassword: "" })
    } catch {
      toast.error("Failed to update password")
    } finally {
      setLoading(prev => ({ ...prev, password: false }))
    }
  }

  const handlePaymentPhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ ...errors, paymentPhone: "" })

    if (!formData.paymentPhone.match(/^\d{10,15}$/)) {
      setErrors({ ...errors, paymentPhone: "Enter a valid phone number (10-15 digits)" })
      return
    }

    setLoading(prev => ({ ...prev, phone: true }))
    try {
      await settingsService.updatePaymentPhone(formData.paymentPhone)
      toast.success("Payment phone updated successfully")
    } catch {
      toast.error("Failed to update payment phone")
    } finally {
      setLoading(prev => ({ ...prev, phone: false }))
    }
  }

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
    toast.success(`Notifications ${!notifications[type] ? "enabled" : "disabled"}`)
  }

  if (loading.general) {
    return (
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <Tabs 
        value={activeSection}
        onValueChange={(value) => setActiveSection(value as Section)}
        className="flex flex-col md:flex-row gap-6"
        orientation="vertical"
      >
        {/* Sidebar Navigation */}
        <div className="w-full md:w-80">
          <Card className="border-0 bg-white border shadow-md dark:bg-gray-950">
            <CardHeader>
              <div className="flex items-center gap-3">
                <SettingsIcon className="h-7 w-7 text-primary-600 dark:text-primary-600" />
                <div>
                  <CardTitle className="text-xl">Settings</CardTitle>
                  <CardDescription>Manage your account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TabsList className="flex flex-col items-start gap-4 h-auto bg-transparent p-1">
                <TabsTrigger 
                  value="profile" 
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-primary-50 dark:bg-primary-900/10 dark:text-white data-[state=active]:text-black dark:data-[state=active]:bg-primary-900/20"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-primary-50 dark:bg-primary-900/10 dark:text-white data-[state=active]:text-black dark:data-[state=active]:bg-primary-900/20"
                >
                  <Lock className="h-4 w-4" />
                  <span>Account</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-primary-50 dark:bg-primary-900/10 dark:text-white data-[state=active]:text-black dark:data-[state=active]:bg-primary-900/20"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="paymentPhone" 
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-primary-50 dark:bg-primary-900/10 dark:text-white data-[state=active]:text-black dark:data-[state=active]:bg-primary-900/20"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Payment Phone</span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Profile Section */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="h-5 w-5" />
                  <div>
                    <span>Profile Information</span>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setFormData({
                        ...formData,
                        name: settings?.name || "",
                        email: settings?.email || ""
                      })}
                    >
                      Reset
                    </Button>
                    <Button type="submit" disabled={loading.profile}>
                      {loading.profile ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Security Section */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="h-5 w-5" />
                  <div>
                    <span>Account Security</span>
                    <CardDescription>
                      Manage your password and security settings
                    </CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="oldPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="oldPassword"
                          type={showPasswords.old ? "text" : "password"}
                          value={formData.oldPassword}
                          onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                          placeholder="Enter your current password"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords({...showPasswords, old: !showPasswords.old})}
                        >
                          {showPasswords.old ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                          placeholder="Create a new password"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                        >
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {formData.newPassword && (
                        <PasswordStrengthMeter password={formData.newPassword} />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          placeholder="Confirm your new password"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                        >
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {errors.password && (
                      <div className="text-sm text-red-600 dark:text-red-400">{errors.password}</div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setFormData({
                        ...formData,
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                      })}
                    >
                      Clear
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={loading.password || !formData.oldPassword || !formData.newPassword || !formData.confirmPassword}
                    >
                      {loading.password ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Updating...
                        </>
                      ) : "Update Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Section */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bell className="h-5 w-5" />
                  <div>
                    <span>Notification Preferences</span>
                    <CardDescription>
                      Choose how you want to receive notifications
                    </CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get text message alerts
                      </p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={() => handleNotificationChange('sms')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable app notifications
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationChange('push')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Phone Section */}
          <TabsContent value="paymentPhone">
            <Card className="border-red-600 dark:border-red-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  <div>
                    <span>Payment Phone Number</span>
                    <CardDescription className="text-red-600 dark:text-red-400">
                      This is where your rental payments will be sent
                    </CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Current Payment Phone</p>
                    <p className="font-medium text-lg">
                      {settings?.payoutPhone ? (
                        <span className="text-green-600 dark:text-green-400">
                          {settings.payoutPhone}
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">
                          Not set up yet
                        </span>
                      )}
                    </p>
                  </div>

                  <form onSubmit={handlePaymentPhoneSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="paymentPhone" className="text-red-600 dark:text-red-400">
                        New Payment Phone Number
                      </Label>
                      
                      <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            id="paymentPhone"
                            type="tel"
                            value={formData.paymentPhone}
                            onChange={(e) => setFormData({...formData, paymentPhone: e.target.value})}
                            placeholder="e.g. 254712345678"
                            className={errors.paymentPhone ? "border-red-600 dark:border-red-400" : ""}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter your M-Pesa registered phone number</p>
                        </TooltipContent>
                      </Tooltip>
                      </TooltipProvider>
                      {errors.paymentPhone && (
                        <p className="text-sm text-red-600 dark:text-red-400">{errors.paymentPhone}</p>
                      )}
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setFormData({...formData, paymentPhone: settings?.payoutPhone || ""})}
                      >
                        Reset
                      </Button>
                      <Button 
                        type="submit" 
                        variant="destructive"
                        disabled={loading.phone || !formData.paymentPhone}
                      >
                        {loading.phone ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </>
                        ) : "Update Payment Phone"}
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default Settings