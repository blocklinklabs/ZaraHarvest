# AgriYield - AI-Powered Yield Prediction for African Farmers

A decentralized AI-powered yield prediction and RWA financing dApp for African smallholder farmers, built on Hedera.

## Features

### 🌱 Core Functionality

- **AI Yield Prediction**: Get accurate crop yield predictions using AI and satellite data
- **DeFi Lending**: Access loans using your future harvest as collateral on Hedera
- **Supply Chain Tracking**: Track your harvest from farm to market with blockchain transparency
- **Tokenization**: Convert your harvest into tradeable tokens for collateral

### 📱 Mobile-First Design

- Responsive design optimized for mobile devices
- Offline capability with local storage
- Simple interface for low-literacy users in rural areas
- Bottom navigation for easy mobile access

### 🔗 Blockchain Integration

- Hedera wallet connection (HashPack)
- HBAR token rewards for data contribution
- HTS (Hedera Token Service) integration for harvest tokenization
- Mock blockchain interactions for MVP

### 🎮 Gamification

- Achievement badges for various activities
- Data contribution rewards
- Progress tracking
- Community engagement

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **UI Components**: Shadcn UI with Tailwind CSS
- **State Management**: Zustand with persistence
- **Charts**: Recharts for data visualization
- **QR Codes**: qrcode.react for supply chain tracking
- **Blockchain**: Hedera JavaScript SDK (mocked for MVP)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd agri-yield
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
agri-yield/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── submit-data/       # Data submission form
│   ├── prediction/        # Yield prediction view
│   ├── lending/          # Lending interface
│   ├── tracker/          # Supply chain tracker
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home/wallet connection
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── MobileNav.tsx     # Mobile navigation
│   └── OfflineIndicator.tsx # Offline status indicator
├── lib/                   # Utilities and configurations
│   ├── store.ts          # Zustand state management
│   ├── utils.ts          # Utility functions
│   └── hedera.ts         # Hedera SDK integration
└── public/               # Static assets
```

## Key Features

### 1. Wallet Connection

- Connect to Hedera wallet (HashPack)
- Mock wallet integration for MVP
- Account ID display and management

### 2. Dashboard

- Overview of farm data, predictions, loans, and tokens
- Real-time statistics
- Quick access to all features
- Achievement badges

### 3. Data Submission

- DePIN data collection form
- Crop type, location, soil moisture, weather notes
- Photo upload capability
- HBAR token rewards for contributions

### 4. Yield Prediction

- AI-powered yield predictions
- Interactive charts and analytics
- Risk assessment
- Confidence levels

### 5. Lending Interface

- Tokenize harvest for collateral
- Apply for loans using harvest tokens
- Interest rate calculation based on risk
- Loan management

### 6. Supply Chain Tracker

- Timeline of harvest journey
- QR code generation for verification
- Blockchain verification
- Location tracking

## Offline Capability

The app is designed to work offline:

- Data is stored locally using Zustand persistence
- Offline indicator shows connection status
- Cached data available when offline
- Automatic sync when connection is restored

## Mobile Navigation

Bottom navigation bar with 6 main sections:

- Home (wallet connection)
- Dashboard
- Submit Data
- Predictions
- Lending
- Tracker

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create new pages in the `app/` directory
2. Add components in the `components/` directory
3. Update the mobile navigation in `components/MobileNav.tsx`
4. Add new state management in `lib/store.ts`

## Deployment

The app is ready for deployment on Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
