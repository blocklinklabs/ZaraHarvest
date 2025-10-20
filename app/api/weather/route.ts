import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    console.log("Weather API called with:", { location, lat, lon });

    // Return mock weather data for testing
    const mockData = {
      location: {
        name: location || "Kumasi",
        country: "Ghana",
        region: "Ashanti",
        latitude: 6.6885,
        longitude: -1.6244,
      },
      current: {
        temperature: 28,
        humidity: 75,
        pressure: 1013,
        windSpeed: 12,
        windDirection: "NE",
        visibility: 10,
        uvIndex: 7,
        condition: "Partly Cloudy",
        icon: "116",
        feelsLike: 32,
        precipitation: 0,
        cloudCover: 40,
      },
      forecast: [
        {
          date: new Date().toISOString().split("T")[0],
          maxTemp: 30,
          minTemp: 22,
          avgTemp: 26,
          humidity: 70,
          condition: "Partly Cloudy",
          precipitation: 0,
          windSpeed: 10,
        },
        {
          date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          maxTemp: 29,
          minTemp: 21,
          avgTemp: 25,
          humidity: 75,
          condition: "Light Rain",
          precipitation: 2.5,
          windSpeed: 8,
        },
        {
          date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
          maxTemp: 31,
          minTemp: 23,
          avgTemp: 27,
          humidity: 65,
          condition: "Sunny",
          precipitation: 0,
          windSpeed: 15,
        },
      ],
    };

    return NextResponse.json({
      success: true,
      data: mockData,
      timestamp: new Date().toISOString(),
      note: "Using mock data for testing",
    });
  } catch (error) {
    console.error("Error in weather API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
