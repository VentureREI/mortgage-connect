'use client';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/config/theme.config';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme Provider Component
 * Wraps the app with Material-UI theme and baseline CSS
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
