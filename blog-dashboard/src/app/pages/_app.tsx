import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Layout from '../layout';
import { store } from '../store';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Head>
                    <title>Blog Dashboard</title>
                    <meta name="description" content="A simple blog dashboard" />
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;