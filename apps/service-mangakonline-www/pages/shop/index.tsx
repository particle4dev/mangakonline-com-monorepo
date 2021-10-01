import * as React from 'react';
import { NextPageContext } from 'next';
import { useTracking } from '@mp-workspace/ui-ga-auto-event-listener';
import withApollo from '../../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:ShopPage');

const ShopPage = () => {
  debug('render');

  useTracking();

  return <>
    ShopPage
  </>;
};

if (process.env.NODE_ENV !== 'production') {
  ShopPage.displayName = 'pages__ShopPage';
}

ShopPage.defaultProps = {};

ShopPage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    slug: ctx.query.id
  };
};

export default withApollo(ShopPage);
