import * as React from 'react';
import { NextPageContext } from 'next';
import { useTracking } from '@mp-workspace/ui-ga-auto-event-listener';
import ItemIdPageContent from '../../containers/ItemIdPageContent';
import withApollo from '../../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:ItemIdPage');

type ItemIdPageProps = {
  slug: string;
};

const ItemIdPage = ({ slug }: ItemIdPageProps) => {
  debug('render');

  useTracking();

  return (<ItemIdPageContent slug={slug} />);
};

if (process.env.NODE_ENV !== 'production') {
  ItemIdPage.displayName = 'pages__ItemIdPage';
}

ItemIdPage.defaultProps = {};

ItemIdPage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    slug: ctx.query.id
  };
};

export default withApollo(ItemIdPage);
