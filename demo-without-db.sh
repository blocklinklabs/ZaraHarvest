#!/bin/bash

echo "🚀 AgriYield Demo (Without Database)"
echo "===================================="
echo ""
echo "This will start the app in demo mode with simulated data."
echo "No database setup required!"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🎯 Starting development server..."
echo "   The app will use simulated data instead of a real database."
echo "   Visit http://localhost:3000 to see the demo."
echo ""

# Start the development server
npm run dev
