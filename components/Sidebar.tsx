"use client";

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
import { useSidebar } from "@/lib/sidebar-context";
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
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <TooltipProvider>
      <aside
        className={`fixed left-0 top-20 z-30 h-[calc(100vh-5rem)] bg-gradient-to-b from-white/98 via-white/95 to-gray-50/95 dark:from-gray-950/98 dark:via-gray-950/95 dark:to-gray-900/95 backdrop-blur-2xl border-r border-gray-200/50 dark:border-gray-800/50 shadow-[4px_0_24px_-2px_rgba(0,0,0,0.12),8px_0_16px_-4px_rgba(0,0,0,0.08)] dark:shadow-[4px_0_24px_-2px_rgba(0,0,0,0.3),8px_0_16px_-4px_rgba(0,0,0,0.2)] transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-80"
        }`}
      >
        {/* Collapse Toggle */}
        <div
          className={`flex justify-end border-b border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-900/50 ${
            isCollapsed ? "p-4" : "p-6"
          }`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="h-10 w-10 p-0 rounded-xl bg-white/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 transform-gpu will-change-transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-xl rounded-xl"
            >
              <p className="font-semibold text-gray-900 dark:text-white">
                {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent ${
            isCollapsed ? "p-4 space-y-4" : "p-6 space-y-6"
          }`}
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.name} disableHoverableContent={!isCollapsed}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`nav-item w-full rounded-2xl transition-all duration-300 transform-gpu will-change-transform group ${
                      isActive
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    } ${
                      isCollapsed
                        ? "px-3 py-4 justify-center"
                        : "px-6 py-6 justify-start"
                    } relative font-bold hover:scale-[1.02] active:scale-[0.98]`}
                    onClick={() => handleNavigation(item.href)}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <div
                      className={`${
                        isCollapsed
                          ? "w-12 h-12"
                          : isActive
                          ? "w-12 h-12"
                          : "w-11 h-11"
                      } rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-green-200 dark:bg-green-800/50"
                          : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                      }`}
                    >
                      <Icon
                        className={`${
                          isCollapsed
                            ? "h-6 w-6"
                            : isActive
                            ? "h-6 w-6"
                            : "h-5 w-5"
                        } transition-all duration-300 ${
                          isActive
                            ? "text-green-700 dark:text-green-300"
                            : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                        }`}
                      />
                    </div>
                    {!isCollapsed && (
                      <span
                        className={`ml-5 truncate flex-1 text-left text-lg font-bold transition-all duration-300 ${
                          isActive
                            ? "text-green-700 dark:text-green-300"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                    {!isCollapsed && (item as any).badge && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-sm bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/50 text-orange-700 dark:text-orange-300 border border-orange-200/50 dark:border-orange-800/50 px-4 py-2 rounded-full font-bold shadow-md"
                      >
                        {(item as any).badge}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className={`${
                    isCollapsed
                      ? "bg-white/98 dark:bg-gray-950/98 backdrop-blur-2xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl rounded-2xl p-5"
                      : "hidden"
                  }`}
                >
                  <div>
                    <p className="font-black text-gray-900 dark:text-white text-lg">
                      {item.name}
                    </p>
                    <p className="text-base text-gray-600 dark:text-gray-400 mt-2 font-medium">
                      {item.description}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
