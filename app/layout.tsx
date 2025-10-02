import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/Footer";
import OfflineIndicator from "@/components/OfflineIndicator";
import SimulationProvider from "@/components/SimulationProvider";
import DatabaseProvider from "@/components/DatabaseProvider";
import ClientToaster from "@/components/ClientToaster";
import ClientOnly from "@/components/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriYield - AI-Powered Yield Prediction for African Farmers",
  description:
    "Decentralized AI-powered yield prediction and RWA financing dApp for African smallholder farmers, built on Hedera",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClientOnly>
          <DatabaseProvider>
            <SimulationProvider>
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
            </SimulationProvider>
          </DatabaseProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
