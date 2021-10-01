// Search Page
import * as React from 'react';
import { NextPageContext } from 'next';
import { useTracking } from '@mp-workspace/ui-ga-auto-event-listener';
import { SearchProvider, setUpState } from '../../containers/SearchContext';
import SearchPageContent from '../../containers/SearchPageContent';
import withApollo from '../../apollo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('pages:SearchPage');

const useComponentWillMount = (func) => {
  const willMount = React.useRef(true);

  if (willMount.current) func();

  willMount.current = false;
};

const SearchPage = (props) => {
  debug('render');

  useComponentWillMount(() => {
    setUpState(props);
  });

  useTracking();

  return (<SearchProvider>
    <SearchPageContent />
  </SearchProvider>);
};

if (process.env.NODE_ENV !== 'production') {
  SearchPage.displayName = 'pages__SearchPage';
}

SearchPage.defaultProps = {};

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  return {
    pathname: ctx.pathname,
    query: ctx.query,
  };
};

export default withApollo(SearchPage);
