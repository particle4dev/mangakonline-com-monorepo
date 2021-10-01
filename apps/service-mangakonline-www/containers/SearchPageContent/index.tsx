import * as React from 'react';
import { Content } from '@mp-workspace/ui-penguin-ui-material-ui-extension';
import debounce from 'lodash/debounce';
import Navbar from '../Navbar';
import SearchHeader from '../SearchHeader';
import SearchResultSection from '../SearchResultSection';
import { selectQueryParams } from '../SearchContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:SearchPageContent');

const SearchPageContent = () => {
  debug('render');

  const query = selectQueryParams();
  const [q, setQ] = React.useState(null);

  const throttled = React.useRef(debounce((newValue: string) => {
    setQ(newValue);
  }, 350, {
    trailing: true
  }));

  React.useEffect(() => {
    throttled.current(query.q);
  }, [query.q]);

  return (<>
    <Navbar>
      <SearchHeader />
    </Navbar>
    <Content top={136}>
      <SearchResultSection />
    </Content>
  </>);
};

if (process.env.NODE_ENV !== 'production') {
  SearchPageContent.displayName = 'containers__SearchPageContent';
}

SearchPageContent.defaultProps = {};

export default SearchPageContent;
