# Pranav Enterprises AI Agent

An intelligent AI-powered chat assistant for printing press services, built with Next.js 14, TypeScript, Supabase, and Claude AI.

## Features

- 🤖 **Smart AI Assistant** - Powered by Anthropic's Claude for natural conversations
- 💬 **Multi-Language Support** - Auto-detects and responds in Kannada, English, or Hindi
- 💰 **Instant Quotations** - Real-time pricing for printing services
- 📊 **Lead Capture** - Automatic lead collection and storage
- 🎨 **Design Assistance** - File guidelines and design recommendations
- 📞 **Human Takeover** - Seamless transfer to human agents when needed
- 🗄️ **Supabase Backend** - Scalable database for leads and chat history

## Services Covered

- Offset Printing
- Digital Printing
- Flex & Vinyl Printing
- Sunboard & Glow Sign Boards
- Banners, Stickers & Labels
- ID Cards & Invitation Cards
- Bill Books
- Lamination & Binding

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
WHATSAPP_NUMBER=your_whatsapp_number
```

### 3. Setup Supabase Database

1. Create a new Supabase project at https://supabase.com
2. Run the SQL commands from `supabase-setup.sql` in your Supabase SQL Editor
3. Copy your project URL and anon key to `.env.local`

### 4. Get Anthropic API Key

1. Sign up at https://console.anthropic.com
2. Create an API key
3. Add it to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

```bash
vercel deploy --prod
```

Make sure to add all environment variables in your Vercel project settings.
