"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const { isConnected, account, connect, setConnecting, setError } =
    useWalletStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

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

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border shadow-sm header-height">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">ZaraHarvest</h1>
            </div>
          </div>

          {/* Search Bar (Desktop only) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search farms, crops, or data..."
                className="pl-10 bg-muted/50 border-border focus:bg-background"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="h-9 w-9 p-0"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Notifications */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>You have 3 new notifications</p>
              </TooltipContent>
            </Tooltip>

            {/* Wallet Status */}
            {isConnected ? (
              <div className="flex items-center gap-2">
                <Badge variant="default" className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${"bg-green-500"}`} />
                  <Wallet className="h-3 w-3" />
                  <span className="text-xs">
                    {account?.address?.slice(0, 6)}...
                  </span>
                </Badge>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 w-9 p-0 rounded-full"
                      aria-label="User menu"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt="User" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Farmer Account
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {account?.address}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/submit-data")}
                    >
                      <Leaf className="mr-2 h-4 w-4" />
                      <span>Submit Data</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDisconnect}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Disconnect Wallet</span>
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
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg shadow-green-600/30"
                    aria-label="Connect wallet"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    {isConnectingWallet ? "Connecting..." : "Connect Wallet"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connect your Web3 wallet to access all features</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
