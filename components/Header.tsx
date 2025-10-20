"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWalletStore, walletProvider } from "@/lib/wallet-provider";
import { hederaWallet } from "@/lib/hedera";
import { toast } from "sonner";
import NotificationCenter from "./NotificationCenter";
import {
  Leaf,
  Search,
  Bell,
  Sun,
  Moon,
  Settings,
  LogOut,
  User,
  Wallet,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  RefreshCw,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected, account, connect, setConnecting, setError } =
    useWalletStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);
  const [isLoadingNetwork, setIsLoadingNetwork] = useState(false);

  // Check if we're on a dashboard page
  const dashboardPages = [
    "/dashboard",
    "/submit-data",
    "/my-submissions",
    "/prediction",
    "/lending",
    "/tracker",
    "/settings",
  ];
  const isDashboardPage = dashboardPages.includes(pathname);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    // Store theme preference in localStorage
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const handleConnectWallet = async () => {
    try {
      setIsConnectingWallet(true);
      setConnecting(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error(
          "MetaMask or another Web3 wallet is not installed. Please install one to continue."
        );
      }

      const walletAccount = await walletProvider.connectWallet();
      connect(walletAccount);

      toast.success("Wallet Connected!", {
        description: `Connected to ${walletAccount.address.slice(
          0,
          6
        )}...${walletAccount.address.slice(-4)}`,
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      });
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to connect wallet. Please try again.";
      setError(errorMessage);
      toast.error("Connection Failed", {
        description: errorMessage,
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
      });
    } finally {
      setIsConnectingWallet(false);
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    useWalletStore.getState().disconnect();
    hederaWallet.disconnect();
    toast.success("Wallet Disconnected", {
      description: "You have been successfully disconnected.",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    });
    router.push("/");
  };

  // Network checking functionality
  useEffect(() => {
    if (isConnected) {
      checkNetwork();
    }
  }, [isConnected]);

  const checkNetwork = async () => {
    try {
      const network = await walletProvider.getCurrentNetwork();
      setCurrentNetwork(network);
    } catch (error) {
      console.error("Failed to check network:", error);
      setCurrentNetwork(null);
    }
  };

  const handleSwitchNetwork = async () => {
    setIsLoadingNetwork(true);
    try {
      await walletProvider.switchToRecommendedNetwork();
      await checkNetwork();
      toast.success("Network switched to Hedera Testnet");
    } catch (error: any) {
      toast.error("Failed to switch network", {
        description: error.message || "Please try again",
      });
    } finally {
      setIsLoadingNetwork(false);
    }
  };

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-white/95 via-white/98 to-white/95 dark:from-gray-950/95 dark:via-gray-950/98 dark:to-gray-950/95 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-[0_4px_24px_-2px_rgba(0,0,0,0.12),0_8px_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_-2px_rgba(0,0,0,0.3),0_8px_16px_-4px_rgba(0,0,0,0.2)] h-20">
        <div
          className={`flex items-center justify-between px-6 lg:px-8 h-full ${
            !isDashboardPage ? "max-w-7xl mx-auto" : ""
          }`}
        >
          {/* Logo and Brand */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center transform-gpu will-change-transform group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                <img
                  src="/logo.png"
                  alt="ZaraHarvest Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-green-700 via-emerald-700 to-green-700 dark:from-green-400 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent tracking-tight">
                ZaraHarvest
              </h1>
            </div>
          </div>

          {/* Search Bar (Desktop only) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search farms, crops, or data..."
                className="pl-14 pr-6 py-4 h-14 bg-gray-50/80 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-900 focus:border-green-500/50 dark:focus:border-green-400/50 focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-400/20 rounded-2xl text-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium transition-all duration-200 shadow-sm hover:shadow-md transform-gpu will-change-transform"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="h-14 w-14 p-0 rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 transform-gpu will-change-transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-xl"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <Moon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Notifications */}
            <NotificationCenter />

            {/* Wallet Status */}
            {isConnected ? (
              <div className="flex items-center gap-3">
                <Badge
                  variant="default"
                  className="flex items-center gap-3 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 px-4 py-2 rounded-full font-bold text-base shadow-sm"
                >
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <Wallet className="h-5 w-5" />
                  <span className="text-base font-bold">
                    {account?.address?.slice(0, 6)}...
                  </span>
                </Badge>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-14 w-14 p-0 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                      aria-label="User menu"
                    >
                      <Avatar className="h-12 w-12 shadow-md">
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-lg">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-64 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/10 dark:shadow-black/40 rounded-2xl p-2"
                  >
                    <DropdownMenuLabel className="font-normal px-3 py-2">
                      <div className="flex flex-col space-y-3">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          Farmer Account
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg truncate">
                          {account?.address?.slice(0, 10)}...
                          {account?.address?.slice(-8)}
                        </p>
                        {/* Network Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {currentNetwork ? (
                              <Wifi className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <WifiOff className="h-4 w-4 text-red-600 dark:text-red-400" />
                            )}
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                              {currentNetwork || "Unsupported Network"}
                            </span>
                          </div>
                          {!currentNetwork && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleSwitchNetwork}
                              disabled={isLoadingNetwork}
                              className="h-6 px-2 text-xs font-semibold bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-lg transition-all duration-200"
                            >
                              {isLoadingNetwork ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                "Switch"
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800 my-2" />
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard")}
                      className="rounded-xl mx-1 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <User className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Dashboard
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/submit-data")}
                      className="rounded-xl mx-1 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <Leaf className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Submit Data
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl mx-1 px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                      <Settings className="mr-3 h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        Settings
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800 my-2" />
                    <DropdownMenuItem
                      onClick={handleDisconnect}
                      className="rounded-xl mx-1 px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                      <LogOut className="mr-3 h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="font-medium text-red-700 dark:text-red-400">
                        Disconnect Wallet
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleConnectWallet}
                    disabled={isConnectingWallet}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-xl shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-8 py-4 h-14 font-bold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    aria-label="Connect wallet"
                  >
                    <Wallet className="mr-3 h-6 w-6" />
                    <span>
                      {isConnectingWallet ? "Connecting..." : "Connect Wallet"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">
                    Connect your Web3 wallet to access all features
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
