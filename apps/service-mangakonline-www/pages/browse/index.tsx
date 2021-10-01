// Browse Page
import * as React from 'react';
import { NextPageContext } from 'next';
import { useTracking } from '@mp-workspace/ui-ga-auto-event-listener';
import BottomAppBar from '../../components/BottomAppBar';
import {BrowseProvider, setUpState} from '../../containers/BrowseContext';
import BrowsePageContent from '../../containers/BrowsePageContent';
import withApollo from '../../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:Browse');

const useComponentWillMount = (func: () => void) => {
  const willMount = React.useRef(true);

  if (willMount.current) func();

  willMount.current = false;
};

const Browse = (props) => {
  debug('render');

  useTracking();

  useComponentWillMount(() => {
    setUpState(props);
  });

  return (<>
    <BrowseProvider>
      <BrowsePageContent />
    </BrowseProvider>
    <BottomAppBar />
  </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Browse.displayName = 'pages__Browse';
}

Browse.defaultProps = {};

Browse.getInitialProps = async (ctx: NextPageContext) => {
  return {
    pathname: ctx.pathname,
    query: ctx.query,
  };
};

export default withApollo(Browse);
