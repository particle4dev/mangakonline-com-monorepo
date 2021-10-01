import * as React from 'react';
// import { createSelector } from 'reselect'
import SearchContext from './Context';

export const useSearchContext = () => {
  const contextValue = React.useContext(SearchContext);
  return contextValue;
};

export const selectSearchContext = () => {
  const [contextValue] = React.useContext(SearchContext);
  return contextValue;
};

// export const selectState = createSelector(selectSearchContext, (searchContext) => {
//   return searchContext.state
// })

export const selectState = () => {
  const [context] = useSearchContext();
  return context.state;
};

// export const selectParams = createSelector(selectSearchContext, (searchContext) => {
//   return searchContext.params
// })

export const selectParams = () => {
  const [context] = useSearchContext();
  return context.params;
};

// export const selectQueryParams = createSelector(selectParams, params => {
//   return params.query
// })

export const selectQueryParams = () => {
  const params = selectParams();
  return params.query;
};
