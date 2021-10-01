import { handleActions } from 'redux-actions';
import {
  UPDATE_PATH,
  INITIALIZING,
  INITIALIZED
} from './constants';

// The initial state of the App
export const initialState = {
  state: INITIALIZING,
  params: {
    pathname: null,
    query: {
      q: ''
    }
  }
};

export function setUpState(data) {
  if(initialState.state === INITIALIZING) {
    initialState.state = INITIALIZED;
    if(data.pathname) {
      initialState.params.pathname = data.pathname;
    }
    if(data.query.q) {
      initialState.params.query = data.query;
    }
  }
  if(initialState.state === INITIALIZED) {
    console.warn('search state is initialized');
  }
}

export default handleActions(
  {
    [UPDATE_PATH]: (state, { payload }) => {
      const { params } = payload;
      if(!params.query.q) {
        params.query.q = '';
      }
      return Object.assign({}, state, {
        params: {
          pathname: params.pathname,
          query: params.query
        }
      });
    },
    // [LOGOUT]: () => initialState
  },
  initialState
);
