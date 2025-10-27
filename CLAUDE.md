# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Mortgage Connect** is a modern, high-performance mortgage lead generation platform built with Next.js 14, TypeScript, and Material-UI. It integrates with GoHighLevel CRM to capture and manage mortgage leads through multi-step forms for home buying and refinancing scenarios.

## Key Architecture

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material-UI (MUI) v5
- **Form Handling**: React Hook Form + Zod validation
- **Styling**: Emotion (CSS-in-JS)
- **Backend**: Next.js API routes
- **External Integration**: GoHighLevel (GHL) CRM

### Directory Structure
```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   └── submit-lead/   # POST endpoint for lead submission to GHL
│   ├── layout.tsx         # Root layout with ThemeProvider
│   └── page.tsx           # Homepage with form selector
├── components/
│   ├── forms/
│   │   └── FormSelector.tsx   # Multi-step form component
│   └── ThemeProvider.tsx      # MUI theme configuration wrapper
├── config/
│   ├── brand.config.ts        # Centralized brand/content/config (colors, text, contact info)
│   └── theme.config.ts        # MUI theme customization
├── lib/                   # Utility functions (empty currently)
└── types/                 # TypeScript type definitions
```

### Core Data Flow
1. **Homepage** (`src/app/page.tsx`): Displays form selection (Buy/Refinance)
2. **FormSelector** (`src/components/forms/FormSelector.tsx`):
   - 3-step form: Personal Info → Property Details → Financial Info
   - Uses React Hook Form + Zod for validation
   - Client-side component with stepper navigation
3. **API Route** (`src/app/api/submit-lead/route.ts`):
   - POST: Receives form data, creates contact in GHL, optionally creates opportunity
   - GET: Health check endpoint
   - Validates required fields (firstName, lastName, email, phone)
   - Transforms form data to GHL API schema

### Configuration & Customization
All brand content, colors, contact info, legal disclaimers, and analytics IDs are centralized in `src/config/brand.config.ts`. This is the single source of truth for:
- Colors (primary: #00AAFF)
- Company info & contact details
- Form options & text
- Legal disclaimers & compliance settings
- GHL configuration (locationId, API version)
- Analytics (GA4, Google Ads, Facebook Pixel)

## Development Commands

```bash
# Development server (port 3000)
npm run dev

# Production build
npm run build

# Run production server
npm start

# Lint with ESLint
npm run lint

# Type checking
npm run type-check

# Run single file type check
npx tsc --noEmit path/to/file.ts
```

## Environment Variables

Required in `.env.local`:
- `GHL_API_KEY`: GoHighLevel API key
- `GHL_LOCATION_ID`: Your GHL location ID
- `GHL_PIPELINE_ID`: (Optional) Pipeline ID for opportunities
- `GHL_STAGE_ID`: (Optional) Pipeline stage ID for opportunities

Optional:
- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 measurement ID
- `NEXT_PUBLIC_GOOGLE_ADS_ID`: Google Ads conversion ID (AW-XXXXXXXXXX)
- `NEXT_PUBLIC_FB_PIXEL_ID`: Facebook Pixel ID

## Key Implementation Details

### Form Validation (Zod Schema)
The form schema in `FormSelector.tsx` defines all form fields with validation rules. When adding/modifying fields:
- Update the Zod schema definition
- Update the TypeScript type (`FormData`)
- Update step validation logic in `handleNext()`
- Ensure API route handles the new fields in `ghlContact` object

### GHL Integration
The API route transforms form data to GHL contact/opportunity schema:
- **Contact fields**: firstName, lastName, email, phone, address fields, customFields
- **Opportunity fields**: contactId, name, pipelineId, pipelineStageId, monetaryValue
- If `GHL_API_KEY` is missing, data is logged but request succeeds (MVP fallback)
- Both contact creation and opportunity creation are handled in sequential fetch calls

### Theme & Styling
- Material-UI theme is initialized in `ThemeProvider.tsx` and applied in root `layout.tsx`
- Uses MUI's `ThemeProvider` from `@emotion/react`
- Brand colors are pulled from `BRAND_CONFIG.colors` and applied to theme
- All MUI components automatically inherit theme configuration

### Type Safety
- `tsconfig.json` enables strict mode and uses the `@/*` path alias for clean imports
- All API responses should be explicitly typed
- Component props are typed via interfaces (e.g., `FormSelectorProps`)

## Common Development Tasks

**Adding a new form field:**
1. Add field to Zod schema in `FormSelector.tsx`
2. Add to `FormData` type inference
3. Create Controller/TextField in appropriate step
4. Add to `handleNext()` validation array
5. Add to API route's `ghlContact` transformation

**Changing brand colors/text:**
- Edit `src/config/brand.config.ts` (colors, typography, contact info)
- Changes automatically propagate via `BRAND_CONFIG` imports

**Debugging API integration:**
- Check GHL credentials in `.env.local`
- Enable verbose logging in `route.ts` (logs print to server console)
- In development, unset `GHL_API_KEY` to test fallback behavior
- GHL API endpoints: `https://rest.gohighlevel.com/v1/contacts/` and `/v1/opportunities/`

## Performance & Optimization

- **Image optimization**: Configured with AVIF and WebP formats
- **Code splitting**: Automatic via Next.js
- **Lazy loading**: Components use dynamic imports where needed
- **Caching**: Server actions body size limited to 2MB
- **Responsive**: Mobile-first design with MUI breakpoints (xs, sm, md, lg, xl)

## Testing Locally

1. Set up `.env.local` with GHL credentials
2. Run `npm run dev`
3. Navigate to `http://localhost:3000`
4. Select form option (Buy/Refinance)
5. Fill out the 3-step form
6. Submit and verify data appears in GHL Contacts

For testing without GHL integration, comment out/unset `GHL_API_KEY` to use fallback behavior.

## Build & Deployment

- `npm run build` creates `.next` production bundle
- Deployment-ready for Vercel, AWS Amplify, or other Node.js platforms
- Ensure all environment variables are set in your deployment platform
- TypeScript compilation is part of the build process
