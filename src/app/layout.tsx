import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { BRAND_CONFIG } from '@/config/brand.config';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: BRAND_CONFIG.seo.title,
  description: BRAND_CONFIG.seo.description,
  keywords: BRAND_CONFIG.seo.keywords,
  openGraph: {
    title: BRAND_CONFIG.seo.title,
    description: BRAND_CONFIG.seo.description,
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics */}
        {BRAND_CONFIG.analytics.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${BRAND_CONFIG.analytics.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${BRAND_CONFIG.analytics.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
