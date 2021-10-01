import * as React from 'react';
import Router from 'next/router';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:RouterSync');

type RouterParams = {
  pathname: string,
  query: any
}

export type RouterSyncProps = {
  skipFirstRun?: boolean,
  onChangeRouter: (p: RouterParams) => void
}

function RouterSync(props: RouterSyncProps) {
  debug('render');

  const isFirstRun = React.useRef(props.skipFirstRun);

  React.useEffect(() => {
    if (!isFirstRun.current) {
      isFirstRun.current = false;
      props.onChangeRouter && props.onChangeRouter({
        pathname: Router.pathname,
        query: Router.query
      });
    }

    const routeChangeComplete = () => {
      props.onChangeRouter && props.onChangeRouter({
        pathname: Router.pathname,
        query: Router.query
      });
    };

    Router.events.on('routeChangeComplete', routeChangeComplete);

    return () => {
      Router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, []);

  return null;
}

if (process.env.NODE_ENV !== 'production') {
  RouterSync.displayName = 'components__RouterSync';
}

RouterSync.defaultProps = {};

export default RouterSync;
