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
import {
  Home,
  LayoutDashboard,
  Upload,
  BarChart3,
  DollarSign,
  Clock,
  UserPlus,
} from "lucide-react";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Onboard",
    href: "/onboarding",
    icon: UserPlus,
  },
  {
    name: "Submit",
    href: "/submit-data",
    icon: Upload,
  },
  {
    name: "Predict",
    href: "/prediction",
    icon: BarChart3,
  },
  {
    name: "Lending",
    href: "/lending",
    icon: DollarSign,
  },
];

export default function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected } = useWalletStore();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  if (!isConnected) {
    return null;
  }

  return (
    <TooltipProvider>
      <nav className="mobile-nav md:hidden">
        <div className="flex items-center justify-around">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`mobile-nav-item flex-1 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => handleNavigation(item.href)}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{item.name}</span>
                    {isActive && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </nav>
    </TooltipProvider>
  );
}
