import * as React from 'react';
import SearchContext from './Context';
import reducer, {initialState} from './reducer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('containers:SearchContext:SearchProvider');

type ISearchProviderProps = {
  children: React.ReactNode
}

const SearchProvider = ({ children }: ISearchProviderProps) => {
  debug('render');

  const contextValue = React.useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};


if (process.env.NODE_ENV !== 'production') {
  SearchProvider.displayName = 'containers__SearchProvider';
}

SearchProvider.defaultProps = {};

export default SearchProvider;
