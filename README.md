# Pigeon Post 🐦

Send tiny pixel gifts to your friends via carrier pigeon.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option A: Via Vercel Dashboard
1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → Select your GitHub repo
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click Deploy!

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

## Database Schema (Supabase)

```sql
CREATE TABLE deliveries (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  item_name TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Made with ❤️ by Raghvi
