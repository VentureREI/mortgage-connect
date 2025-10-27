# 🏠 Mortgage Connect

A modern, high-performance mortgage lead generation platform built with Next.js 14, TypeScript, and Material-UI, integrated with GoHighLevel CRM.

## ✨ Features

- **Modern UI/UX**: Material-UI components with Material Blue color scheme
- **Multi-Step Forms**: Intuitive form flow for home buying and refinancing
- **GHL Integration**: Direct connection to your GoHighLevel CRM
- **Fully Responsive**: Mobile-first design that works on all devices
- **Type-Safe**: Built with TypeScript for reliability
- **SEO Optimized**: Server-side rendering with Next.js 14
- **Performance**: Optimized for speed and Core Web Vitals
- **Accessible**: WCAG 2.1 AA compliant

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- GoHighLevel account with API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mortgage-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your credentials:
   - `GHL_API_KEY`: Your GoHighLevel API key
   - `GHL_LOCATION_ID`: Your GHL location ID
   - `GHL_PIPELINE_ID`: Your pipeline ID (optional)
   - `GHL_STAGE_ID`: Your pipeline stage ID (optional)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mortgage-connect/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # API routes
│   │   │   └── submit-lead/   # Lead submission endpoint
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── forms/            # Form components
│   │   │   └── FormSelector.tsx
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # UI components
│   │   └── ThemeProvider.tsx # Material-UI theme wrapper
│   ├── config/               # Configuration files
│   │   ├── brand.config.ts   # Brand settings (colors, text, etc.)
│   │   └── theme.config.ts   # Material-UI theme
│   ├── lib/                  # Utility functions
│   ├── styles/              # Global styles
│   │   └── globals.css
│   └── types/               # TypeScript types
├── public/                   # Static assets
│   └── images/              # Images
├── .env.example             # Environment variables template
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md               # This file
```

## 🎨 Customization

### Updating Brand Colors

Edit `src/config/brand.config.ts`:

```typescript
colors: {
  primary: "#1976d2",        // Change to your brand color
  primaryDark: "#1565c0",    // Darker shade
  primaryLight: "#42a5f5",   // Lighter shade
  // ... other colors
}
```

### Changing Content

All text content is centralized in `src/config/brand.config.ts`:

```typescript
BRAND_CONFIG = {
  name: "Mortgage Connect",
  tagline: "Your custom tagline here",
  contact: {
    phone: "+1 520-645-5533",
    email: "info@yourcompany.com",
    // ...
  },
  // ...
}
```

### Adding Form Fields

Edit `src/components/forms/FormSelector.tsx` and update the `formSchema`:

```typescript
const formSchema = z.object({
  // Add new fields here
  newField: z.string().min(1, 'Field is required'),
  // ...
});
```

## 🔌 GoHighLevel Integration

### Setting Up GHL API

1. **Get your API Key**:
   - Log in to GoHighLevel
   - Go to Settings → API Keys
   - Create a new API key with appropriate permissions

2. **Find your Location ID**:
   - In GHL, go to Settings → Business Info
   - Copy your Location ID

3. **Configure Pipelines** (Optional):
   - Go to Opportunities → Pipelines
   - Note your Pipeline ID and Stage ID
   - Add these to your `.env.local`

### Testing the Integration

1. Submit a test lead through the form
2. Check your GHL account under Contacts
3. Verify the lead appears with correct information

## 📊 Analytics Setup

### Google Analytics

1. Get your GA4 Measurement ID from Google Analytics
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Google Ads Conversion Tracking

1. Get your Conversion ID from Google Ads
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy!

3. **Custom Domain**:
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain (e.g., mortgageconnect.com)
   - Update DNS records as instructed

### Alternative Platforms

- **AWS Amplify**: Similar process to Vercel
- **Netlify**: Connect GitHub repo and deploy
- **Docker**: Build container with `docker build -t mortgage-connect .`

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

### Code Quality

The project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting (add .prettierrc if desired)

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile: 0-600px
- Tablet: 600-960px
- Desktop: 960px+

## ♿ Accessibility

Built with accessibility in mind:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## 🔐 Security

- Environment variables for sensitive data
- API routes with validation
- CORS protection
- Rate limiting (TODO)
- Input sanitization

## 📈 Performance

- Next.js 14 with App Router
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies

## 🐛 Troubleshooting

### Forms not submitting to GHL

1. Check your API key is correct
2. Verify Location ID matches your GHL account
3. Check browser console for errors
4. Review API logs: `npm run dev` and submit a test form

### Styling issues

1. Clear browser cache
2. Check if Material-UI is properly installed
3. Verify theme configuration in `src/config/theme.config.ts`

### Build errors

1. Run `npm install` to ensure all dependencies are installed
2. Check TypeScript errors: `npm run type-check`
3. Verify Node.js version: `node --version` (should be 18+)

## 📞 Support

For issues or questions:
- Email: info@mortgageconnect.com
- Phone: (520) 645-5533

## 📄 License

Proprietary - All rights reserved

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Material-UI](https://mui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

**Version**: 1.0.0  
**Last Updated**: 2025
