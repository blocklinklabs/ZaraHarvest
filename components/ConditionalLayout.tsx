"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import OfflineIndicator from "@/components/OfflineIndicator";
import ClientToaster from "@/components/ClientToaster";
import { useSidebar } from "@/lib/sidebar-context";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Pages that should have the full dashboard layout (with sidebar)
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

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isDashboardPage) {
    // Dashboard layout with sidebar
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <div className="flex relative">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {isMobile && isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-950 shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Menu
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-8 w-8 p-0 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <Sidebar />
                </div>
              </div>
            </div>
          )}

          <main
            className={`flex-1 pt-20 min-h-screen bg-white dark:bg-gray-950 transition-all duration-300 ${
              isMobile ? "ml-0" : isCollapsed ? "md:ml-20" : "md:ml-80"
            }`}
          >
            <div className="container-dashboard py-4 px-4 md:py-8 md:px-6 lg:px-8">
              {children}
            </div>
            <Footer />
          </main>
        </div>
        <MobileNav />
        <OfflineIndicator />
        <ClientToaster />
      </div>
    );
  }

  // Home page layout (full screen, no sidebar, no header)
  return (
    <div className="min-h-screen">
      <main>{children}</main>
      <OfflineIndicator />
      <ClientToaster />
    </div>
  );
}
