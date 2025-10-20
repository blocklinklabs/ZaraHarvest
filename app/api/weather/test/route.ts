import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Test the wttr.in API directly
    const testResponse = await fetch("https://wttr.in/Kumasi,Ghana?format=j1", {
      headers: {
        "User-Agent": "ZaraHarvest/1.0",
      },
    });

    const responseText = await testResponse.text();

    return NextResponse.json({
      success: true,
      status: testResponse.status,
      headers: Object.fromEntries(testResponse.headers.entries()),
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 200),
      isJson: (() => {
        try {
          JSON.parse(responseText);
          return true;
        } catch {
          return false;
        }
      })(),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
