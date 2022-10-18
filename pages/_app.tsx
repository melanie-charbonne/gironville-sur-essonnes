import '../styles/global.scss';
import Layout from '../components/Layout/layout'
import { ApolloProvider } from '@apollo/client/react';
import { client } from '../lib/apollo';

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={client}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </ApolloProvider>
  )
}

export default MyApp;
