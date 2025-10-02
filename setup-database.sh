#!/bin/bash

echo "🌱 AgriYield Database Setup"
echo "=========================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << 'EOF'
# Database URL - Replace with your actual Neon database URL
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Example for Neon:
# DATABASE_URL="postgresql://neondb_owner:password@ep-morning-mountain-adx1841l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
EOF
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🔧 Next steps:"
echo "1. Sign up for a free Neon account at https://neon.tech"
echo "2. Create a new project in Neon"
echo "3. Copy the connection string from your Neon dashboard"
echo "4. Replace the DATABASE_URL in .env.local with your actual connection string"
echo "5. Run: npm run db:push"
echo "6. Run: npm run db:seed"
echo ""
echo "📚 For detailed instructions, see DATABASE_SETUP.md"
