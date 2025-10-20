"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Github, Twitter, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 mt-auto">
      <div className="container-dashboard">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="ZaraHarvest Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  ZaraHarvest
                </span>
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                Empowering African farmers with AI-powered yield prediction and
                decentralized financing.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-0 px-3 py-1.5 rounded-full font-semibold">
                  Powered by Hedera
                </Badge>
                <Badge className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-0 px-3 py-1.5 rounded-full font-semibold">
                  AI-Powered
                </Badge>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Platform
              </h3>
              <ul className="space-y-3">
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    Yield Predictions
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    DeFi Lending
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    Supply Chain
                  </Button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    API Reference
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    Tutorials
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
                  >
                    Community
                  </Button>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Connect
              </h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 p-0 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                >
                  <Github className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 p-0 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                >
                  <Twitter className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-12 w-12 p-0 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
                >
                  <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </Button>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white shadow-lg shadow-green-600/30 dark:shadow-green-600/20 rounded-2xl px-6 py-3 font-semibold transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98]">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View on Hedera
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent my-12"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-base text-gray-600 dark:text-gray-300">
              <span className="font-medium">© 2025 ZaraHarvest</span>
              <span className="text-gray-400">•</span>
              <Button
                variant="link"
                className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
              >
                Privacy Policy
              </Button>
              <span className="text-gray-400">•</span>
              <Button
                variant="link"
                className="h-auto p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors duration-200"
              >
                Terms of Service
              </Button>
            </div>
            <div className="flex items-center gap-3 text-base text-gray-600 dark:text-gray-300">
              <span className="font-medium">Built for African Farmers</span>
              <Badge className="bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-0 px-3 py-1.5 rounded-full font-bold">
                Beta
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
