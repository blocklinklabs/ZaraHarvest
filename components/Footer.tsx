"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Github, Twitter, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container-dashboard">
        <div className="py-6">
          <Separator className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  AgriYield
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering African farmers with AI-powered yield prediction and
                decentralized financing.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Powered by Hedera
                </Badge>
                <Badge variant="outline" className="text-xs">
                  AI-Powered
                </Badge>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Platform
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Yield Predictions
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    DeFi Lending
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Supply Chain
                  </Button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    API Reference
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Tutorials
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Community
                  </Button>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Connect</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Hedera
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© 2025 AgriYield</span>
              <span>•</span>
              <Button
                variant="link"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Button>
              <span>•</span>
              <Button
                variant="link"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built for African Farmers</span>
              <Badge variant="secondary" className="text-xs">
                Beta
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
