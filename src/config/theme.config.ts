import { createTheme } from '@mui/material/styles';
import { BRAND_CONFIG } from './brand.config';

/**
 * Material-UI Theme Configuration
 * Uses Mortgage Connect brand colors (Arizona Home Loan Help Orange #FF8800 & Cyan #00AAFF)
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: BRAND_CONFIG.colors.primary,        // #00AAFF
      dark: BRAND_CONFIG.colors.primaryDark,     // #0088CC
      light: BRAND_CONFIG.colors.primaryLight,   // #33BBFF
      contrastText: '#ffffff',
    },
    secondary: {
      main: BRAND_CONFIG.colors.secondary,       // #00AAFF (Cyan)
      dark: '#0088CC',
      light: '#33BBFF',
      contrastText: '#ffffff',
    },
    error: {
      main: BRAND_CONFIG.colors.error,
    },
    warning: {
      main: BRAND_CONFIG.colors.warning,
    },
    info: {
      main: BRAND_CONFIG.colors.info,
    },
    success: {
      main: BRAND_CONFIG.colors.success,
    },
    background: {
      default: BRAND_CONFIG.colors.background,
      paper: BRAND_CONFIG.colors.cardBackground,
    },
    text: {
      primary: BRAND_CONFIG.colors.textPrimary,
      secondary: BRAND_CONFIG.colors.textSecondary,
      disabled: BRAND_CONFIG.colors.textDisabled,
    },
    divider: BRAND_CONFIG.colors.divider,
  },
  typography: {
    fontFamily: BRAND_CONFIG.typography.fontFamily.primary,
    h1: {
      fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
      fontWeight: 700,
      fontSize: BRAND_CONFIG.typography.fontSize['4xl'],
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
      fontWeight: 700,
      fontSize: BRAND_CONFIG.typography.fontSize['3xl'],
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
      fontWeight: 600,
      fontSize: BRAND_CONFIG.typography.fontSize['2xl'],
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
      fontWeight: 600,
      fontSize: BRAND_CONFIG.typography.fontSize.xl,
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
      fontWeight: 600,
      fontSize: BRAND_CONFIG.typography.fontSize.lg,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: BRAND_CONFIG.typography.fontFamily.heading,
      fontWeight: 600,
      fontSize: BRAND_CONFIG.typography.fontSize.base,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: BRAND_CONFIG.typography.fontSize.base,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: BRAND_CONFIG.typography.fontSize.sm,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: parseInt(BRAND_CONFIG.borderRadius.md),
  },
  shadows: [
    'none',
    BRAND_CONFIG.shadows.sm,
    BRAND_CONFIG.shadows.sm,
    BRAND_CONFIG.shadows.md,
    BRAND_CONFIG.shadows.md,
    BRAND_CONFIG.shadows.lg,
    BRAND_CONFIG.shadows.lg,
    BRAND_CONFIG.shadows.xl,
    BRAND_CONFIG.shadows.card,
    BRAND_CONFIG.shadows.card,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
    BRAND_CONFIG.shadows.cardHover,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: BRAND_CONFIG.borderRadius.button,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: BRAND_CONFIG.shadows.button,
          '&:hover': {
            boxShadow: BRAND_CONFIG.shadows.md,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BRAND_CONFIG.borderRadius.card,
          boxShadow: BRAND_CONFIG.shadows.card,
          '&:hover': {
            boxShadow: BRAND_CONFIG.shadows.cardHover,
            transition: 'box-shadow 0.3s ease-in-out',
          },
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:hover': {
            '& .MuiCardActionArea-focusHighlight': {
              opacity: 0.04,
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: BRAND_CONFIG.borderRadius.sm,
          },
        },
      },
    },
  },
});

export default theme;
