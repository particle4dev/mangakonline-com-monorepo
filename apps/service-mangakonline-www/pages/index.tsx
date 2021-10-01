import * as React from 'react';
import { useTracking } from '@mp-workspace/ui-ga-auto-event-listener';
import BottomAppBar from '../components/BottomAppBar';
import HomePageContent from '../containers/HomePageContent';
import withApollo from '../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:Index');

export const Index = () => {
  debug('render');

  useTracking();

  return (<>
    <HomePageContent />
    <BottomAppBar />
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  Index.displayName = 'pages__Index';
}

Index.defaultProps = {};

export default withApollo(Index);
