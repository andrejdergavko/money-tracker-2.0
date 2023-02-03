import type { AppProps } from 'next/app';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SnackbarProvider } from 'notistack';

import '../styles/globals.css';
import theme from '../styles/theme';
import Layout from '../components/common/Layout';
import SwrConfig from '../components/common/SwrConfig';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={4} autoHideDuration={5000}>
          <SwrConfig>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SwrConfig>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
