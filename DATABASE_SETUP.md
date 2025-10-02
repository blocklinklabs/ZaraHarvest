# Database Setup Guide

This guide will help you set up the database for the AgriYield application using Drizzle ORM with Neon PostgreSQL.

## Prerequisites

1. A Neon account (sign up at [neon.tech](https://neon.tech))
2. Node.js and npm installed
3. The AgriYield project cloned and dependencies installed

## Step 1: Create a Neon Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. It should look like: `postgresql://username:password@host:port/database?sslmode=require`

## Step 2: Configure Environment Variables

1. Copy `env.example` to `.env.local`:

   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your database URL:
   ```env
   DATABASE_URL="postgresql://neondb_owner:password@ep-morning-mountain-adx1841l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
   ```

## Step 3: Generate and Run Migrations

1. Generate the database schema:

   ```bash
   npm run db:generate
   ```

2. Push the schema to your database:
   ```bash
   npm run db:push
   ```

## Step 4: Seed the Database (Optional)

To populate the database with sample data:

```bash
npm run db:seed
```

This will create:

- A demo user (Kwame Asante)
- Sample farm data entries
- Yield predictions
- A loan record
- Harvest tokens
- Badges
- Market prices

## Step 5: View Your Database

You can use Drizzle Studio to view and manage your database:

```bash
npm run db:studio
```

This will open a web interface at `http://localhost:4983` where you can:

- View all tables and data
- Run queries
- Edit records
- Export data

## Database Schema

The database includes the following tables:

### Core Tables

- **users**: User profiles and wallet information
- **farm_data**: Farm data submissions from users
- **yield_predictions**: AI-generated yield predictions
- **loans**: DeFi loan records
- **harvest_tokens**: Tokenized harvest records
- **badges**: User achievements and badges

### Supporting Tables

- **market_prices**: Current market prices for crops
- **supply_chain_events**: Supply chain tracking events

## Available Scripts

- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema changes directly
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with sample data

## Hybrid Storage

The application uses a hybrid storage approach:

1. **Local Storage**: Zustand store persists data locally for offline functionality
2. **Database**: All data is also saved to PostgreSQL for persistence and analytics
3. **Sync**: Data syncs between local storage and database when online

## Troubleshooting

### Connection Issues

- Verify your `DATABASE_URL` is correct
- Check that your Neon database is active
- Ensure your IP is whitelisted (if using IP restrictions)

### Migration Issues

- Make sure your database is empty before running migrations
- Check that all required environment variables are set
- Verify the database user has the necessary permissions

### Seed Issues

- Ensure migrations have been run successfully
- Check that the database connection is working
- Verify the seed script has the correct permissions

## Production Considerations

1. **Environment Variables**: Use secure environment variable management
2. **Connection Pooling**: Consider using connection pooling for production
3. **Backups**: Set up regular database backups
4. **Monitoring**: Monitor database performance and usage
5. **Security**: Use proper authentication and authorization

## Support

For issues with:

- **Neon**: Check [Neon documentation](https://neon.tech/docs)
- **Drizzle**: Check [Drizzle documentation](https://orm.drizzle.team)
- **This project**: Create an issue in the repository
