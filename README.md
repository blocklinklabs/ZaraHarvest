# 🌾 AgriYield - AI-Powered Yield Prediction for African Farmers

A comprehensive agricultural platform that combines AI-powered yield prediction, DeFi lending, and blockchain tokenization to empower African farmers.

## ✨ Features

- **🤖 AI Yield Prediction**: Machine learning models predict crop yields with confidence scores
- **💰 DeFi Lending**: Access to agricultural loans with tokenized harvest as collateral
- **🪙 Tokenization**: Convert harvests into tradeable digital tokens
- **📊 Analytics Dashboard**: Comprehensive farm data visualization
- **🏆 Gamification**: Badges and rewards for data contribution
- **🌍 Supply Chain Tracking**: End-to-end harvest traceability
- **📱 Mobile-First**: Responsive design optimized for mobile devices

## 🚀 Quick Start

### Option 1: Demo Mode (No Database Required)

```bash
# Clone the repository
git clone <repository-url>
cd agri-yield

# Install dependencies
npm install

# Start demo mode
./demo-without-db.sh
```

Visit `http://localhost:3000` to see the demo with simulated data.

### Option 2: Full Database Setup

```bash
# Clone the repository
git clone <repository-url>
cd agri-yield

# Install dependencies
npm install

# Set up database
./setup-database.sh

# Follow the instructions to configure your Neon database
# Then run:
npm run db:push
npm run db:seed
npm run dev
```

## 🗄️ Database Setup

### Prerequisites

1. **Neon Account**: Sign up at [neon.tech](https://neon.tech) (free tier available)
2. **Node.js**: Version 18+ recommended
3. **npm**: Package manager

### Step-by-Step Setup

1. **Create Neon Database**:

   - Go to [console.neon.tech](https://console.neon.tech)
   - Create a new project
   - Copy the connection string

2. **Configure Environment**:

   ```bash
   ./setup-database.sh
   # Edit .env.local with your DATABASE_URL
   ```

3. **Initialize Database**:

   ```bash
   npm run db:push      # Create tables
   npm run db:seed      # Add sample data
   npm run db:studio    # View database (optional)
   ```

4. **Start Development**:
   ```bash
   npm run dev
   ```

## 📊 Database Schema

The application uses PostgreSQL with the following tables:

- **users**: User profiles and wallet information
- **farm_data**: Soil moisture, weather, crop data
- **yield_predictions**: AI-generated yield predictions
- **loans**: DeFi loan records with collateral
- **harvest_tokens**: Tokenized harvest records
- **badges**: User achievements and gamification
- **market_prices**: Real-time crop pricing
- **supply_chain_events**: Harvest tracking

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate migration files
npm run db:push         # Push schema to database
npm run db:migrate      # Run migrations
npm run db:studio       # Open Drizzle Studio
npm run db:seed         # Seed database with sample data

# Utilities
npm run lint            # Run ESLint
```

## 🏗️ Architecture

### Frontend

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Recharts**: Data visualization

### State Management

- **Zustand**: Lightweight state management
- **Hybrid Storage**: Local + Database persistence
- **Real-time Sync**: Automatic data synchronization

### Database

- **Drizzle ORM**: Type-safe database queries
- **Neon PostgreSQL**: Serverless database
- **Migrations**: Version-controlled schema changes

### Blockchain

- **Hedera Hashgraph**: Sustainable blockchain
- **HBAR**: Native cryptocurrency
- **Smart Contracts**: DeFi lending protocols

## 🌍 Ghana-Specific Features

- **Local Crops**: Maize, Cocoa, Rice, Cassava, Wheat
- **Ghana Cedis (GHS)**: Local currency pricing
- **Regional Data**: Kumasi, Takoradi, Tamale, Accra
- **Local Weather**: Ghana-specific climate data
- **Mobile Optimization**: Low-bandwidth friendly

## 📱 Mobile-First Design

- **Responsive Layout**: Works on all screen sizes
- **Touch-Friendly**: Optimized for mobile interaction
- **Offline Support**: Works without internet connection
- **Progressive Web App**: Installable on mobile devices

## 🔒 Security & Privacy

- **Wallet Integration**: Secure blockchain authentication
- **Data Encryption**: All sensitive data encrypted
- **GDPR Compliant**: Privacy-first data handling
- **Local Storage**: Data stored locally when offline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: See `DATABASE_SETUP.md` for detailed setup
- **Issues**: Create an issue in the repository
- **Discord**: Join our community for support

## 🌟 Acknowledgments

- **Neon**: Serverless PostgreSQL database
- **Drizzle**: Type-safe ORM
- **Hedera**: Sustainable blockchain platform
- **African Farmers**: The inspiration for this project

---

**Built with ❤️ for African Farmers**
