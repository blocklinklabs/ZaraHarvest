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
    badgeNotifications: true,
    loanNotifications: true,
    yieldNotifications: true,
    priceNotifications: true,
    systemNotifications: true,
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
            badgeNotifications:
              settingsData.settings.badgeNotifications ?? true,
            loanNotifications: settingsData.settings.loanNotifications ?? true,
            yieldNotifications:
              settingsData.settings.yieldNotifications ?? true,
            priceNotifications:
              settingsData.settings.priceNotifications ?? true,
            systemNotifications:
              settingsData.settings.systemNotifications ?? true,
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
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Settings
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
              Manage your account settings and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Account Information */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                Account Information
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Your personal and farm details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
                      >
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-3"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-3/4"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                      Full Name
                    </Label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {userData?.name || "Not specified"}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                      Email
                    </Label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {userData?.email || "Not specified"}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                      Location
                    </Label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {userData?.location || "Not specified"}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                      Farm Size
                    </Label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {userData?.farmSize
                        ? `${userData.farmSize} acres`
                        : "Not specified"}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                      Experience
                    </Label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {userData?.experience
                        ? `${userData.experience} years`
                        : "Not specified"}
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                      Primary Crop
                    </Label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {userData?.cropType || "Not specified"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wallet Information */}
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                Wallet Information
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Your connected wallet details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <Label className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                  Wallet Address
                </Label>
                <p className="text-lg font-bold text-gray-900 dark:text-white font-mono break-all">
                  {account?.address || "Not connected"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0 px-4 py-2 rounded-xl font-bold text-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Connected
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisconnect}
                  className="h-12 px-6 border-red-200/50 dark:border-red-700/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                Preferences
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-8">
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-lg font-bold text-gray-900 dark:text-white">
                        All Notifications
                      </Label>
                      <p className="text-base text-gray-600 dark:text-gray-300 font-medium mt-1">
                        Master toggle for all notification types
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
                      className={`h-12 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95 ${
                        settings.notifications
                          ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20"
                          : "border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {settings.notifications ? "On" : "Off"}
                    </Button>
                  </div>
                </div>

                {settings.notifications && (
                  <div className="space-y-4">
                    <Label className="text-lg font-bold text-gray-900 dark:text-white">
                      Notification Types
                    </Label>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          key: "badgeNotifications",
                          label: "Badge Earned",
                          desc: "When you earn new badges",
                          icon: "🏆",
                        },
                        {
                          key: "loanNotifications",
                          label: "Loan Updates",
                          desc: "Loan approvals, payments, and status changes",
                          icon: "💰",
                        },
                        {
                          key: "yieldNotifications",
                          label: "Yield Predictions",
                          desc: "When AI predictions are ready",
                          icon: "📊",
                        },
                        {
                          key: "priceNotifications",
                          label: "Price Alerts",
                          desc: "Market price changes for your crops",
                          icon: "📈",
                        },
                        {
                          key: "systemNotifications",
                          label: "System Updates",
                          desc: "Important app updates and maintenance",
                          icon: "🔔",
                        },
                      ].map((notificationType) => (
                        <div
                          key={notificationType.key}
                          className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-2xl">
                                {notificationType.icon}
                              </div>
                              <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                  {notificationType.label}
                                </p>
                                <p className="text-base text-gray-600 dark:text-gray-300 font-medium">
                                  {notificationType.desc}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant={
                                settings[
                                  notificationType.key as keyof typeof settings
                                ]
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                setSettings((prev) => ({
                                  ...prev,
                                  [notificationType.key]:
                                    !prev[
                                      notificationType.key as keyof typeof settings
                                    ],
                                }))
                              }
                              className={`h-12 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95 ${
                                settings[
                                  notificationType.key as keyof typeof settings
                                ]
                                  ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20"
                                  : "border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              {settings[
                                notificationType.key as keyof typeof settings
                              ]
                                ? "On"
                                : "Off"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-lg font-bold text-gray-900 dark:text-white">
                      Dark Mode
                    </Label>
                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium mt-1">
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
                    className={`h-12 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95 ${
                      settings.darkMode
                        ? "bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 text-white dark:text-gray-900 shadow-xl shadow-gray-800/30 dark:shadow-gray-200/20"
                        : "border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {settings.darkMode ? "Dark" : "Light"}
                  </Button>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-lg font-bold text-gray-900 dark:text-white">
                      Currency
                    </Label>
                    <p className="text-base text-gray-600 dark:text-gray-300 font-medium mt-1">
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
                    className="h-12 px-4 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white font-bold text-lg transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="GHS">GHS</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                onClick={() => setShowProfileForm(!showProfileForm)}
              >
                <User className="h-5 w-5 mr-3" />
                {showProfileForm ? "Hide Profile Form" : "Update Profile"}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                onClick={() => router.push("/dashboard")}
              >
                <Database className="h-5 w-5 mr-3" />
                View Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Profile Update Form */}
          {showProfileForm && (
            <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
              <CardHeader className="p-8 pb-6">
                <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  Update Profile
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                  Update your personal and farm information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={profileForm.fullName}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      className="h-12 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                    >
                      Email
                    </Label>
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
                      className="h-12 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                    >
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profileForm.phone}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="h-12 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="location"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                    >
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profileForm.location}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="h-12 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="country"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                    >
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={profileForm.country}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      className="h-12 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="cropType"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                    >
                      Crop Type
                    </Label>
                    <Input
                      id="cropType"
                      value={profileForm.cropType}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          cropType: e.target.value,
                        }))
                      }
                      className="h-12 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="farmSize"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                    >
                      Farm Size (acres)
                    </Label>
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
                      className="h-12 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="farmingExperience"
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                    >
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
                      className="h-12 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="additionalInfo"
                    className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block"
                  >
                    Additional Information
                  </Label>
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
                    className="bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={isUpdatingProfile}
                    className="flex-1 h-12 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {isUpdatingProfile ? "Updating..." : "Update Profile"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowProfileForm(false)}
                    className="h-12 px-6 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Settings */}
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                  <Save className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                Save Changes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Button
                className="w-full h-12 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-xl font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                onClick={handleSaveSettings}
                disabled={isSaving}
              >
                <Save className="h-5 w-5 mr-2" />
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-6">
              <CardTitle className="flex items-center gap-4 text-2xl font-black text-gray-900 dark:text-white">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              <div className="p-4 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Database
                  </span>
                  <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0 px-4 py-2 rounded-xl font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Connected
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-2xl border border-green-200/50 dark:border-green-800/50">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Wallet
                  </span>
                  <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0 px-4 py-2 rounded-xl font-bold">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Connected
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Notifications
                  </span>
                  <Badge className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-0 px-4 py-2 rounded-xl font-bold">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
