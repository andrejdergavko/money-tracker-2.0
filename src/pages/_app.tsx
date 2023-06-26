import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SnackbarProvider } from 'notistack';
import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css';
import theme from '../styles/theme';
import SwrConfig from '../components/common/SwrConfig';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={4} autoHideDuration={5000}>
            <SwrConfig>
              <Component {...pageProps} />
              <Analytics />
            </SwrConfig>
          </SnackbarProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </SessionProvider>
  );
}
