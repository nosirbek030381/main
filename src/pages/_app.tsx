import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NProgress from 'nprogress';
import createEmotionCache from 'src/helpers/create-emotion-cashe';
import theme from 'src/helpers/theme';

import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import 'src/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props;

	useEffect(() => {
		const handleRouteStart = () => NProgress.start();
		const handleRouteDone = () => NProgress.done();

		router.events.on('routeChangeStart', handleRouteStart);
		router.events.on('routeChangeComplete', handleRouteDone);
		router.events.on('routeChangeError', handleRouteDone);

		return () => {
			// Make sure to remove the event handler on unmount!
			router.events.off('routeChangeStart', handleRouteStart);
			router.events.off('routeChangeComplete', handleRouteDone);
			router.events.off('routeChangeError', handleRouteDone);
		};
	}, []);

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
				{/* <link rel='icon' href='https://nextjs.org/favicon.ico' /> */}
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
}
export default MyApp;
