"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useWalletStore } from "@/lib/wallet-provider";
import {
  Settings,
  User,
  MapPin,
  Sprout,
  Wallet,
  Shield,
  Bell,
  Palette,
  Database,
  LogOut,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const { isConnected, account, disconnect } = useWalletStore();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    country: "",
    cropType: "",
    farmSize: "",
    farmingExperience: "",
    additionalInfo: "",
  });

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
    currency: "USD",
  });

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else {
      fetchUserData();
    }
  }, [isConnected, router]);

  const fetchUserData = async () => {
    if (!account?.address) return;

    try {
      // Fetch user profile data
      const profileResponse = await fetch(
        `/api/user/profile?walletAddress=${account.address}`
      );
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUserData(profileData.user);
        // Populate form with existing data
        setProfileForm({
          fullName: profileData.user?.name || "",
          email: profileData.user?.email || "",
          phone: profileData.user?.phone || "",
          location: profileData.user?.location || "",
          country: profileData.user?.country || "",
          cropType: profileData.user?.cropType || "",
          farmSize: profileData.user?.farmSize?.toString() || "",
          farmingExperience: profileData.user?.experience?.toString() || "",
          additionalInfo: profileData.user?.additionalInfo || "",
        });
      }

      // Fetch user settings
      const settingsResponse = await fetch(
        `/api/user/settings?walletAddress=${account.address}`
      );
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        if (settingsData.success && settingsData.settings) {
          setSettings({
            notifications: settingsData.settings.notifications ?? true,
            darkMode: settingsData.settings.darkMode ?? false,
            language: settingsData.settings.language ?? "en",
            currency: settingsData.settings.currency ?? "USD",
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: account?.address,
          settings: settings,
        }),
      });

      if (response.ok) {
        toast.success("Settings saved successfully!", {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        });
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      toast.error("Failed to save settings", {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true);
    try {
      const response = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: account?.address,
          ...profileForm,
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!", {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        });
        setShowProfileForm(false);
        // Refresh user data
        await fetchUserData();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile", {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success("Wallet disconnected", {
      icon: <LogOut className="h-4 w-4 text-blue-500" />,
    });
    router.push("/");
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>Your personal and farm details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Full Name</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {userData?.name || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {userData?.email || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {userData?.location || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Farm Size</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {userData?.farmSize
                        ? `${userData.farmSize} acres`
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Experience</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {userData?.experience
                        ? `${userData.experience} years`
                        : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Primary Crop</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {userData?.cropType || "Not specified"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wallet Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Information
              </CardTitle>
              <CardDescription>Your connected wallet details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Wallet Address</Label>
                <p className="text-sm text-muted-foreground mt-1 font-mono">
                  {account?.address || "Not connected"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Connected
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisconnect}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive updates about your farm
                  </p>
                </div>
                <Button
                  variant={settings.notifications ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: !prev.notifications,
                    }))
                  }
                >
                  {settings.notifications ? "On" : "Off"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Button
                  variant={settings.darkMode ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      darkMode: !prev.darkMode,
                    }))
                  }
                >
                  {settings.darkMode ? "Dark" : "Light"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Currency</Label>
                  <p className="text-xs text-muted-foreground">
                    Display prices in your preferred currency
                  </p>
                </div>
                <select
                  value={settings.currency}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="GHS">GHS</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowProfileForm(!showProfileForm)}
              >
                <User className="h-4 w-4 mr-2" />
                {showProfileForm ? "Hide Profile Form" : "Update Profile"}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push("/dashboard")}
              >
                <Database className="h-4 w-4 mr-2" />
                View Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Profile Update Form */}
          {showProfileForm && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Update Profile</CardTitle>
                <CardDescription>
                  Update your personal and farm information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileForm.fullName}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileForm.location}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profileForm.country}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Input
                      id="cropType"
                      value={profileForm.cropType}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          cropType: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="farmSize">Farm Size (acres)</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      value={profileForm.farmSize}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          farmSize: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="farmingExperience">
                      Farming Experience (years)
                    </Label>
                    <Input
                      id="farmingExperience"
                      type="number"
                      value={profileForm.farmingExperience}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          farmingExperience: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={profileForm.additionalInfo}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        additionalInfo: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={isUpdatingProfile}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isUpdatingProfile ? "Updating..." : "Update Profile"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowProfileForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Save Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={handleSaveSettings}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Wallet</span>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
