import * as React from 'react';
import SearchContext from './Context';
import reducer, {initialState} from './reducer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('components:BrowseContext:BrowseProvider');

export type BrowseProviderProps = {
  children: React.ReactNode;
}

const BrowseProvider = ({ children }: BrowseProviderProps) => {
  debug('render');

  const contextValue = React.useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};


if (process.env.NODE_ENV !== 'production') {
  BrowseProvider.displayName = 'components__BrowseContext_BrowseProvider';
}

BrowseProvider.defaultProps = {};

export default BrowseProvider;
