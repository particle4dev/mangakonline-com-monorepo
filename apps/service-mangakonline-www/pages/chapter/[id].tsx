// Chapter Page
import * as React from 'react';
import { NextPageContext } from 'next';
import { useTracking } from '@mp-workspace/ui-ga-auto-event-listener';
import ChapterIdPageContent from '../../containers/ChapterIdPageContent';
import withApollo from '../../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:ChapterIdPage');

type ChapterIdPageProps = {
  slug: string;
};

const ChapterIdPage = ({ slug }: ChapterIdPageProps) => {
  debug(`render`);

  useTracking();

  return (
    <ChapterIdPageContent slug={slug} />
  );
};

if (process.env.NODE_ENV !== 'production') {
  ChapterIdPage.displayName = 'pages__ChapterIdPage';
}

ChapterIdPage.defaultProps = {};

ChapterIdPage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    slug: ctx.query.id
  };
};

export default withApollo(ChapterIdPage);
