/**
 * Mortgage Connect Brand Configuration
 * Central source of truth for all brand-related settings
 */

export const BRAND_CONFIG = {
  // Company Information
  name: "Mortgage Connect",
  tagline: "Let's get your home buying questions answered!",
  description: "Connecting you to the best mortgage solutions",
  
  // Contact Information
  contact: {
    phone: "+1 520-645-5533",
    phoneDisplay: "(520) 645-5533",
    email: "info@mortgageconnect.com",
    address: {
      street: "2959 N Swan Rd #141",
      city: "Tucson",
      state: "AZ",
      zip: "85712",
      full: "2959 N Swan Rd #141, Tucson, AZ 85712"
    }
  },

  // Domain Configuration
  domain: {
    production: "mortgageconnect.com",
    staging: "staging.mortgageconnect.com"
  },

  // Color Palette - Arizona Home Loan Help (Cyan only)
  colors: {
    // Primary Colors - Using Cyan
    primary: "#00AAFF",           // Main brand color (Cyan)
    primaryDark: "#0088CC",       // Hover/active states (darker cyan)
    primaryLight: "#33BBFF",      // Light accents (lighter cyan)

    // Secondary Color - Cyan for links
    secondary: "#00AAFF",         // Cyan for links and secondary actions

    // Background Colors
    background: "#ffffff",         // Main background
    backgroundAlt: "#f5f5f5",     // Alternate background
    cardBackground: "#ffffff",     // Card backgrounds

    // Arizona Home Loan Help Gray
    gray: "#656B6D",              // Accent gray

    // Text Colors
    textPrimary: "#000000",                // Main text
    textSecondary: "#656B6D",              // Secondary text (gray)
    textDisabled: "rgba(0, 0, 0, 0.38)",   // Disabled text

    // Semantic Colors
    success: "#4caf50",           // Success messages
    error: "#f44336",             // Error messages
    warning: "#ff9800",           // Warning messages
    info: "#2196f3",              // Info messages

    // Border Colors
    border: "rgba(0, 0, 0, 0.12)",
    divider: "rgba(0, 0, 0, 0.12)",
  },

  // Typography
  typography: {
    fontFamily: {
      primary: "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      heading: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      mono: "'Fira Code', 'Courier New', monospace"
    },
    fontSize: {
      xs: "0.75rem",      // 12px
      sm: "0.875rem",     // 14px
      base: "1rem",       // 16px
      lg: "1.125rem",     // 18px
      xl: "1.25rem",      // 20px
      "2xl": "1.5rem",    // 24px
      "3xl": "1.875rem",  // 30px
      "4xl": "2.25rem",   // 36px
      "5xl": "3rem",      // 48px
    }
  },

  // Shadows - Material Design
  shadows: {
    card: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    button: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    cardHover: "rgba(50, 50, 93, 0.35) 0px 17px 32px -8px, rgba(0, 0, 0, 0.4) 0px 12px 20px -12px",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
    card: "12px",        // For cards (from sample)
    button: "4px",       // For buttons (from sample)
  },

  // Spacing
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },

  // GoHighLevel Configuration
  ghl: {
    locationId: "f2jH4g9CPHdLGUODBCh6", // Update if needed
    apiVersion: "v1",
    webhookSecret: process.env.GHL_WEBHOOK_SECRET || "",
  },

  // Form Configuration
  forms: {
    options: [
      {
        id: "buy",
        title: "I want to buy a home",
        description: "Find out how much home you can afford",
        image: "/images/buy-home.jpg",
        color: "primary"
      },
      {
        id: "refinance",
        title: "I want to finance my home",
        description: "Explore financing options",
        image: "/images/refinance-home.jpg",
        color: "primary"
      }
    ]
  },

  // SEO Configuration
  seo: {
    title: "Mortgage Connect | Down Payment Assistance Programs",
    description: "Let's get your home buying questions answered! Connect with top mortgage advisors for buying or refinancing your home.",
    keywords: "mortgage, home loan, refinance, down payment assistance, home buying",
    ogImage: "/images/og-image.jpg",
  },

  // Legal/Compliance
  legal: {
    privacyNotice: "YOUR INFORMATION WILL NOT BE SOLD TO MULTIPLE PARTIES",
    disclaimer: "Unlike most online mortgage shopping experiences that sell your information to multiple lenders, banks, and institutions, we don't. Instead, you'll be connected with a top Mortgage Advisor licensed in your market, allowing you to decide the next steps.",
    creditDisclaimer: "No login or SSN required. This will NOT impact your credit, and it takes less than 1 minute to complete!",
    nmls: {
      link: "https://nmlsconsumeraccess.org/",
      text: "NMLS Consumer Access"
    }
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
    googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "",
    facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
  }
} as const;

export type BrandConfig = typeof BRAND_CONFIG;
