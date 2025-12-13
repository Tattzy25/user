# Search Bar Designer - User Dashboard

A production-ready Next.js application for creating and managing custom search bar widgets with AI-powered generation.

## Features

### 🎨 New Drip (Search Bar Generator)
- AI-powered search bar generation using Groq
- Real-time streaming responses
- Live preview with multiple style options
- One-click export to My Designs
- Pre-configured search functionality

### 💼 My Designs
- Professional code editor interface
- Mobile and desktop preview modes
- Easy copy-paste embed codes
- Production-ready HTML widgets
- Responsive design preview

### 📊 My Dashboard
- Real-time search analytics
- User activity monitoring
- Interactive charts and graphs
- Search performance metrics

### ⚙️ Settings
- Account management
- Notification preferences
- Privacy & security controls
- API key management

### 💬 Help Center
- Getting started guide
- Comprehensive FAQs
- Support contact form
- Documentation links

## Tech Stack

- **Framework**: Next.js 16 with Turbopack
- **AI**: Groq SDK (llama-3.3-70b-versatile)
- **Database**: Neon PostgreSQL
- **Search**: Upstash Search + Crawl
- **UI**: Radix UI components
- **Styling**: Tailwind CSS 4
- **TypeScript**: Full type safety

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tattzy25/user.git
   cd user
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   - `GROQ_API_KEY`: Get from https://console.groq.com/keys
   - `DATABASE_URL`: Your Neon database connection string
   - `UPSTASH_REDIS_URL` & `UPSTASH_REDIS_TOKEN`: From Upstash console

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Architecture

### Search Bar Generation Flow
1. User describes desired search bar style in "New Drip"
2. Groq AI streams response with design suggestions
3. Pre-built templates generate clean HTML/CSS code
4. Real-time preview shows the widget
5. User can copy embed code or save to "My Designs"

### Search Integration
- **Upstash Search**: Semantic indexing for instant results
- **Upstash Crawl**: Automatic website indexing
- **Pre-configured**: Works out-of-the-box from signup
- **Real-time**: No additional configuration needed

## Color Scheme

The dashboard uses a clean, professional color palette:
- **Primary**: Black & White
- **Secondary**: Sky Blue (#0ea5e9)
- **Accent**: Sky Blue for interactive elements
- **System Fonts**: For optimal performance

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Component-based architecture
- Responsive-first design

### Key Components
- `app/new-drip/page.tsx`: Search bar generator
- `app/my-designs/page.tsx`: Code editor & preview
- `app/my-dashboard/page.tsx`: Analytics dashboard
- `app/api/chat/route.ts`: Groq streaming API

## Deployment

The application is optimized for:
- Vercel deployment
- Static generation where possible
- API routes for dynamic content
- Environment variable configuration

## Support

For issues or questions:
- Visit the Help page in the dashboard
- Check the FAQ section
- Contact support through the dashboard

## License

Proprietary - All rights reserved
