import * as React from 'react';
import { NextPageContext } from 'next';
import App, { AppProps, AppContext } from 'next/app';
import { UAParser } from 'ua-parser-js';
import NextHead from 'next/head';
import { Global } from "@mp-workspace/ui-material-ui-next-global";
import { GoogleAnalytics, initGoogleAnalytics } from '@mp-workspace/ui-ga-auto-event-listener';
import { ThemeProvider, darkTheme as theme } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import RobotoHead from '@mp-workspace/ui-next-roboto-meta-tag';
import GlobalStyle from "../components/GlobalStyle";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const isServer = !process.browser;
const isClient = process.browser;

initGoogleAnalytics();

type CustomAppProps = AppProps & {
  deviceType: string | null;
}

type CustomPageContext = NextPageContext & {
  isServer?: boolean;
  isClient?: boolean;
}

const CustomApp = ({ Component, deviceType, pageProps }: CustomAppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (<>
    <NextHead>
      <meta charSet="utf-8" />
      <meta name="google-site-verification" content="guceYdYmUdpP5iKcb4z4DiAdAFl1NE_T-hlisFsK3zI" />
      {/* <link rel="stylesheet" href="http://react-responsive-carousel.js.org/carousel.08ce3959.css"></link> */}
    </NextHead>
    <ThemeProvider deviceType={deviceType} isBrowser={isClient} theme={theme}>
      <Component {...pageProps} />
      <Global />
      <GlobalStyle />
    </ThemeProvider>
    <RobotoHead />
    <GoogleAnalytics />
  </>
  );
};

CustomApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  let deviceType = null;

  const appProps = await App.getInitialProps(appContext);

  const ctx: CustomPageContext = appContext.ctx;

  ctx.isServer = isServer;
  ctx.isClient = isClient;

  // server
  if(ctx.req) {
    const ua = new UAParser(ctx.req.headers['user-agent']);
    deviceType = ua.getDevice().type || 'desktop';
  }

  // // client
  // if (!ctx.req) {}

  return Object.assign({...appProps}, {
    deviceType,
  });

};

// turn on log in browser
if(process.env.NODE_ENV === 'development' && isClient) {
  localStorage.debug = process.env.DEBUG;
}

export default CustomApp;
