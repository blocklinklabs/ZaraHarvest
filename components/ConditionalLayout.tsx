"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import OfflineIndicator from "@/components/OfflineIndicator";
import ClientToaster from "@/components/ClientToaster";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

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
      <div className="min-h-screen dashboard-bg">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-16 md:ml-64 min-h-screen">
            <div className="container-dashboard py-6">{children}</div>
            <Footer />
          </main>
        </div>
        <MobileNav />
        <OfflineIndicator />
        <ClientToaster />
      </div>
    );
  }

  // Home page layout (full screen, no sidebar)
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">{children}</main>
      <OfflineIndicator />
      <ClientToaster />
    </div>
  );
}
