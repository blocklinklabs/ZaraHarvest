"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  Gauge,
  RefreshCw,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  CropIcon,
  TreePalm,
} from "lucide-react";

interface WeatherData {
  location: {
    name: string;
    country: string;
    region: string;
    latitude: number;
    longitude: number;
  };
  current: {
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: string;
    visibility: number;
    uvIndex: number;
    condition: string;
    icon: string;
    feelsLike: number;
    precipitation: number;
    cloudCover: number;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    avgTemp: number;
    humidity: number;
    condition: string;
    precipitation: number;
    windSpeed: number;
  }>;
}

export default function WeatherControlCenter() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeatherData = async (location?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      let url = "/api/weather";
      if (location) {
        url += `?location=${encodeURIComponent(location)}`;
      } else {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const response = await fetch(
                `/api/weather?lat=${latitude}&lon=${longitude}`
              );

              if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
              }

              const responseText = await response.text();
              if (!responseText || responseText.trim() === "") {
                throw new Error("Empty response from weather API");
              }

              let data;
              try {
                data = JSON.parse(responseText);
              } catch (parseError) {
                console.error("Failed to parse weather response:", parseError);
                throw new Error("Invalid JSON response");
              }

              if (data.success) {
                setWeatherData(data.data);
                setLastUpdated(new Date());
              } else {
                throw new Error(data.error || "Failed to fetch weather data");
              }
              setIsLoading(false);
            },
            () => {
              // Fallback to default location if geolocation fails
              fetchWeatherData("Kumasi,Ghana");
            }
          );
          return;
        } else {
          // Fallback to default location
          url += "?location=Kumasi,Ghana";
        }
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const responseText = await response.text();
      if (!responseText || responseText.trim() === "") {
        throw new Error("Empty response from weather API");
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse weather response:", parseError);
        throw new Error("Invalid JSON response");
      }

      if (data.success) {
        setWeatherData(data.data);
        setLastUpdated(new Date());
      } else {
        throw new Error(data.error || "Failed to fetch weather data");
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWeatherIcon = (condition: string, temperature: number) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("sun") || conditionLower.includes("clear")) {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    } else if (conditionLower.includes("cloud")) {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    } else if (conditionLower.includes("rain")) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else {
      return <Sun className="h-8 w-8 text-orange-500" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 20) return "text-blue-600";
    if (temp < 30) return "text-green-600";
    if (temp < 35) return "text-orange-600";
    return "text-red-600";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getUVIndexLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: "Low", color: "bg-green-500" };
    if (uvIndex <= 5) return { level: "Moderate", color: "bg-yellow-500" };
    if (uvIndex <= 7) return { level: "High", color: "bg-orange-500" };
    if (uvIndex <= 10) return { level: "Very High", color: "bg-red-500" };
    return { level: "Extreme", color: "bg-purple-500" };
  };

  if (isLoading) {
    return (
      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center">
              <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            Weather Control Center
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="space-y-6">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weatherData) {
    return (
      <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
        <CardHeader className="p-8 pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center">
              <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            Weather Control Center
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Cloud className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-medium">
              {error || "Unable to fetch weather data"}
            </p>
            <Button
              onClick={() => fetchWeatherData()}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 dark:shadow-blue-600/20 rounded-2xl px-8 py-4 font-semibold text-lg transition-all duration-200 transform-gpu will-change-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <RefreshCw className="h-5 w-5 mr-3" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const uvInfo = getUVIndexLevel(weatherData.current.uvIndex);

  return (
    <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 shadow-2xl shadow-gray-900/5 dark:shadow-black/20 rounded-3xl overflow-hidden">
      <CardHeader className="p-8 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center">
              <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            Weather Control Center
          </CardTitle>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => fetchWeatherData()}
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-all duration-200 transform-gpu will-change-transform hover:scale-105 active:scale-95"
            >
              <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Button>
            {lastUpdated && (
              <Badge className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-0 px-3 py-1 rounded-full font-semibold text-sm">
                Updated {lastUpdated.toLocaleTimeString()}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-300 font-medium mt-2">
          <MapPin className="h-5 w-5" />
          {weatherData.location.name}, {weatherData.location.region},{" "}
          {weatherData.location.country}
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-8">
        {/* Current Weather */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4">
              {getWeatherIcon(
                weatherData.current.condition,
                weatherData.current.temperature
              )}
              <div>
                <div
                  className={`text-4xl font-bold ${getTemperatureColor(
                    weatherData.current.temperature
                  )}`}
                >
                  {weatherData.current.temperature}°C
                </div>
                <div className="text-lg text-muted-foreground">
                  Feels like {weatherData.current.feelsLike}°C
                </div>
                <div className="text-sm font-medium">
                  {weatherData.current.condition}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">UV Index</span>
              <Badge className={`${uvInfo.color} text-white`}>
                {weatherData.current.uvIndex} - {uvInfo.level}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Humidity</span>
              <span className="text-sm font-medium">
                {weatherData.current.humidity}%
              </span>
            </div>
          </div>
        </div>

        {/* Weather Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Precipitation</div>
              <div className="text-sm font-medium">
                {weatherData.current.precipitation}mm
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-muted-foreground">Wind</div>
              <div className="text-sm font-medium">
                {weatherData.current.windSpeed} km/h{" "}
                {weatherData.current.windDirection}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-purple-500" />
            <div>
              <div className="text-sm text-muted-foreground">Visibility</div>
              <div className="text-sm font-medium">
                {weatherData.current.visibility} km
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">Pressure</div>
              <div className="text-sm font-medium">
                {weatherData.current.pressure} hPa
              </div>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            3-Day Forecast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {weatherData.forecast.map((day, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 backdrop-blur-sm rounded-3xl border border-blue-200/50 dark:border-blue-800/50 p-6 transform-gpu will-change-transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  {formatDate(day.date)}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/80 dark:bg-gray-800/80 rounded-2xl flex items-center justify-center">
                      {getWeatherIcon(day.condition, day.avgTemp)}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {day.condition}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {day.maxTemp}° / {day.minTemp}°
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-red-500" />
                      <TrendingDown className="h-3 w-3 text-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">
                      Humidity: {day.humidity}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">
                      Rain: {day.precipitation}mm
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm Conditions Alert */}
        <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 backdrop-blur-sm rounded-3xl border border-green-200/50 dark:border-green-800/50 p-8">
          <h4 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-950/50 rounded-xl flex items-center justify-center">
              <span className="text-lg">
                <TreePalm />
              </span>
            </div>
            Farm Conditions
          </h4>
          <div className="space-y-4">
            {weatherData.current.temperature > 30 && (
              <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-2xl border border-orange-200 dark:border-orange-800/50">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-950/50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">⚠️</span>
                </div>
                <div>
                  <div className="font-semibold text-orange-800 dark:text-orange-200 mb-1">
                    High Temperature Alert
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-300">
                    Consider irrigation and shade for your crops
                  </div>
                </div>
              </div>
            )}
            {weatherData.current.humidity > 80 && (
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800/50">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">💧</span>
                </div>
                <div>
                  <div className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                    High Humidity Alert
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    Monitor for fungal diseases and ensure proper ventilation
                  </div>
                </div>
              </div>
            )}
            {weatherData.current.precipitation > 5 && (
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-2xl border border-green-200 dark:border-green-800/50">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-950/50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">☔</span>
                </div>
                <div>
                  <div className="font-semibold text-green-800 dark:text-green-200 mb-1">
                    Good Rainfall
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Reduce irrigation and check drainage systems
                  </div>
                </div>
              </div>
            )}
            {weatherData.current.windSpeed > 20 && (
              <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-2xl border border-yellow-200 dark:border-yellow-800/50">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-950/50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">💨</span>
                </div>
                <div>
                  <div className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                    Strong Winds
                  </div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    Protect young plants and secure structures
                  </div>
                </div>
              </div>
            )}
            {weatherData.current.uvIndex > 7 && (
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-800/50">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-950/50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lg">☀️</span>
                </div>
                <div>
                  <div className="font-semibold text-red-800 dark:text-red-200 mb-1">
                    High UV Index
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300">
                    Provide shade for sensitive crops and protect yourself
                  </div>
                </div>
              </div>
            )}
            {weatherData.current.temperature <= 30 &&
              weatherData.current.humidity <= 80 &&
              weatherData.current.precipitation <= 5 &&
              weatherData.current.windSpeed <= 20 &&
              weatherData.current.uvIndex <= 7 && (
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-2xl border border-green-200 dark:border-green-800/50">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-950/50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg">✅</span>
                  </div>
                  <div>
                    <div className="font-semibold text-green-800 dark:text-green-200 mb-1">
                      Optimal Conditions
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Weather conditions are favorable for farming activities
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
