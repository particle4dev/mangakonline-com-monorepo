import * as React from 'react';
import Router from 'next/router';
import Toolbar from '@material-ui/core/Toolbar';
import SearchBar from '../../components/SearchBar';
import RouterSync from '../../components/RouterSync';
import {useSearchContext, updatePath, selectQueryParams} from '../../containers/SearchContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:SearchHeader');

function SearchHeader() {
  debug(`render`);

  const [_, dispatch] = useSearchContext();

  const query = selectQueryParams();

  const handleChange = (value: string) => {
    Router.push({
      pathname: Router.pathname,
      query: {
        q: value
      }
    });
  };

  return (
    <Toolbar>
      <SearchBar
        defaultValue={query.q}
        onChange={handleChange}
      />
      <RouterSync skipFirstRun={true} onChangeRouter={params => {dispatch(updatePath(params));}}/>
    </Toolbar>
  );
}

if (process.env.NODE_ENV !== 'production') {
  SearchHeader.displayName = 'containers__SearchHeader';
}

SearchHeader.defaultProps = {};

export default SearchHeader;
