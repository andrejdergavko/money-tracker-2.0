import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Layout from '../components/common/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
