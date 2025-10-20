"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import OfflineIndicator from "@/components/OfflineIndicator";
import ClientToaster from "@/components/ClientToaster";
import { useSidebar } from "@/lib/sidebar-context";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

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

  if (isDashboardPage) {
    // Dashboard layout with sidebar
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <div className="flex">
          <Sidebar />
          <main
            className={`flex-1 pt-20 min-h-screen bg-white dark:bg-gray-950 transition-all duration-300 ${
              isCollapsed ? "md:ml-20" : "md:ml-80"
            }`}
          >
            <div className="container-dashboard py-8 px-6 lg:px-8">
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
