"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWalletStore } from "@/lib/wallet-provider";
import {
  Home,
  LayoutDashboard,
  Upload,
  BarChart3,
  DollarSign,
  Clock,
  ChevronLeft,
  ChevronRight,
  Leaf,
  UserPlus,
  Settings,
  FileText,
} from "lucide-react";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    description: "Welcome page",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Farm overview",
  },
  {
    name: "Onboard",
    href: "/onboarding",
    icon: UserPlus,
    description: "Complete registration",
    badge: "Setup",
  },
  {
    name: "Submit Data",
    href: "/submit-data",
    icon: Upload,
    description: "Share farm data",
  },
  {
    name: "My Submissions",
    href: "/my-submissions",
    icon: FileText,
    description: "View submissions",
  },
  {
    name: "Predictions",
    href: "/prediction",
    icon: BarChart3,
    description: "AI yield forecasts",
  },
  {
    name: "Lending",
    href: "/lending",
    icon: DollarSign,
    description: "DeFi loans",
  },
  {
    name: "Tracker",
    href: "/tracker",
    icon: Clock,
    description: "Supply chain tracking",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Account settings",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected } = useWalletStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <TooltipProvider>
      <aside
        className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ${
          isCollapsed ? "sidebar-width-collapsed" : "sidebar-width"
        }`}
      >
        {/* Collapse Toggle */}
        <div className="flex justify-end p-2 border-b border-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 p-0"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.name} disableHoverableContent={!isCollapsed}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`nav-item w-full justify-start text-left ${
                      isActive ? "active" : ""
                    } ${isCollapsed ? "px-2" : "px-3"} relative`}
                    onClick={() => handleNavigation(item.href)}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 truncate flex-1 text-left">
                        {item.name}
                      </span>
                    )}
                    {!isCollapsed && (item as any).badge && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0"
                      >
                        {(item as any).badge}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className={isCollapsed ? "" : "hidden"}
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-2 border-t border-border">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  AgriYield
                </p>
                <p className="text-xs text-muted-foreground">Farm Dashboard</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
