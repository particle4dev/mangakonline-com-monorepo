import * as React from 'react';
import BrowseContext from './Context';

export const useBrowseContext = () => {
  const contextValue = React.useContext(BrowseContext);
  return contextValue;
};
