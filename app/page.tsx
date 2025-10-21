"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useWalletStore, walletProvider } from "@/lib/wallet-provider";
import {
  Wallet,
  Leaf,
  TrendingUp,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
  DollarSign,
  Sprout,
  Zap,
  Award,
  AlertCircle,
  Target,
  Heart,
  Lightbulb,
  CloudRain,
  Thermometer,
  LineChart,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const {
    account,
    isConnected,
    isConnecting,
    error,
    connect,
    setConnecting,
    setError,
  } = useWalletStore();

  const [isClient, setIsClient] = useState(false);
  const [hasWeb3, setHasWeb3] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
      title: "Empowering Farmers",
      subtitle: "with AI-driven insights and predictions",
      stat: "85%",
      statLabel: "Prediction Accuracy",
    },
    {
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80",
      title: "Instant Access to Credit",
      subtitle: "Based on your future harvest potential",
      stat: "$45K",
      statLabel: "Loans Distributed",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80",
      title: "Global Market Access",
      subtitle: "Connect directly with premium buyers",
      stat: "150+",
      statLabel: "Active Farmers",
    },
  ];

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined" && window.ethereum) {
      setHasWeb3(true);
    }
  }, []);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Scroll detection for navbar effects
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 10
      ) {
        setScrollDirection(direction);
      }

      setIsScrolled(scrollY > 50);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection]);

  const handleConnectWallet = async () => {
    try {
      setConnecting(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error(
          "MetaMask or another Web3 wallet is not installed. Please install one to continue."
        );
      }

      const account = await walletProvider.connectWallet();
      connect(account);

      toast.success("Wallet Connected!", {
        description: `Connected to ${account.address.slice(
          0,
          6
        )}...${account.address.slice(-4)}`,
      });
    } catch (err: any) {
      const errorMessage =
        err.message || "Failed to connect wallet. Please try again.";
      setError(errorMessage);
      toast.error("Connection Failed", {
        description: errorMessage,
      });
    } finally {
      setConnecting(false);
    }
  };

  const handleGetStarted = () => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      router.push("/onboarding");
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      const isDark = savedDarkMode === "true";
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? scrollDirection === "up"
              ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50"
              : "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
            : "bg-transparent backdrop-blur-none border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isScrolled
                    ? "bg-white/90 dark:bg-gray-800/90 shadow-md"
                    : "bg-white/80 dark:bg-gray-800/80 shadow-lg"
                }`}
              >
                <img
                  src="/logo.png"
                  alt="ZaraHarvest Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className={`text-2xl font-bold transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                ZaraHarvest
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className={`font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                Home
              </a>
              <a
                href="#solution"
                className={`font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                Solution
              </a>
              <a
                href="#about"
                className={`font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                About
              </a>
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={`h-10 w-10 p-0 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun
                    className={`h-5 w-5 transition-all duration-300 ${
                      isScrolled ? "text-amber-600" : "text-amber-600"
                    }`}
                  />
                ) : (
                  <Moon
                    className={`h-5 w-5 transition-all duration-300 ${
                      isScrolled ? "text-indigo-600" : "text-indigo-600"
                    }`}
                  />
                )}
              </Button>

              {!isConnected ? (
                <Button
                  onClick={handleConnectWallet}
                  disabled={isConnecting || !hasWeb3}
                  variant="outline"
                  className={`font-semibold rounded-full px-6 transition-all duration-300 ${
                    isScrolled
                      ? "border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                      : "border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 backdrop-blur-sm"
                  }`}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              ) : (
                <Button
                  onClick={handleGetStarted}
                  className={`font-semibold rounded-full px-6 transition-all duration-300 ${
                    isScrolled
                      ? "bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white"
                      : "bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white shadow-lg backdrop-blur-sm"
                  }`}
                >
                  Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X
                  className={`h-6 w-6 transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                />
              ) : (
                <Menu
                  className={`h-6 w-6 transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div
              className={`md:hidden py-4 space-y-4 animate-in slide-in-from-top transition-all duration-300 ${
                isScrolled
                  ? "border-t border-gray-200 dark:border-gray-800"
                  : "border-t border-white/20 dark:border-gray-800/20 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-b-2xl mx-4"
              }`}
            >
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                Home
              </a>
              <a
                href="#solution"
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                Solution
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                About
              </a>
              {/* Dark Mode Toggle for Mobile */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={`w-full font-semibold rounded-full transition-all duration-300 ${
                  isScrolled
                    ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 backdrop-blur-sm"
                }`}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>

              {!isConnected ? (
                <Button
                  onClick={() => {
                    handleConnectWallet();
                    setMobileMenuOpen(false);
                  }}
                  disabled={isConnecting || !hasWeb3}
                  variant="outline"
                  className={`w-full font-semibold rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                      : "border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 backdrop-blur-sm"
                  }`}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleGetStarted();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full font-semibold rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white"
                      : "bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white shadow-lg backdrop-blur-sm"
                  }`}
                >
                  Dashboard
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 pb-24 lg:pt-44 lg:pb-36 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50 dark:from-gray-900/50 dark:via-gray-800 dark:to-gray-900/50" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0 px-4 py-2 text-sm font-medium rounded-full">
                Agriculture
              </Badge>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tighter">
                  Farming shouldn't be
                  <span className="block text-emerald-600 dark:text-emerald-400 mt-3">
                    this hard
                  </span>
                  <span className="block mt-3">anymore.</span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-normal">
                  We're making farming easier, smarter, and more profitable for
                  African farmers with AI-powered insights, blockchain security,
                  and direct market access.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-lg font-semibold rounded-full px-10 py-7 shadow-xl shadow-emerald-600/25 dark:shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                {!isConnected && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleConnectWallet}
                    disabled={isConnecting || !hasWeb3}
                    className="border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 text-lg font-semibold rounded-full px-10 py-7 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isConnecting ? "Connecting..." : "Learn More"}
                  </Button>
                )}
              </div>
            </div>

            {/* Right Content - Carousel */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Carousel Images */}
                <div className="relative w-full h-[500px] lg:h-[600px]">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.image}')` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Enhanced Overlay Card - Apple Style */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-800/50">
                  <div className="flex items-center justify-between gap-8">
                    {/* Animated Text Content */}
                    <div className="flex-1 space-y-2">
                      <h3
                        className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-all duration-500"
                        key={`title-${currentSlide}`}
                      >
                        {heroSlides[currentSlide].title}
                      </h3>
                      <p
                        className="text-base text-gray-600 dark:text-gray-300 font-light transition-all duration-500"
                        key={`subtitle-${currentSlide}`}
                      >
                        {heroSlides[currentSlide].subtitle}
                      </p>
                    </div>

                    {/* Stat Display */}
                    <div className="text-right space-y-1">
                      <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                        {heroSlides[currentSlide].stat}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {heroSlides[currentSlide].statLabel}
                      </p>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex flex-col gap-2">
                      {heroSlides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? "bg-emerald-600 dark:bg-emerald-400 h-8"
                              : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Card Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0 px-5 py-2.5 text-sm font-semibold rounded-full mb-6">
              OUR SOLUTION
            </Badge>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1] mb-6">
              Technology That
              <span className="block text-emerald-600 dark:text-emerald-400 mt-2">
                Actually Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We've built the tools that farmers actually need - simple,
              effective, and designed for real-world farming challenges.
            </p>
          </div>

          {/* Main Feature Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {/* AI-Powered Predictions */}
            <Card className="group border-0 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-500 bg-white dark:bg-gray-800 overflow-hidden hover:scale-[1.02]">
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <LineChart className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-white/90 dark:bg-gray-800/90 text-emerald-700 dark:text-emerald-300 border-0 px-3 py-1 text-xs font-semibold rounded-full">
                    AI Technology
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Smart Yield Predictions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get accurate harvest forecasts using AI trained on African
                  farming data. Know exactly what to expect before you plant.
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Security */}
            <Card className="group border-0 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-500 bg-white dark:bg-gray-800 overflow-hidden hover:scale-[1.02]">
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-white/90 dark:bg-gray-800/90 text-blue-700 dark:text-blue-300 border-0 px-3 py-1 text-xs font-semibold rounded-full">
                    Blockchain
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Secure Transactions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your harvest data and transactions are protected by blockchain
                  technology. Transparent, secure, and tamper-proof.
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>

            {/* Market Access */}
            <Card className="group border-0 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-500 bg-white dark:bg-gray-800 overflow-hidden hover:scale-[1.02]">
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=800&q=80')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <DollarSign className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-white/90 dark:bg-gray-800/90 text-orange-700 dark:text-orange-300 border-0 px-3 py-1 text-xs font-semibold rounded-full">
                    Market Access
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  Direct Market Access
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Connect directly with buyers, get fair prices, and skip the
                  middleman. Your harvest, your profit.
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Real Impact, Real Results
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Numbers that matter to farmers like you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  value: "150+",
                  label: "Hectares Optimized",
                  description: "Farmland using our technology",
                  icon: Sprout,
                  color: "emerald",
                },
                {
                  value: "25+",
                  label: "Farmers Supported",
                  description: "Growing their income daily",
                  icon: Users,
                  color: "blue",
                },
                {
                  value: "15%",
                  label: "Average Yield Increase",
                  description: "More crops, more profit",
                  icon: TrendingUp,
                  color: "orange",
                },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                      stat.color === "emerald"
                        ? "bg-emerald-100 dark:bg-emerald-900/30"
                        : stat.color === "blue"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-orange-100 dark:bg-orange-900/30"
                    }`}
                  >
                    <stat.icon
                      className={`h-8 w-8 ${
                        stat.color === "emerald"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : stat.color === "blue"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-orange-600 dark:text-orange-400"
                      }`}
                    />
                  </div>
                  <p className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50/80 to-emerald-50/80 dark:from-gray-900 dark:to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0 px-5 py-2.5 text-sm font-semibold rounded-full mb-6">
              SEE IT IN ACTION
            </Badge>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1] mb-6">
              Watch ZaraHarvest
              <span className="block text-emerald-600 dark:text-emerald-400 mt-2">
                Transform Farming
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See how Irene from Ghana uses ZaraHarvest to help her mom's okro
              farm. From AI predictions to blockchain loans—real results, real
              impact.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20 dark:shadow-black/40">
              <iframe
                src="https://www.youtube.com/embed/El_fcDWuibo"
                title="ZaraHarvest Demo - Transforming African Agriculture"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Overlay Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-500 rounded-full animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse delay-1000" />
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-lg font-semibold rounded-full px-10 py-6 shadow-xl shadow-emerald-600/25 dark:shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Try ZaraHarvest Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Story Section */}
      {/* <section
        id="solution"
        className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0 px-5 py-2.5 text-sm font-semibold rounded-full mb-6">
              SUCCESS STORIES FROM GHANA
            </Badge>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter leading-[1.1]">
              Real Farmers, Real Results
            </h2>
            <h3 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1]">
              From Ghana to the World
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                name: "Kwame Asante",
                location: "Kumasi, Ghana",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
                quote:
                  "Before ZaraHarvest, I was guessing when to plant and harvest. Now I know exactly when my crops will be ready. My maize yield increased by 20% in just one season!",
                impact: "20% Yield Increase",
              },
              {
                name: "Ama Osei",
                location: "Tamale, Ghana",
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&q=80",
                quote:
                  "The weather alerts saved my entire tomato farm during the unexpected rains. I was able to harvest before the storm and didn't lose a single plant.",
                impact: "Saved 100% of Crops",
              },
            ].map((story, index) => (
              <Card
                key={index}
                className="border-0 rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-96">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${story.image}')` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <div className="mb-6 relative">
                      <div className="text-5xl text-emerald-400 font-serif absolute -top-4 -left-2 opacity-50">
                        "
                      </div>
                      <p className="text-lg leading-relaxed relative pl-6">
                        {story.quote}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                      <div>
                        <p className="font-bold text-xl mb-1">{story.name}</p>
                        <p className="text-sm text-gray-300">
                          {story.location}
                        </p>
                      </div>
                      <Badge className="bg-emerald-600 text-white border-0 px-4 py-2 font-semibold">
                        {story.impact}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Solutions Section */}
      <section id="about" className="py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0 px-5 py-2.5 text-sm font-semibold rounded-full mb-6">
              BENEFIT OF AGRICULTURE
            </Badge>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1]">
              What ZaraHarvest Solutions
            </h2>
            <h3 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1]">
              Are You Seeking?
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: LineChart,
                title: "Smart Farming Technology",
                description:
                  "IoT-enabled devices monitor crops and soil, while real-time analytics support better decision-making.",
              },
              {
                icon: DollarSign,
                title: "Market Access and Insights",
                description:
                  "Connect farmers to buyers through our marketplace and gain insights into crop demand and pricing trends.",
              },
              {
                icon: Lightbulb,
                title: "Education and Training",
                description:
                  "Resources and training help farmers adopt modern farming methods and embrace sustainability and solutions.",
              },
            ].map((solution, index) => (
              <Card
                key={index}
                className="border-0 rounded-3xl shadow-lg hover:shadow-xl dark:shadow-2xl dark:hover:shadow-3xl transition-all group bg-white dark:bg-gray-800"
              >
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-colors">
                    <solution.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {solution.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/30 dark:to-teal-950/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <Badge className="bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 border-0 px-5 py-2.5 text-sm font-semibold rounded-full shadow-sm">
                WHY ZARAHARVEST
              </Badge>

              <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white leading-tight tracking-tighter">
                Innovative, Sustainable, and Efficient Solutions
              </h2>

              <div className="space-y-6">
                {[
                  {
                    number: "01",
                    title: "Precision Agriculture with IoT and Sensors",
                    description:
                      "Real-time monitoring of soil health, moisture levels, weather conditions, and crop growth using IoT devices and sensors.",
                  },
                  {
                    number: "02",
                    title: "Smart Irrigation Systems",
                    description:
                      "Automated irrigation based on soil moisture and weather data to optimize water usage and reduce waste.",
                  },
                  {
                    number: "03",
                    title: "AI-Powered Crop Management",
                    description:
                      "Machine learning algorithms analyze data to provide insights on crop health, pest detection, and yield predictions.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-6 items-start group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 shadow-md group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 group-hover:text-white transition-colors flex-shrink-0">
                      {item.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <div
                  className="w-full h-[600px] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80')",
                  }}
                />
              </div>

              {/* Floating Cards */}
              <Card className="absolute -bottom-8 -left-8 w-64 border-0 shadow-xl bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">+25%</p>
                      <p className="text-sm text-gray-600">Yield Increase</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -top-8 -right-8 w-64 border-0 shadow-xl bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Thermometer className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        Real-time
                      </p>
                      <p className="text-sm text-gray-600">Data Monitoring</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Powered By Section */}
      <section className="py-20 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Powered By Enterprise Technology
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Built on the best technology available
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
              {/* Hedera */}
              <div className="flex flex-col items-center space-y-6 group">
                <div className="w-28 h-28 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105 border border-emerald-500/20 transform-gpu will-change-transform p-4">
                  <img
                    src="/hedera logo.png"
                    alt="Hedera Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Hedera
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Blockchain Network
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs leading-relaxed">
                  Fast, sustainable, and affordable. Perfect for farmers with
                  enterprise-grade security and low transaction costs.
                </p>
              </div>

              {/* Google Gemini AI */}
              <div className="flex flex-col items-center space-y-6 group">
                <div className="w-28 h-28 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-105 border border-emerald-500/20 transform-gpu will-change-transform p-4">
                  <img
                    src="/gemini-logo.webp"
                    alt="Google Gemini AI Logo"
                    className="w-40 h-40 object-contain"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Google Gemini AI
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Advanced AI Model
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-xs leading-relaxed">
                  85% accuracy in harvest predictions. Trained specifically for
                  African agriculture with cutting-edge machine learning.
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-semibold">
                  Enterprise Security
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-semibold">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-semibold">Globally Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 text-white relative overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.2),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-10">
            <Badge className="bg-emerald-600 text-white border-0 px-5 py-2.5 text-sm font-semibold rounded-full shadow-lg">
              TRY ZARAHARVEST
            </Badge>

            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1]">
              Ready to Take Your Farm
            </h2>
            <h3 className="text-4xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1]">
              to The Next Level?
            </h3>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white hover:bg-gray-100 text-gray-900 text-lg font-bold rounded-full px-12 py-7 shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {!isConnected && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleConnectWallet}
                  disabled={isConnecting || !hasWeb3}
                  className="border-2 border-white/50 hover:bg-white/10 hover:border-white text-white text-lg font-semibold rounded-full px-12 py-7 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>

            {!hasWeb3 && (
              <Alert className="max-w-md mx-auto border-yellow-500/50 bg-yellow-500/10">
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-200">
                  Please install MetaMask to connect your wallet
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="ZaraHarvest Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ZaraHarvest
              </span>
            </div>

            <div className="flex items-center gap-8 text-gray-600 dark:text-gray-400">
              <a
                href="#"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Product
              </a>
              <a
                href="#"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Solution
              </a>
              <a
                href="#"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Resources
              </a>
              <a
                href="#"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                About
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2025 ZaraHarvest. Empowering African Agriculture with Technology
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
