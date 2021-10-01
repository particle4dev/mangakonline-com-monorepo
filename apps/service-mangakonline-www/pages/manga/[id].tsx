// Manga Page
import * as React from 'react';
import { NextPageContext } from 'next';
import { useTracking } from '@mp-workspace/ui-ga-auto-event-listener';
import MangaIdPageContent from '../../containers/MangaIdPageContent';
import withApollo from '../../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:MangaIdPage');

type MangaIdPageProps = {
  slug: string
}

const MangaIdPage = ({ slug }: MangaIdPageProps) => {
  debug('render');

  useTracking();

  return (<MangaIdPageContent slug={slug} />
  );
};

if (process.env.NODE_ENV !== 'production') {
  MangaIdPage.displayName = 'pages__MangaIdPage';
}

MangaIdPage.defaultProps = {};

MangaIdPage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    slug: ctx.query.id
  };
};

export default withApollo(MangaIdPage);
