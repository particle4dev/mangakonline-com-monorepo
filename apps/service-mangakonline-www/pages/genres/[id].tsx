// Genres Page
import * as React from 'react';
import { NextPageContext } from 'next';
import { useTracking } from '@mp-workspace/ui-ga-auto-event-listener';
import GenresIdPageContent from '../../containers/GenresIdPageContent';
import withApollo from '../../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:GenresIdPage');

type GenresIdPageProps = {
  slug: string
}

const GenresIdPage = ({ slug }: GenresIdPageProps) => {
  debug('render');

  useTracking();

  return (<GenresIdPageContent slug={slug} />);
};

if (process.env.NODE_ENV !== 'production') {
  GenresIdPage.displayName = 'pages__GenresIdPage';
}

GenresIdPage.defaultProps = {};

GenresIdPage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    slug: ctx.query.id
  };
};

export default withApollo(GenresIdPage);
