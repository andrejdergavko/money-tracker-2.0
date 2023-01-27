import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import '@fortawesome/fontawesome-free/css/all.min.css';

import '../styles/globals.css';
import theme from '../styles/theme';
import Layout from '../components/common/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
